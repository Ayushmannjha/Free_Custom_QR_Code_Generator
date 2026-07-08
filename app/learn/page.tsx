import type { Metadata } from 'next'
import Link from 'next/link'
import { learnGuides } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Learn QR Codes',
  description: 'Learn how QR codes store information, how error correction works, and how to use QR codes in marketing, healthcare, payments, and education.',
  alternates: { canonical: '/learn' },
}

export default function LearnPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <p className="text-xs font-black uppercase tracking-wider text-moss">Learn</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold tracking-[-0.04em] text-ink dark:text-white">QR code learning center.</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-600 dark:text-stone-300">Plain-language guides for people who want to publish QR codes responsibly, explain them clearly, and avoid common mistakes.</p>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {learnGuides.map((guide) => (
          <Link key={guide.slug} href={`/learn/${guide.slug}`} className="rounded-2xl border border-stone-200 bg-white p-6 hover:shadow-soft dark:border-stone-800 dark:bg-stone-900">
            <span className="rounded-full bg-lime/30 px-3 py-1 text-xs font-bold text-moss">{guide.level}</span>
            <h2 className="mt-4 text-xl font-black text-ink dark:text-white">{guide.title}</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">{guide.description}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}

