import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {test} from 'node:test'
import {runInNewContext} from 'node:vm'
import ts from 'typescript'

// Exercise the real TypeScript modules with service boundaries mocked; no network or payment calls.
function loadModule(path, mocks = {}) {
  const source = readFileSync(new URL(path, import.meta.url), 'utf8')
  const {outputText} = ts.transpileModule(source, {
    fileName: path,
    compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX},
  })
  const exports = {}
  runInNewContext(outputText, {
    exports, URL, console,
    require: (name) => {
      if (!(name in mocks)) throw new Error(`Unexpected dependency: ${name}`)
      return mocks[name]
    },
  })
  return exports
}

function checkout(products = [{_id: 'tea-1', name: 'Tea', price: 12.55, available: true}]) {
  const calls = {fetch: 0, sessions: []}
  const {POST} = loadModule('../app/api/checkout/route.ts', {
    'next/server': {NextResponse: {json: (data, init) => Response.json(data, init)}},
    '@/sanity/lib/client': {client: {fetch: async () => {calls.fetch++; return products}}},
    '@/sanity/lib/queries': {checkoutProductsQuery: 'query'},
    '@/lib/stripe': {stripe: {checkout: {sessions: {create: async (params) => {
      calls.sessions.push(params)
      return {url: 'https://checkout.example/session'}
    }}}}},
  })
  const request = (body) => POST(new Request('https://shop.example/api/checkout', {
    method: 'POST', headers: {origin: 'https://untrusted.example'}, body: JSON.stringify(body),
  }))
  return {POST, request, calls}
}

test('checkout rejects malformed carts before fetching products or creating payment', async () => {
  const {request, POST, calls} = checkout()
  for (const body of [null, {}, {items: []}, {items: [null]},
    ...[0, -1, 1.5, '2', null, 1e30].map((quantity) => ({items: [{id: 'tea-1', quantity}]})),
    {items: [{id: '', quantity: 1}]},
    {items: [{id: 'tea-1', quantity: 1}, {id: 'tea-1', quantity: 1}]},
  ]) assert.equal((await request(body)).status, 400)
  assert.equal((await POST(new Request('https://shop.example/api/checkout', {
    method: 'POST', body: '{bad json',
  }))).status, 400)
  assert.equal(calls.fetch, 0)
  assert.equal(calls.sessions.length, 0)
})

test('checkout rejects the entire cart if any requested item is missing or unavailable', async () => {
  const {request, calls} = checkout()
  assert.equal((await request({items: [
    {id: 'tea-1', quantity: 1}, {id: 'missing', quantity: 1},
  ]})).status, 400)
  assert.equal(calls.sessions.length, 0)
  for (const product of [
    {_id: 'tea-1', name: 'Tea', price: 12, available: false},
    ...[NaN, Infinity, -1, 0, 0.001].map((price) => ({_id: 'tea-1', name: 'Tea', available: true, price})),
  ]) {
    const flow = checkout([product])
    assert.equal((await flow.request({items: [{id: 'tea-1', quantity: 1}]})).status, 400)
    assert.equal(flow.calls.sessions.length, 0)
  }
})

test('checkout uses server prices, preserves quantity and uses the request URL for returns', async () => {
  const {request, calls} = checkout()
  assert.equal((await request({items: [{id: 'tea-1', quantity: 2, price: 0.01}]})).status, 200)
  const session = calls.sessions[0]
  assert.equal(session.line_items[0].price_data.unit_amount, 1255)
  assert.equal(session.line_items[0].quantity, 2)
  assert.equal(session.cancel_url, 'https://shop.example/cart')
})

test('tea and legacy favorites use populated product fields; prices retain decimals', () => {
  const utils = loadModule('../lib/utils.ts', {cn: {cn: () => ''}})
  const tea = {_type: 'tea', roastLevel: null, oxidationLevel: 'Light'}
  assert.equal(utils.getProductCategory(tea), 'tea')
  assert.equal(utils.getProductDetail(tea), 'Light oxidation')
  assert.equal(utils.getProductLevel(tea), 'Light')
  assert.equal(utils.getProductCategory({roastLevel: null, oxidationLevel: 'Light'}), 'tea')
  assert.equal(utils.getProductCategory({roastLevel: 'Dark'}), 'coffee')
  assert.equal(utils.getProductDetail({_type: 'coffee', roastLevel: null}), '')
  assert.equal(utils.formatPrice(12.55), '12.55')
})


test('sitemap includes absolute catalog and published CMS URLs', async () => {
  let options
  const {default: sitemap} = loadModule('../app/sitemap.ts', {
    'next/headers': {headers: async () => new Headers({host: 'shop.example'})},
    '@/sanity/lib/live': {sanityFetch: async (value) => {
      options = value
      return {data: [{slug: 'about', _updatedAt: '2026-10-01'}, {slug: null}]}
    }},
    '@/sanity/lib/queries': {sitemapData: 'query'},
  })
  const entries = await sitemap()
  assert.deepEqual(Array.from(entries, (entry) => entry.url), [
    'https://shop.example/', 'https://shop.example/shop/coffee',
    'https://shop.example/shop/tea', 'https://shop.example/about',
  ])
  assert.equal(options.perspective, 'published')
  assert.equal(options.stega, false)
})

test('legacy product URL validates category and renders the shared product details', async () => {
  let options
  let product = {_id: 'tea-1', _type: 'tea'}
  const {default: page} = loadModule('../app/shop/[category]/[slug]/page.tsx', {
    'react/jsx-runtime': {jsx: (type, props) => ({type, props})},
    'next/navigation': {notFound: () => {throw new Error('not-found')}},
    '@/sanity/lib/live': {sanityFetch: async (value) => {options = value; return {data: product}}},
    '@/sanity/lib/queries': {productQuery: 'query'},
    '@/components/ProductDetails': {default: 'ProductDetails'},
  })
  await assert.rejects(page({params: Promise.resolve({category: 'other', slug: 'tea'})}), /not-found/)
  assert.equal(options, undefined)
  const result = await page({params: Promise.resolve({category: 'tea', slug: 'green-tea'})})
  assert.equal(options.params.category, 'tea')
  assert.equal(options.params.slug, 'green-tea')
  assert.equal(result.props.product, product)
  product = null
  await assert.rejects(page({params: Promise.resolve({category: 'tea', slug: 'missing'})}), /not-found/)
})
