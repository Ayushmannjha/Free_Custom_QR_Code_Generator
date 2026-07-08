import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Qraft Editorial Team', description: 'Author profile for Qraft QR code guides and documentation.', alternates: { canonical: '/author/qraft-editorial-team' } }

export default function AuthorPage() {
  return <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6"><article className="prose-content"><h1>Qraft Editorial Team</h1><p>The Qraft Editorial Team writes practical QR code guides for creators, small businesses, educators, healthcare teams, restaurants, and event organizers. Our focus is clear utility, responsible publishing, and safer scanning habits.</p><h2>Editorial Focus</h2><p>We cover QR code basics, static and dynamic tradeoffs, design reliability, privacy, printing, accessibility, and real-world use cases.</p></article></main>
}

