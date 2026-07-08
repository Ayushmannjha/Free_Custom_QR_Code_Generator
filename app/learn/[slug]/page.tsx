import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { learnGuides } from '@/lib/content'
import { qrTypes } from '@/lib/qr-types'

export function generateStaticParams() {
  return learnGuides.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = learnGuides.find((item) => item.slug === slug)
  if (!guide) return {}
  return { title: guide.title, description: guide.description, alternates: { canonical: `/learn/${guide.slug}` } }
}

export default async function LearnGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = learnGuides.find((item) => item.slug === slug)
  if (!guide) notFound()
  return (
    <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <Link href="/learn" className="text-sm font-bold text-moss">← Learn center</Link>
      <article className="prose-content mt-8">
        <h1>{guide.title}</h1>
        <p>{guide.description}</p>
        <h2>What You Should Know</h2>
        <p>QR codes are practical when the destination is clear, mobile-friendly, and useful in the moment of scanning. A good QR experience combines a readable code, a trusted label, and a page that immediately matches the promise near the code.</p>
        <h2>Best Practices</h2>
        <p>Use high contrast, preserve a quiet zone, test on multiple phones, and print a sample before using the code in public. For sensitive environments, avoid storing confidential information directly in the code.</p>
        <h2>Related Generators</h2>
        <p>{qrTypes.slice(0, 3).map((type) => type.shortName).join(', ')} QR codes are common starting points for this topic.</p>
      </article>
    </main>
  )
}
