import Link from 'next/link'
import { QrCode } from 'lucide-react'
import { site } from '@/lib/site'
import { ThemeToggle } from './ThemeToggle'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-paper/90 backdrop-blur dark:border-stone-800 dark:bg-stone-950/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-black text-ink dark:text-white">
          <span className="grid size-9 place-items-center rounded-lg bg-ink text-lime dark:bg-lime dark:text-ink"><QrCode size={21} /></span>
          Qraft<span className="text-moss">.</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-stone-600 dark:text-stone-300 md:flex">
          {site.nav.map((item) => <Link key={item.href} href={item.href} className="hover:text-ink dark:hover:text-white">{item.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/#generator" className="rounded-xl bg-ink px-4 py-2 text-sm font-bold text-white dark:bg-lime dark:text-ink">Generate QR</Link>
        </div>
      </div>
    </header>
  )
}

