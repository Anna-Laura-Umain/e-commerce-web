import {faker} from '@faker-js/faker'
import fs from 'fs'
import path from 'path'

const coffeeProducts = [
  {
    name: 'Colombian Supremo',
    origin: 'Colombia',
  },
  {
    name: 'Ethiopian Yirgacheffe',
    origin: 'Ethiopia',
  },
  {
    name: 'Kenyan AA',
    origin: 'Kenya',
  },
  {
    name: 'Guatemala Antigua',
    origin: 'Guatemala',
  },
  {
    name: 'Brazilian Santos',
    origin: 'Brazil',
  },
  {
    name: 'Costa Rica Tarrazu',
    origin: 'Costa Rica',
  },
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

const processingMethods = [
  'Washed',
  'Natural',
  'Honey',
]

const brewingInstructions = [
  'Best suited for pour-over.',
  'Recommended for French press.',
  'Works well for espresso.',
  'Ideal for filter coffee.',
]

const descriptions = [
  'A balanced coffee with a smooth body and clean finish.',
  'A bright and aromatic coffee with layered sweetness.',
  'A rich coffee with a full body and lingering finish.',
]

const coffees = Array.from({length: 20}, () => {
  const product = faker.helpers.arrayElement(coffeeProducts)
  return {
    _id: faker.string.uuid(),
    name: product.name,
    origin: product.origin,
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
    description: faker.helpers.arrayElement(descriptions),
    processingMethod: faker.helpers.arrayElement(processingMethods),
    brewingInstructions: faker.helpers.arrayElement(brewingInstructions),
  }
})

const outputDir = path.join(process.cwd(), 'mock-data')

fs.mkdirSync(outputDir, {recursive: true})

fs.writeFileSync(
  path.join(outputDir, 'coffees.json'),
  JSON.stringify(coffees, null, 2),
)

console.log(`Generated ${coffees.length} coffees`)
