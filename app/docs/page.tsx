import type { Metadata } from 'next'
import Link from 'next/link'
import { docs } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Qraft documentation for getting started, downloading QR codes, printing, sizing, error correction, troubleshooting, and future API plans.',
  alternates: { canonical: '/docs' },
}

export default function DocsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <p className="text-xs font-black uppercase tracking-wider text-moss">Documentation</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold tracking-[-0.04em] text-ink dark:text-white">Use Qraft with confidence.</h1>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {docs.map((doc) => (
          <Link key={doc.slug} href={`/docs/${doc.slug}`} className="rounded-2xl border border-stone-200 bg-white p-6 hover:shadow-soft dark:border-stone-800 dark:bg-stone-900">
            <h2 className="text-xl font-black text-ink dark:text-white">{doc.title}</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">{doc.description}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}

