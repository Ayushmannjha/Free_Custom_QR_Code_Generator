import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Terms of Use', description: 'Terms for using Qraft QR code generator and educational content.', alternates: { canonical: '/terms' } }

export default function TermsPage() {
  return <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6"><article className="prose-content"><h1>Terms of Use</h1><p>Qraft is provided for general QR code creation and educational purposes. You are responsible for the destinations, content, and printed materials you create with the tool.</p><h2>Acceptable Use</h2><p>Do not use Qraft to create misleading, harmful, illegal, or deceptive QR codes.</p></article></main>
}

