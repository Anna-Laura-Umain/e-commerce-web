import type {MetadataRoute} from 'next'
import {headers} from 'next/headers'
import {sanityFetch} from '@/sanity/lib/live'
import {sitemapData} from '@/sanity/lib/queries'

/**
 * Creates sitemap.xml for search engines.
 * Learn more: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const {data: pages} = await sanityFetch({query: sitemapData, stega: false})

  // Search engines need full URLs, including the protocol
  const host = (await headers()).get('host') ?? 'localhost:3000'
  const protocol = host.startsWith('localhost') ? 'http' : 'https'
  const domain = `${protocol}://${host}`

  // Pages defined in code
  const shopRoutes: MetadataRoute.Sitemap = [
    {url: domain, lastModified: new Date(), changeFrequency: 'monthly', priority: 1},
    {url: `${domain}/shop/coffee`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9},
    {url: `${domain}/shop/tea`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9},
  ]

  // Pages created by editors in Studio, e.g. About
  const editorPages: MetadataRoute.Sitemap = (pages ?? []).map((page) => ({
    url: `${domain}/${page.slug}`,
    lastModified: page._updatedAt ? new Date(page._updatedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...shopRoutes, ...editorPages]
}