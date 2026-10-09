import {notFound} from 'next/navigation'
import {sanityFetch} from '@/sanity/lib/live'
import {productQuery} from '@/sanity/lib/queries'
import ProductDetails from '@/components/ProductDetails'
import type {Product} from '@/types/product'

// Preserve existing slug URLs alongside the current ID-based product route.
export default async function ProductPage({params}: {
  params: Promise<{category: string; slug: string}>
}) {
  const {category, slug} = await params
  if (category !== 'coffee' && category !== 'tea') notFound()

  const {data} = await sanityFetch({query: productQuery, params: {category, slug}})
  const product = data as Product | null
  if (!product) notFound()

  return <ProductDetails product={product} />
}
