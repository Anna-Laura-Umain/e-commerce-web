import {faker} from '@faker-js/faker'
import fs from 'fs'
import path from 'path'

const origins = [
  'Ethiopia',
  'Colombia',
  'Brazil',
  'Kenya',
  'Guatemala',
  'Costa Rica',
]

const coffeeNames = [
  'Ethiopian Yirgacheffe',
  'Colombian Supremo',
  'Brazilian Santos',
  'Kenyan AA',
  'Guatemala Antigua',
  'Costa Rica Tarrazu',
]

const flavorNotes = [
  'Chocolate',
  'Caramel',
  'Blueberry',
  'Citrus',
  'Jasmine',
  'Hazelnut',
  'Vanilla',
  'Almond',
  'Berry',
  'Floral',
]

const roastLevels = ['Light', 'Medium', 'Dark']

const coffees = Array.from({length: 20}, () => ({
  _id: faker.string.uuid(),
  
  // helper arrayElement from fakerjs - returns random element from the given array.

  name: faker.helpers.arrayElement(coffeeNames), 

  origin: faker.helpers.arrayElement(origins),

  roastLevel: faker.helpers.arrayElement(roastLevels),

  flavorNotes: faker.helpers.arrayElements(flavorNotes, {
    min: 2,
    max: 4,
  }),

  price: faker.number.float({
    min: 10,
    max: 35,
    fractionDigits: 2,
  }),

  available: faker.datatype.boolean(),
}))

const outputDir = path.join(process.cwd(), 'mock-data')

fs.mkdirSync(outputDir, {recursive: true})

fs.writeFileSync(
  path.join(outputDir, 'coffees.json'),
  JSON.stringify(coffees, null, 2),
)

console.log(`Generated ${coffees.length} coffees`)
