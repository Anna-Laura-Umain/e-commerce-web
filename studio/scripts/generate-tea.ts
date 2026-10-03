import { faker } from '@faker-js/faker'
import fs from 'fs'

const teaTypes = [
  'Green',
  'Black',
  'Oolong',
  'White',
  'Herbal',
]

const oxidationLevels = [
  'Low',
  'Medium',
  'High',
]

const flavorOptions = [
  'Floral',
  'Citrus',
  'Earthy',
  'Sweet',
  'Nutty',
  'Fruity',
  'Smoky',
  'Fresh',
]

const teas = Array.from({ length: 20 }, (_, index) => ({
  _id: `tea-${index + 1}`,
  name: `${faker.location.country()} ${faker.helpers.arrayElement(teaTypes)} Tea`,
  origin: faker.location.country(),
  oxidationLevel: faker.helpers.arrayElement(oxidationLevels),
  teaType: faker.helpers.arrayElement(teaTypes),
  flavorNotes: faker.helpers.arrayElements(flavorOptions, {
    min: 2,
    max: 4,
  }),
  price: faker.number.int({
    min: 80,
    max: 250,
  }),
  available: faker.datatype.boolean(),
}))

fs.writeFileSync(
  './mock-data/teas.json',
  JSON.stringify(teas, null, 2)
)

console.log(`Tea mock data created,Generated ${teas.length} teas`)