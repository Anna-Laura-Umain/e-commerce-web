import { faker } from '@faker-js/faker'
import fs from 'fs'

const teaProducts = [
  {
    name: 'Japanese Sencha',
    origin: 'Japan',
    teaType: 'Green',
  },
  {
    name: 'Assam Black Tea',
    origin: 'India',
    teaType: 'Black',
  },
  {
    name: 'Taiwan High Mountain Oolong',
    origin: 'Taiwan',
    teaType: 'Oolong',
  },
  {
    name: 'Silver Needle White Tea',
    origin: 'China',
    teaType: 'White',
  },
  {
    name: 'Moroccan Mint Tea',
    origin: 'Morocco',
    teaType: 'Herbal',
  },
]


const oxidationLevelsByTeaType = {
  Green: 'Low',
  Black: 'High',
  Oolong: 'Medium',
  White: 'Low',
  Herbal: 'Low',

}

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

const descriptions = [
  'A delicate tea with a light and refreshing flavor.',
  'Rich and robust, perfect for a morning boost.',
  'Smooth and mellow with a hint of sweetness.',
  'A complex tea with layers of flavor and aroma.',
  'Bright and lively, ideal for an afternoon pick-me-up.',
]

const processingMethods = [
  'Steamed',
  'Pan-fired',
  'Sun-dried',
  'Fermented',
  'Rolled',
]

const brewingInstructions = [
  'Steep in hot water for 2-3 minutes.',
  'Use loose leaves for best flavor.',
  'Adjust steeping time based on taste preference.',
  'Steep for 2–3 minutes at 80°C.',
  'Steep for 3–4 minutes at 90°C.',
  'Steep for 4–5 minutes at 95°C.',
]

const teas = Array.from({ length: 20 }, (_, index) => {
  const product = faker.helpers.arrayElement(teaProducts)
  return {
    _id: `tea-${product.name.toLowerCase().replaceAll(' ', '-')}-${index}`,
    name: `${faker.location.country()} ${product.name}`,
    origin: faker.location.country(),
    oxidationLevel: oxidationLevelsByTeaType[product.teaType as keyof typeof oxidationLevelsByTeaType],
    teaType: product.teaType,
  flavorNotes: faker.helpers.arrayElements(flavorOptions, {
    min: 2,
    max: 4,
  }),
  price: faker.number.int({
    min: 80,
    max: 250,
  }),
  available: faker.datatype.boolean(),
  description: faker.helpers.arrayElement(descriptions),
  processingMethod: faker.helpers.arrayElement(processingMethods),
  brewingInstructions: faker.helpers.arrayElement(brewingInstructions),
}
})

fs.writeFileSync(
  './mock-data/teas.json',
  JSON.stringify(teas, null, 2)
)

console.log(`Tea mock data created,Generated ${teas.length} teas`)