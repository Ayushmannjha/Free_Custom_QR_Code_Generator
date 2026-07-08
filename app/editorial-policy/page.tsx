import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Editorial Policy', description: 'How Qraft writes, reviews, and updates QR code educational content.', alternates: { canonical: '/editorial-policy' } }

export default function EditorialPolicyPage() {
  return <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6"><article className="prose-content"><h1>Editorial Policy</h1><p>Qraft articles are written to answer practical user questions clearly. We focus on first-principles explanations, real-world examples, testing advice, privacy context, and links to related resources.</p><h2>Review Standard</h2><p>Content should be accurate, useful, non-deceptive, and updated when QR technology, browser behavior, or site functionality changes.</p></article></main>
}

