import Link from 'next/link'
import { qrTypes } from '@/lib/qr-types'

const legal = [
  ['About', '/about'],
  ['Contact', '/contact'],
  ['Privacy Policy', '/privacy'],
  ['Terms', '/terms'],
  ['Cookie Policy', '/cookie-policy'],
  ['Disclaimer', '/disclaimer'],
  ['Editorial Policy', '/editorial-policy'],
  ['Mission', '/mission'],
]

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm text-stone-600 dark:text-stone-300 sm:px-6 md:grid-cols-4">
        <div>
          <h2 className="text-lg font-black text-ink dark:text-white">Qraft</h2>
          <p className="mt-3 leading-6">A private QR code generator and learning hub for safer, clearer QR use.</p>
          <p className="mt-3 text-xs">HTTPS enabled. No account required for static QR generation.</p>
        </div>
        <div>
          <h3 className="font-bold text-ink dark:text-white">Generators</h3>
          <div className="mt-3 grid gap-2">
            {qrTypes.map((type) => <Link key={type.slug} href={`/qr/${type.slug}`} className="hover:text-ink dark:hover:text-white">{type.shortName} QR code</Link>)}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-ink dark:text-white">Resources</h3>
          <div className="mt-3 grid gap-2">
            <Link href="/blog">Blog</Link>
            <Link href="/learn">Learn</Link>
            <Link href="/docs">Documentation</Link>
            <Link href="/rss.xml">RSS feed</Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-ink dark:text-white">Trust</h3>
          <div className="mt-3 grid gap-2">
            {legal.map(([label, href]) => <Link key={href} href={href} className="hover:text-ink dark:hover:text-white">{label}</Link>)}
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-stone-200 px-4 py-5 text-xs text-stone-500 dark:border-stone-800 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <span>© 2026 Qraft. Educational content and private QR utilities.</span>
        <span>Generated in browser · Mobile-first · Accessible</span>
      </div>
    </footer>
  )
}

