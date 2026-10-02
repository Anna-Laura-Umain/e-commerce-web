import fs from 'fs' // module fs works with files
import path from 'path'
import {client} from './sanityClient'

type Coffee = {
  _id: string
  name: string
  origin: string
  roastLevel: string
  flavorNotes: string[]
  price: number
  available: boolean
}
// find coffees.json
const filePath = path.join(
  process.cwd(),
  'mock-data',
  'coffees.json',
)

const coffees: Coffee[] = JSON.parse(
  fs.readFileSync(filePath, 'utf-8'), // read & parse json
)

async function seed() {
  console.log(`Found ${coffees.length} coffees`) 

  for (const coffee of coffees) {
    await client.createOrReplace({ // createOrReplace - sanity' method 
      _id: coffee._id,
      _type: 'product',

      name: coffee.name,
      origin: coffee.origin,
      roastLevel: coffee.roastLevel,
      flavorNotes: coffee.flavorNotes,
      price: coffee.price,
      available: coffee.available,
    })

    console.log(`Created: ${coffee.name}`)
  }

  console.log('Seed completed!')
}

seed().catch((error) => {
  console.error('Seed failed:')
  console.error(error)
  process.exit(1)
})
