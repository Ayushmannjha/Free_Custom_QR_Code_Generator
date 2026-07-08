import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Mission', description: 'Qraft mission statement for accessible, private, and helpful QR code tools.', alternates: { canonical: '/mission' } }

export default function MissionPage() {
  return <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6"><article className="prose-content"><h1>Mission</h1><p>Qraft exists to make QR code creation simple, private, and understandable. Our mission is to help people connect offline materials to digital actions without confusing users or compromising trust.</p></article></main>
}

