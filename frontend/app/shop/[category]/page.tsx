import {notFound} from 'next/navigation'
import {sanityFetch} from '@/sanity/lib/live'
import {coffeeListQuery, teaListQuery} from '@/sanity/lib/queries'
import ProductCard from '@/components/ProductCard'
import type {Product} from '@/types/product'

export default async function ShopCategoryPage({
  params,
}: {
  params: Promise<{category: string}>
}) {
  const {category} = await params

  if (category !== 'coffee' && category !== 'tea') {
    notFound()
  }

  const isCoffee = category === 'coffee'
  const title = isCoffee ? 'Coffee' : 'Tea'
  const query = isCoffee ? coffeeListQuery : teaListQuery

  const {data} = await sanityFetch({query})

  // TODO: replace the cast with generated types
  const products = data as Product[]

  return (
    <main className="container py-12">
      <h1 className="mb-8 heading-display text-3xl md:text-4xl text-center">{title}</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} category={category} />
        ))}
      </div>
    </main>
  )
}

// moved queries to frontend/sanity/lib/queries.ts
