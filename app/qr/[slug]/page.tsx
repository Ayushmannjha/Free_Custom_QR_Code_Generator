import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { QRStudio } from '@/components/QRStudio'
import { articles } from '@/lib/content'
import { getQrType, qrTypes } from '@/lib/qr-types'
import { absoluteUrl } from '@/lib/site'

export function generateStaticParams() {
  return qrTypes.map((type) => ({ slug: type.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const type = getQrType(slug)
  if (!type) return {}
  return {
    title: type.name,
    description: `${type.description} Includes benefits, examples, best practices, FAQs, and a free QR generator.`,
    alternates: { canonical: `/qr/${type.slug}` },
    openGraph: { title: type.name, description: type.description, url: absoluteUrl(`/qr/${type.slug}`) },
    twitter: { card: 'summary_large_image', title: type.name, description: type.description },
  }
}

export default async function QrTypePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const type = getQrType(slug)
  if (!type) notFound()
  const related = articles.slice(0, 3)

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema(type)) }} />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="max-w-4xl">
          <p className="text-xs font-black uppercase tracking-wider text-moss">QR generator</p>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-[-0.04em] text-ink dark:text-white">{type.name}</h1>
          <p className="mt-5 text-lg leading-8 text-stone-600 dark:text-stone-300">{type.description}</p>
        </div>
      </section>
      <div className="px-4 sm:px-6">
        <QRStudio />
      </div>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-3">
        <article className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
          <h2 className="text-2xl font-black text-ink dark:text-white">Benefits</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-600 dark:text-stone-300">
            {type.benefits.map((item) => <li key={item}>• {item}</li>)}
          </ul>
        </article>
        <article className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
          <h2 className="text-2xl font-black text-ink dark:text-white">Step-by-step</h2>
          <ol className="mt-4 space-y-3 text-sm leading-6 text-stone-600 dark:text-stone-300">
            {['Enter the QR content or destination.', 'Choose a readable design and colors.', 'Scan the preview on a phone.', 'Download PNG or SVG and test the final placement.'].map((item, index) => <li key={item}>{index + 1}. {item}</li>)}
          </ol>
        </article>
        <article className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
          <h2 className="text-2xl font-black text-ink dark:text-white">Example</h2>
          <p className="mt-4 rounded-xl bg-stone-100 p-4 font-mono text-xs break-words dark:bg-stone-800">{type.example}</p>
        </article>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <h2 className="text-3xl font-black text-ink dark:text-white">Best practices</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {type.bestPractices.map((practice) => (
            <div key={practice} className="rounded-2xl bg-white p-5 text-sm leading-6 text-stone-600 dark:bg-stone-900 dark:text-stone-300">{practice}</div>
          ))}
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-black text-ink dark:text-white">FAQ</h2>
          <div className="mt-5 divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white dark:divide-stone-800 dark:border-stone-800 dark:bg-stone-900">
            {type.faq.map((item) => (
              <details key={item.question} className="p-5">
                <summary className="cursor-pointer font-bold text-ink dark:text-white">{item.question}</summary>
                <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-300">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-black text-ink dark:text-white">Related articles</h2>
          <div className="mt-5 grid gap-4">
            {related.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
                <h3 className="font-black text-ink dark:text-white">{article.title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">{article.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function schema(type: NonNullable<ReturnType<typeof getQrType>>) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: type.name,
        applicationCategory: 'DesignApplication',
        operatingSystem: 'Any',
        isAccessibleForFree: true,
        url: absoluteUrl(`/qr/${type.slug}`),
      },
      {
        '@type': 'FAQPage',
        mainEntity: type.faq.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: type.name, item: absoluteUrl(`/qr/${type.slug}`) },
        ],
      },
    ],
  }
}
