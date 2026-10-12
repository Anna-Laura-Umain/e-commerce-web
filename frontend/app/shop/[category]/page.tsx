import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { coffeeListQuery, shopFiltersQuery, teaListQuery } from '@/sanity/lib/queries'
import ProductCard from '@/components/ProductCard'
import { ProductFilters } from '@/components/ProductFilters'
import {
  buildFilterGroups,
  filterProducts,
  getFilterSettings,
  readFilters,
  type SearchParams,
} from '@/lib/filters'
import type {Product} from '@/types/product'


export default async function ShopCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{category: string}>
  searchParams: Promise<SearchParams>
}) {
  const {category} = await params

  if (category !== 'coffee' && category !== 'tea') {
    notFound()
  }

  const isCoffee = category === 'coffee'
  const title = isCoffee ? 'Coffee' : 'Tea'

  // Turn off stega (hidden characters added in draft mode for visual editing),
  // otherwise strings can't be compared and filters break
  const [{data: productData}, {data: filterData}] = await Promise.all([
    sanityFetch({query: isCoffee ? coffeeListQuery : teaListQuery, stega: false}),
    sanityFetch({query: shopFiltersQuery, stega: false}),
  ])

  // TODO: replace the cast with generated types
  const allProducts = productData as Product[]

  const settings = getFilterSettings(isCoffee ? filterData?.coffee : filterData?.tea, isCoffee)
  const groups = buildFilterGroups(allProducts, settings)
  const products = filterProducts(allProducts, readFilters(await searchParams))

  return (
    <main className="container py-10 sm:py-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-stone-500">The collection</p>
          <h1 className="heading-display text-4xl tracking-tight text-stone-900 sm:text-5xl">{title}</h1>
        </div>
        <p className="text-sm text-stone-500">{products.length} {products.length === 1 ? 'product' : 'products'}</p>
      </div>

      <div className="grid items-start gap-8 md:grid-cols-[180px_minmax(0,1fr)] lg:gap-10">
        {/* useSearchParams in the filters needs a Suspense boundary */}
        <Suspense>
          <ProductFilters groups={groups} page={category} />
        </Suspense>

        {products.length > 0 ? (
          <div className="grid min-w-0 auto-rows-fr gap-5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-lg text-muted-foreground">
            No products match these filters.
          </p>
        )}
      </div>
    </main>
  )
}