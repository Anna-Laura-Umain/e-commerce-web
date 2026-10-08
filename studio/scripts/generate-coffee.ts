import {faker} from '@faker-js/faker'
import fs from 'fs'
import path from 'path'




const coffeeProducts = [
  { name: 'Colombian Supremo', origin: 'Colombia' },
  { name: 'Ethiopian Yirgacheffe', origin: 'Ethiopia' },
  { name: 'Kenyan AA', origin: 'Kenya' },
  { name: 'Guatemala Antigua', origin: 'Guatemala' },
  { name: 'Brazilian Santos', origin: 'Brazil' },
  { name: 'Costa Rica Tarrazu', origin: 'Costa Rica' },
  { name: 'Sumatra Mandheling', origin: 'Indonesia' },
  { name: 'Panama Boquete', origin: 'Panama' },
  { name: 'Rwanda Bourbon', origin: 'Rwanda' },
  { name: 'Peru Organic', origin: 'Peru' },
  { name: 'Mexico Chiapas', origin: 'Mexico' },
  { name: 'Honduras Marcala', origin: 'Honduras' },
  { name: 'El Salvador Pacamara', origin: 'El Salvador' },
  { name: 'Nicaragua Jinotega', origin: 'Nicaragua' },
  { name: 'Tanzania Peaberry', origin: 'Tanzania' },
  { name: 'Papua New Guinea Sigri', origin: 'Papua New Guinea' },
  { name: 'Java Estate', origin: 'Indonesia' },
  { name: 'Burundi Kayanza', origin: 'Burundi' },
  { name: 'Bolivia Caranavi', origin: 'Bolivia' },
  { name: 'India Monsooned Malabar', origin: 'India' },

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

const coffees = coffeeProducts.map((product) => {
  

  return {
    _id: `coffee-${product.name.toLowerCase().replaceAll(' ', '-')}`,
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
      fractionDigits: 0,
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
