import { articles } from '@/lib/content'
import { absoluteUrl, site } from '@/lib/site'

export const dynamic = 'force-static'

export function GET() {
  const items = articles
    .map(
      (article) => `
        <item>
          <title><![CDATA[${article.title}]]></title>
          <link>${absoluteUrl(`/blog/${article.slug}`)}</link>
          <guid>${absoluteUrl(`/blog/${article.slug}`)}</guid>
          <pubDate>${new Date(article.date).toUTCString()}</pubDate>
          <description><![CDATA[${article.description}]]></description>
        </item>`,
    )
    .join('')

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${site.name} QR Code Blog</title>
        <link>${site.url}</link>
        <description>${site.description}</description>
        <language>en-IN</language>
        ${items}
      </channel>
    </rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}

