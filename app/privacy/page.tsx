import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy Policy', description: 'Qraft privacy policy for QR generation, analytics, cookies, and advertising.', alternates: { canonical: '/privacy' } }

export default function PrivacyPage() {
  return <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6"><article className="prose-content"><h1>Privacy Policy</h1><p>Qraft is designed so static QR codes can be generated in your browser without creating an account. The content you enter into the generator is used to render the QR code preview and download file.</p><h2>Advertising</h2><p>Qraft may use Google AdSense. Google and its partners may use cookies or similar technologies to serve, measure, and personalize ads where permitted.</p><h2>Personal Data</h2><p>Do not encode passwords, private keys, medical records, or other confidential information directly into a static QR code.</p></article></main>
}

