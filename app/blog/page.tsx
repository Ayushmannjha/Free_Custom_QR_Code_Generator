import type { Metadata } from 'next'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { articles } from '@/lib/content'

export const metadata: Metadata = {
  title: 'QR Code Blog',
  description: 'Educational QR code articles covering security, printing, business use, healthcare, restaurants, events, and best practices.',
  alternates: { canonical: '/blog' },
}

export default async function BlogPage({ searchParams }: { searchParams?: Promise<{ q?: string; page?: string }> }) {
  const resolvedSearchParams = await searchParams
  const query = (resolvedSearchParams?.q || '').toLowerCase()
  const page = Math.max(1, Number(resolvedSearchParams?.page || 1))
  const pageSize = 6
  const filtered = articles.filter((article) =>
    [article.title, article.description, article.category, ...article.tags].join(' ').toLowerCase().includes(query),
  )
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize)

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="max-w-3xl">
        <p className="text-xs font-black uppercase tracking-wider text-moss">Qraft Blog</p>
        <h1 className="mt-3 font-display text-5xl font-bold tracking-[-0.04em] text-ink dark:text-white">QR code guides for safer, smarter use.</h1>
        <p className="mt-5 text-lg leading-8 text-stone-600 dark:text-stone-300">Browse practical articles with examples, FAQs, internal links, and advice for real-world QR projects.</p>
      </div>

      <form className="mt-10 flex max-w-xl items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 dark:border-stone-800 dark:bg-stone-900">
        <Search size={18} className="text-stone-500" />
        <input name="q" defaultValue={resolvedSearchParams?.q || ''} placeholder="Search articles, tags, or categories" className="min-w-0 flex-1 bg-transparent outline-none" />
        <button className="rounded-xl bg-ink px-4 py-2 text-sm font-bold text-white dark:bg-lime dark:text-ink">Search</button>
      </form>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((article) => (
          <Link key={article.slug} href={`/blog/${article.slug}`} className="rounded-2xl border border-stone-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-soft dark:border-stone-800 dark:bg-stone-900">
            <p className="text-xs font-bold uppercase tracking-wider text-moss">{article.category} · {article.readingTime}</p>
            <h2 className="mt-3 text-2xl font-black tracking-[-0.02em] text-ink dark:text-white">{article.title}</h2>
            <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-300">{article.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {article.tags.map((tag) => <span key={tag} className="rounded-full bg-stone-100 px-3 py-1 text-xs dark:bg-stone-800">{tag}</span>)}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between text-sm font-bold">
        <Link aria-disabled={page <= 1} href={`/blog?q=${encodeURIComponent(query)}&page=${Math.max(1, page - 1)}`} className={page <= 1 ? 'pointer-events-none text-stone-400' : 'text-moss'}>Previous</Link>
        <span>Page {page} of {totalPages}</span>
        <Link aria-disabled={page >= totalPages} href={`/blog?q=${encodeURIComponent(query)}&page=${Math.min(totalPages, page + 1)}`} className={page >= totalPages ? 'pointer-events-none text-stone-400' : 'text-moss'}>Next</Link>
      </div>
    </main>
  )
}
