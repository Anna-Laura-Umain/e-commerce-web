import { client } from './sanityClient'

async function deleteCoffees() {
  const ids = await client.fetch<string[]>(
    `*[_type == "coffee"]._id`
  )

  for (const id of ids) {
    await client.delete(id)
    console.log(`Deleted: ${id}`)
  }

  console.log('All coffee documents deleted')
}

deleteCoffees().catch((error) => {
  console.error(error)
  process.exit(1)
})