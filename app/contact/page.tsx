import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Contact', description: 'Contact the Qraft team for feedback, corrections, and support questions.', alternates: { canonical: '/contact' } }

export default function ContactPage() {
  return <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6"><article className="prose-content"><h1>Contact</h1><p>For feedback, corrections, and support questions, contact the Qraft team through the official site owner channels for antss.in. Include the page URL, your device, and a short description of the issue so we can investigate clearly.</p><h2>Corrections</h2><p>If you notice a technical or editorial mistake, please include the article title and the exact sentence or recommendation you want reviewed.</p></article></main>
}

