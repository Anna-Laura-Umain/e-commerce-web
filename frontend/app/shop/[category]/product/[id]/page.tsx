import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { productDetailQuery } from '@/sanity/lib/queries'
import ProductDetails from '@/components/ProductDetails'
import type { Product } from '@/types/product'

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{
    category: string
    id: string
  }>
}) {
  const { category, id } = await params

  if (category !== 'coffee' && category !== 'tea') {
    notFound()
  }

  const { data } = await sanityFetch({
    query: productDetailQuery,
    params: { category, id },
  })

  const product = data as Product | null

  if (!product) {
    notFound()
  }

  return <ProductDetails product={product} />
}