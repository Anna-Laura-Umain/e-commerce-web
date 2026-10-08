import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { coffeeListQuery, shopFiltersQuery, teaListQuery } from '@/sanity/lib/queries'
import ProductCard from '@/components/ProductCard'
import { ProductFilters, type FilterGroup, type FilterOption } from '@/components/ProductFilters'
import { getProductLevel } from '@/lib/utils'
import type { Product } from '@/types/product'

type SearchParams = Record<string, string | string[] | undefined>
type FilterField = 'origin' | 'level' | 'inStock'
type FilterSetting = { field: FilterField; label: string }

const knownFields: FilterField[] = ['origin', 'level', 'inStock']

// A URL value can be missing, a single string, or several strings
function toArray(value: string | string[] | undefined): string[] {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

// Unique non-empty values as filter options, A-Z sorted
function toOptions(values: (string | null | undefined)[]): FilterOption[] {
  const filled = values.filter((value): value is string => Boolean(value))
  const uniqueSorted = [...new Set(filled)].sort()
  return uniqueSorted.map((value) => ({ label: value, value }))
}

export default async function ShopCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>
  searchParams: Promise<SearchParams>
}) {
  const { category } = await params
  const filters = await searchParams

  // to discuss - Do we want to add the option to include other categories? Juice, for example? If so, we'll need to review the code and schemas.
  if (category !== 'coffee' && category !== 'tea') {
    notFound()
  }

  const isCoffee = category === 'coffee'
  const title = isCoffee ? 'Coffee' : 'Tea'

  // stega: false keeps the strings clean, so we can compare and filter by them
  const [{ data: productData }, { data: filterData }] = await Promise.all([
    sanityFetch({ query: isCoffee ? coffeeListQuery : teaListQuery, stega: false }),
    sanityFetch({ query: shopFiltersQuery, stega: false }),
  ])

  // TODO: replace the cast with generated types
  const allProducts = productData as Product[]

  // deafault data for filters (if nothing added via Sanity)
  // Keep in sync with studio/scripts/seed-shop-filters.ts
  const fallbackSettings: FilterSetting[] = [
    { field: 'origin', label: 'Origin' },
    { field: 'level', label: isCoffee ? 'Roast level' : 'Oxidation level' },
    { field: 'inStock', label: 'Availability' },
  ]

  // Settings for this page from Studio, skipping half-filled or unknown rows
  const savedSettings = ((isCoffee ? filterData?.coffee : filterData?.tea) ?? []).filter(
    (setting): setting is FilterSetting =>
      Boolean(setting.label) && knownFields.includes(setting.field as FilterField),
  )
  
  const settings = savedSettings.length > 0 ? savedSettings : fallbackSettings

  // Each filter gets its own options, taken from the products
  const optionsByField: Record<FilterField, FilterOption[]> = {
    origin: toOptions(allProducts.map((p) => p.origin)),
    level: toOptions(allProducts.map(getProductLevel)),
    inStock: [{ label: 'In stock only', value: 'true' }],
  }

  const groups: FilterGroup[] = settings.map((setting) => ({
    key: setting.field,
    label: setting.label,
    options: optionsByField[setting.field],
  }))

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