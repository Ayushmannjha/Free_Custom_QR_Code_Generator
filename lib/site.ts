export const site = {
  name: 'Qraft',
  url: 'https://qr.antss.in',
  description:
    'Create private, customizable QR codes with practical guides for business, healthcare, education, restaurants, events, and everyday use.',
  author: {
    name: 'Qraft Editorial Team',
    role: 'QR code education and web utility editors',
    url: '/author/qraft-editorial-team',
  },
  nav: [
    { href: '/#generator', label: 'Generator' },
    { href: '/blog', label: 'Blog' },
    { href: '/learn', label: 'Learn' },
    { href: '/docs', label: 'Docs' },
  ],
}

export function absoluteUrl(path = '') {
  if (!path) return site.url
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`
}

