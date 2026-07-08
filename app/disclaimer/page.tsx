import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Disclaimer', description: 'Disclaimer for Qraft educational content and QR code generation.', alternates: { canonical: '/disclaimer' } }

export default function DisclaimerPage() {
  return <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6"><article className="prose-content"><h1>Disclaimer</h1><p>Qraft content is educational and practical, not legal, medical, security, or professional advice. Always test QR codes before public use and review privacy obligations for your organization.</p></article></main>
}

