import fs from 'fs' // module fs works with files
import path from 'path'
import {client} from './sanityClient'


type Tea = {
  _id: string
  name: string
  origin: string
  oxidationLevel: string
  teaType: string
  flavorNotes: string[]
  price: number
  available: boolean
  description: string
  processingMethod: string
  brewingInstructions: string
}
// find coffees.json
const filePath = path.join(
  process.cwd(),
  'mock-data',
  'teas.json',
)

const teas: Tea[] = JSON.parse(
  fs.readFileSync(filePath, 'utf-8'), // read & parse json
)

async function seed() {
  console.log(`Found ${teas.length} teas`) 

  for (const tea of teas) {
    await client.createOrReplace({ // createOrReplace - sanity' method 
      ...tea,
      _type: 'tea',

     
    })

    console.log(`Created: ${tea.name}`)
  }

  console.log('Seed completed!')
}

seed().catch((error) => {
  console.error('Seed failed:')
  console.error(error)
  process.exit(1)
})
