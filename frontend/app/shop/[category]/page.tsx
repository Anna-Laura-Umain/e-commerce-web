import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import CoffeeCard from '@/components/CoffeeCard'
import { Coffee } from '@/types/coffee'

const PRODUCT_TYPES = ['tea', 'coffee']

const coffeeQuery = `*[_type == "coffee"]{
  _id,
  name,
  origin,
  roastLevel,
  flavorNotes,
  price,
  available
}`

export default async function ShopCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params

  if (!PRODUCT_TYPES.includes(category)) {
    notFound()
  }

  if (category === 'coffee') {
    const { data } = await sanityFetch({
      query: coffeeQuery,
    })

    const coffeeData = data as Coffee[]

    return (
      <main className="container py-12">
        <h1 className="mb-8 text-3xl font-bold">Coffee</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {coffeeData.map((coffee) => (
            <CoffeeCard
              key={coffee._id}
              coffee={coffee}
            />
          ))}
        </div>
      </main>
    )
  }

  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold">Tea</h1>
      <p className="mt-4">Coming soon</p>
    </main>
  )
}