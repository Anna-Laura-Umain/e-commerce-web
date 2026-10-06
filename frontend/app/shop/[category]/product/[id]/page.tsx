export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{
    category: string
    id: string
  }>
}) {
  const { category, id } = await params

  return (
    <main>
      <h1>Product Detail</h1>
      <p>Category: {category}</p>
      <p>ID: {id}</p>
    </main>
  )
}