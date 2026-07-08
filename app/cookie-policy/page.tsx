import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Cookie Policy', description: 'Cookie policy for Qraft including advertising and site functionality.', alternates: { canonical: '/cookie-policy' } }

export default function CookiePolicyPage() {
  return <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6"><article className="prose-content"><h1>Cookie Policy</h1><p>Qraft may use cookies and similar technologies for essential functionality, preference storage such as dark mode, analytics, and advertising services such as Google AdSense.</p><h2>Managing Cookies</h2><p>You can manage cookies through your browser settings and advertising personalization controls.</p></article></main>
}

