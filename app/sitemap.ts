import type { MetadataRoute } from 'next'
import { articles, docs, learnGuides } from '@/lib/content'
import { qrTypes } from '@/lib/qr-types'
import { absoluteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/blog',
    '/learn',
    '/docs',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/cookie-policy',
    '/disclaimer',
    '/editorial-policy',
    '/mission',
    '/author/qraft-editorial-team',
  ]

  return [
    ...staticRoutes.map((route) => entry(route, 'weekly', route === '' ? 1 : 0.7)),
    ...articles.map((article) => entry(`/blog/${article.slug}`, 'monthly', 0.8)),
    ...learnGuides.map((guide) => entry(`/learn/${guide.slug}`, 'monthly', 0.7)),
    ...docs.map((doc) => entry(`/docs/${doc.slug}`, 'monthly', 0.6)),
    ...qrTypes.map((type) => entry(`/qr/${type.slug}`, 'weekly', 0.85)),
  ]
}

function entry(path: string, changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'], priority: number) {
  return {
    url: absoluteUrl(path || '/'),
    lastModified: new Date('2026-07-08'),
    changeFrequency,
    priority,
  }
}

