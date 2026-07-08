import type { Metadata } from 'next'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { absoluteUrl, site } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Qraft | Free Custom QR Code Generator with Logo',
    template: '%s | Qraft',
  },
  description: site.description,
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': absoluteUrl('/rss.xml'),
    },
  },
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: site.name,
    title: 'Qraft | Free Custom QR Code Generator with Logo',
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qraft | Free Custom QR Code Generator',
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8130458016049357" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
