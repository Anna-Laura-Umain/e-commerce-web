import { notFound } from 'next/navigation'

const PRODUCT_TYPES = ['tea', 'coffee']

export default async function ShopTypePage({
  params,
}: {
  params: Promise<{ type: string }>
}) {
  const { type } = await params

  if (!PRODUCT_TYPES.includes(type)) {
    notFound()
  }

  // TODO: list products filtered by productType once it's in the schema
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold capitalize">{type}</h1>
    </main>
  )
}