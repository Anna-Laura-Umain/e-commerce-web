import {Suspense} from 'react'
import {notFound} from 'next/navigation'
import {sanityFetch} from '@/sanity/lib/live'
import {coffeeListQuery, teaListQuery} from '@/sanity/lib/queries'
import ProductCard from '@/components/ProductCard'
import { ProductFilters }from '@/components/ProductFilters'
import {getProductLevel} from '@/lib/utils'
import type {Product} from '@/types/product'

type SearchParams = Record<string, string | string[] | undefined>

// A URL value can be missing, a single string, or several strings
function toArray(value: string | string[] | undefined): string[] {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

// Unique values, sorted alphabetically
function unique(values: string[]) {
  return [...new Set(values)].sort()
}

export default async function ShopCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{category: string}>
  searchParams: Promise<SearchParams>
}) {
  const {category} = await params
  const filters = await searchParams

  if (category !== 'coffee' && category !== 'tea') {
    notFound()
  }

  const isCoffee = category === 'coffee'
  const title = isCoffee ? 'Coffee' : 'Tea'
  const query = isCoffee ? coffeeListQuery : teaListQuery

  const {data} = await sanityFetch({query})

  // TODO: replace the cast with generated types
  const allProducts = data as Product[]

  // Selected filters from the URL
  const origins = toArray(filters.origin)
  const levels = toArray(filters.level)
  const inStockOnly = filters.inStock === 'true'

  // Inside one filter: any selected value matches. Between filters: all must match.
  const products = allProducts.filter(
    (p) =>
      (origins.length === 0 || origins.includes(p.origin)) &&
      (levels.length === 0 || levels.includes(getProductLevel(p))) &&
      (!inStockOnly || p.available),
  )

  return (
    <main className="container py-12">
      <h1 className="mb-8 heading-display text-3xl md:text-4xl text-center">{title}</h1>

      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        {/* useSearchParams in the filters needs a Suspense boundary */}
        <Suspense>
          <ProductFilters
            origins={unique(allProducts.map((p) => p.origin))}
            levels={unique(allProducts.map(getProductLevel))}
            levelLabel={isCoffee ? 'Roast level' : 'Oxidation level'}
          />
        </Suspense>

        {products.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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