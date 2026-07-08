import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'About Qraft', description: 'Learn about Qraft, a private QR code generator and educational resource for safer QR use.', alternates: { canonical: '/about' } }

export default function AboutPage() {
  return <TrustPage title="About Qraft" body="Qraft helps people create useful static QR codes and understand how to use them responsibly. The project combines a private browser-side generator with educational guides for businesses, healthcare teams, restaurants, educators, event organizers, and personal users." />
}

function TrustPage({ title, body }: { title: string; body: string }) {
  return <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6"><article className="prose-content"><h1>{title}</h1><p>{body}</p><h2>Our Approach</h2><p>We prioritize clear instructions, accurate practical guidance, fast pages, accessibility, and transparency about privacy. Qraft does not require an account to generate static QR codes.</p></article></main>
}

