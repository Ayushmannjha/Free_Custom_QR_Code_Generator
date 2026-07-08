import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { docs } from '@/lib/content'

export function generateStaticParams() {
  return docs.map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const doc = docs.find((item) => item.slug === slug)
  if (!doc) return {}
  return { title: doc.title, description: doc.description, alternates: { canonical: `/docs/${doc.slug}` } }
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = docs.find((item) => item.slug === slug)
  if (!doc) notFound()
  return (
    <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <Link href="/docs" className="text-sm font-bold text-moss">← Documentation</Link>
      <article className="prose-content mt-8">
        <h1>{doc.title}</h1>
        <p>{doc.description}</p>
        <h2>Overview</h2>
        <p>This documentation page explains the practical choices that affect scan quality, download quality, and print reliability. Qraft focuses on static QR generation with clear defaults and browser-side rendering.</p>
        <h2>Recommended Workflow</h2>
        <p>Create the code, customize only as much as needed, scan the preview, download the right format, and test the output in its final environment. Use SVG for professional print and PNG for documents, websites, and social posts.</p>
        <h2>Troubleshooting</h2>
        <p>If scanning fails, increase size, improve color contrast, add more quiet zone, simplify the logo, and verify that the destination text is valid.</p>
      </article>
    </main>
  )
}
