import 'dotenv/config'
import {createClient} from '@sanity/client'

export const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  apiVersion: '2026-10-02',
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
})


