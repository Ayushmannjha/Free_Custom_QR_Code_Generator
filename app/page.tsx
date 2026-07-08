import Link from 'next/link'
import { ArrowRight, CheckCircle2, GraduationCap, HeartPulse, Lock, MessageSquareQuote, Store, Utensils, Wifi } from 'lucide-react'
import { QRStudio } from '@/components/QRStudio'
import { articles, getPopularTypes } from '@/lib/content'
import { qrTypes } from '@/lib/qr-types'
import { absoluteUrl, site } from '@/lib/site'

const useCases = [
  ['Business', 'Share websites, catalogs, contact cards, invoices, booking pages, and post-sale support resources.', Store],
  ['Healthcare', 'Guide patients to appointment instructions, department maps, consent resources, and education pages.', HeartPulse],
  ['Education', 'Connect worksheets, classroom posters, library displays, and assignments to trusted digital resources.', GraduationCap],
  ['Retail', 'Add product care guides, reviews, loyalty enrollment, warranty registration, and offers to packaging.', Store],
  ['Restaurants', 'Publish menus, Wi-Fi access, reservation links, ordering pages, and feedback forms.', Utensils],
  ['Personal use', 'Create codes for invitations, portfolios, resumes, social profiles, and home organization labels.', Wifi],
]

export default function HomePage() {
  const popular = getPopularTypes()
  const latest = articles.slice(0, 3)

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd()) }} />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_.8fr] lg:py-20">
        <div>
          <p className="inline-flex rounded-full border border-lime/70 bg-lime/25 px-3 py-1 text-xs font-black uppercase tracking-wider text-moss">Free · private · no sign-up</p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-bold leading-none tracking-[-0.04em] text-ink dark:text-white sm:text-7xl">Create custom QR codes and learn how to use them safely.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600 dark:text-stone-300">Qraft is a professional QR code generator with practical guides for printing, healthcare, restaurants, education, business cards, events, privacy, and everyday scanning.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#generator" className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 font-bold text-white dark:bg-lime dark:text-ink">Generate QR <ArrowRight size={18} /></Link>
            <Link href="#learn-more" className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-3 font-bold text-ink dark:border-stone-700 dark:bg-stone-900 dark:text-white">Learn More</Link>
          </div>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-soft dark:border-stone-800 dark:bg-stone-900">
          <h2 className="text-xl font-black text-ink dark:text-white">Trust signals</h2>
          <div className="mt-5 grid gap-4">
            {['Static QR codes generated in your browser', 'Legal, privacy, editorial, and author pages included', 'Guides for safer scanning and better printing', 'Sitemap, RSS, metadata, and structured data'].map((item) => (
              <p key={item} className="flex gap-3 text-sm text-stone-600 dark:text-stone-300"><CheckCircle2 className="mt-0.5 shrink-0 text-moss" size={18} /> {item}</p>
            ))}
          </div>
        </div>
      </section>

      <div className="px-4 sm:px-6">
        <QRStudio />
      </div>

      <section id="learn-more" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <p className="text-xs font-black uppercase tracking-wider text-moss">Why QR codes matter</p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-[-0.03em] text-ink dark:text-white sm:text-5xl">A small code can remove a lot of friction.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map(([title, body, Icon]) => (
            <article key={title as string} className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
              <Icon className="text-moss" />
              <h3 className="mt-4 text-lg font-black text-ink dark:text-white">{title as string}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">{body as string}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white py-20 dark:border-stone-800 dark:bg-stone-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-black uppercase tracking-wider text-moss">Supported formats</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-[-0.03em] text-ink dark:text-white">Popular QR types with dedicated guides.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {qrTypes.map((type) => (
              <Link key={type.slug} href={`/qr/${type.slug}`} className="rounded-2xl border border-stone-200 p-6 transition hover:-translate-y-1 hover:shadow-soft dark:border-stone-800">
                <h3 className="text-lg font-black text-ink dark:text-white">{type.name}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">{type.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-moss">How it works</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-[-0.03em] text-ink dark:text-white">Four simple steps from idea to scannable code.</h2>
          </div>
          <div className="grid gap-4">
            {['Choose a QR type or paste your destination.', 'Customize colors, patterns, quiet zone, and optional logo.', 'Scan the live preview on multiple devices.', 'Download PNG or SVG and place it with clear instructions.'].map((step, index) => (
              <div key={step} className="flex gap-4 rounded-2xl bg-white p-5 dark:bg-stone-900">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-lime text-sm font-black text-ink">{index + 1}</span>
                <p className="text-stone-700 dark:text-stone-300">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-20 sm:px-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <p className="text-xs font-black uppercase tracking-wider text-moss">Security & privacy</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-[-0.03em] text-ink dark:text-white">Built for trust.</h2>
        </div>
        <div className="grid gap-4 lg:col-span-2">
          {[
            ['Private generation', 'Static QR codes are rendered in your browser, with no account required for routine use.'],
            ['Safer publishing', 'Every guide encourages clear labels, HTTPS destinations, testing, and responsible data handling.'],
            ['No mystery scans', 'Helpful content explains what QR codes do, how they work, and how to avoid risky scanning behavior.'],
          ].map(([title, body]) => (
            <article key={title} className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
              <Lock className="text-moss" />
              <h3 className="mt-3 font-black text-ink dark:text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white py-20 dark:border-stone-800 dark:bg-stone-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-black uppercase tracking-wider text-moss">Testimonials</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {['The privacy-first generator is simple enough for our front desk team and polished enough for printed patient guides.', 'We use Qraft for menu tests, Wi-Fi cards, and local offers without needing a design tool every time.', 'The learning pages helped our students understand QR safety instead of just scanning anything they see.'].map((quote, index) => (
              <blockquote key={quote} className="rounded-2xl border border-stone-200 bg-paper p-6 dark:border-stone-800 dark:bg-stone-900">
                <MessageSquareQuote className="text-moss" />
                <p className="mt-4 text-sm leading-6 text-stone-700 dark:text-stone-300">“{quote}”</p>
                <footer className="mt-4 text-xs font-bold text-ink dark:text-white">{['Clinic operations lead', 'Cafe owner', 'Technology teacher'][index]}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-moss">Latest blog posts</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-[-0.03em] text-ink dark:text-white">Helpful QR code education.</h2>
          </div>
          <Link href="/blog" className="font-bold text-moss">View all articles</Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {latest.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="rounded-2xl border border-stone-200 bg-white p-6 hover:shadow-soft dark:border-stone-800 dark:bg-stone-900">
              <p className="text-xs font-bold uppercase tracking-wider text-moss">{article.category}</p>
              <h3 className="mt-3 text-xl font-black text-ink dark:text-white">{article.title}</h3>
              <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-300">{article.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
        <h2 className="font-display text-4xl font-bold tracking-[-0.03em] text-ink dark:text-white">Frequently asked questions</h2>
        <div className="mt-8 divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white dark:divide-stone-800 dark:border-stone-800 dark:bg-stone-900">
          {[
            ['Is Qraft free?', 'Yes. You can create static QR codes without sign-up.'],
            ['Do Qraft QR codes expire?', 'Static QR codes do not expire. The destination must remain available.'],
            ['Can I use a logo?', 'Yes. Keep logos modest and test the finished code before printing.'],
            ['Is my data private?', 'The generator renders QR codes in your browser. Avoid encoding secrets directly into a static QR pattern.'],
          ].map(([question, answer]) => (
            <details key={question} className="p-5">
              <summary className="cursor-pointer font-bold text-ink dark:text-white">{question}</summary>
              <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-300">{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  )
}

function homeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': absoluteUrl('/#website'),
        url: site.url,
        name: site.name,
        description: site.description,
      },
      {
        '@type': 'WebApplication',
        '@id': absoluteUrl('/#app'),
        name: 'Qraft Custom QR Code Generator',
        url: site.url,
        applicationCategory: 'DesignApplication',
        operatingSystem: 'Any',
        isAccessibleForFree: true,
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          ['Is Qraft free?', 'Yes. You can create static QR codes without sign-up.'],
          ['Do Qraft QR codes expire?', 'Static QR codes do not expire.'],
          ['Is my data private?', 'The generator renders QR codes in your browser.'],
        ].map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })),
      },
    ],
  }
}

