import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MarkdownArticle } from '@/components/MarkdownArticle'
import { articles, getArticle, getRelatedArticles } from '@/lib/content'
import { absoluteUrl, site } from '@/lib/site'

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      url: absoluteUrl(`/blog/${article.slug}`),
      publishedTime: article.date,
      authors: [site.author.name],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
  }
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()
  const related = getRelatedArticles(article)

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }} />
      <div className="mb-10 rounded-2xl border border-stone-200 bg-white p-5 text-sm text-stone-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300">
        <Link href="/" className="hover:text-ink dark:hover:text-white">Home</Link> <span>/</span> <Link href="/blog" className="hover:text-ink dark:hover:text-white">Blog</Link> <span>/</span> <span>{article.title}</span>
      </div>
      <p className="mb-3 text-xs font-black uppercase tracking-wider text-moss">{article.category} · {article.readingTime} · {article.date}</p>
      <MarkdownArticle markdown={article.markdown} />
      <section className="mt-14 border-t border-stone-200 pt-10 dark:border-stone-800">
        <h2 className="text-2xl font-black text-ink dark:text-white">Related articles</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {related.map((item) => (
            <Link key={item.slug} href={`/blog/${item.slug}`} className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
              <h3 className="font-black text-ink dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

function articleJsonLd(article: NonNullable<ReturnType<typeof getArticle>>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: { '@type': 'Organization', name: site.author.name, url: absoluteUrl(site.author.url) },
    publisher: { '@type': 'Organization', name: site.name, url: site.url },
    mainEntityOfPage: absoluteUrl(`/blog/${article.slug}`),
  }
}
