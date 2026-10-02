import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { productQuery } from '@/sanity/lib/queries'


// TODO: switch to slug and filter by productType once they are in the schema

export default async function ProductPage({
  params,
}: {
  params: Promise<{ type: string; id: string }>
}) {
  const { id } = await params
  const { data: product } = await sanityFetch({
    query: productQuery,
    params: { id },
  })
  if (!product) {
    notFound()
  }
  return (
    <main className="container py-12 max-w-3xl">
      <p className="text-sm text-muted-foreground">{product.origin}</p>
      <h1 className="text-3xl font-bold mt-1">{product.name}</h1>
      <p className="text-xl mt-4">{product.price} SEK</p>
      {product.roastLevel && <p className="mt-4">Roast: {product.roastLevel}</p>}
      {product.flavorNotes && (
        <ul className="flex gap-2 mt-4">
          {product.flavorNotes.map((note) => (
            <li key={note} className="text-sm border rounded-full px-3 py-1">
              {note}
            </li>
          ))}
        </ul>
      )}
      <button className="mt-8" disabled={!product.available}>
        {product.available ? "Add to cart" : "Out of stock"}
      </button>
    </main>
  )
}