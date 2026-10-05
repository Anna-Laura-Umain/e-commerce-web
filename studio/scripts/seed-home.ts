import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-01-01'})

async function seedHome() {
  await client.createIfNotExists({
    _id: 'homePage',
    _type: 'homePage',
    hero: {
      heading: 'Tea and coffee, freshly picked for you',
      text: 'Loose-leaf teas and small-batch coffee from growers we know by name.',
      ctaLabel: 'Shop now',
      ctaHref: '/shop',
    },
  })
  console.log('Home page is ready')
}

seedHome().catch((error) => {
  console.error(error)
  process.exit(1)
})