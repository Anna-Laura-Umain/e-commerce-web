// This is temporary script to delete all coffee documents from Sanity Studio. 
//save it now in case we need to delete all coffee documents again in the future.
// run this script with 'npx tsx scripts/generate-coffee.ts' USE WITH CAUTION!

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