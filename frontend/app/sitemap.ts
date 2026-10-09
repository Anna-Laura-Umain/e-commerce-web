import type {MetadataRoute} from 'next'
import {headers} from 'next/headers'
import {sanityFetch} from '@/sanity/lib/live'
import {sitemapData} from '@/sanity/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const {data: pages} = await sanityFetch({
    query: sitemapData,
    perspective: 'published',
    stega: false,
  })
  const headersList = await headers()
  const host = headersList.get('host') ?? 'localhost:3000'
  const protocol = host.startsWith('localhost') || host.startsWith('127.0.0.1') ? 'http' : 'https'
  const origin = `${protocol}://${host}`

  return [
    {url: `${origin}/`, priority: 1, changeFrequency: 'monthly'},
    {url: `${origin}/shop/coffee`, priority: 0.9, changeFrequency: 'weekly'},
    {url: `${origin}/shop/tea`, priority: 0.9, changeFrequency: 'weekly'},
    ...pages.filter((page) => Boolean(page.slug)).map((page) => ({
      url: `${origin}/${page.slug}`,
      lastModified: page._updatedAt,
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    })),
  ]
}
