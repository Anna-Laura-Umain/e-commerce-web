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
    <main className="container py-12">
      <h1 className="mb-8 heading-display text-3xl md:text-4xl text-center">{title}</h1>

      <div className="grid gap-10 md:grid-cols-[200px_1fr]">
        {/* useSearchParams in the filters needs a Suspense boundary */}
        <Suspense>
          <ProductFilters groups={groups} page={category} />
        </Suspense>

        {products.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
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