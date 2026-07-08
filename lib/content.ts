import { qrTypes } from './qr-types'

export type Article = {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
  author: string
  date: string
  readingTime: string
  related: string[]
  markdown: string
}

const deepGuide = (topic: string, focus: string, audience: string) => `# ${topic}

## Quick Answer

${focus} A QR code is useful only when it saves effort for the person scanning it. The best QR experiences are clear before the scan, safe after the scan, and tested in the same environment where people will use them.

## Why This Matters

QR codes connect physical moments to digital actions. A patient in a waiting room can open instructions without touching a shared tablet. A restaurant guest can view the latest menu without waiting for staff. A teacher can share a worksheet, quiz, or video from a printed handout. A small business can turn packaging, invoices, and counter displays into measurable customer touchpoints.

The value is not the square pattern itself. The value is reducing friction. A strong QR code answers three questions before the user scans: what will happen, why should I trust it, and what should I do next? If those answers are missing, even a technically valid code can feel suspicious or unhelpful.

## Planning The Destination

Start with the page or action behind the code. The destination should load quickly on mobile, use HTTPS, and match the promise printed near the code. If a poster says "scan for appointment instructions," the landing page should show those instructions immediately. Do not send people to a general homepage and expect them to search.

For ${audience}, the most effective destinations are short, task-focused, and readable on a small screen. Put the primary action near the top. Use plain language. Avoid heavy pop-ups, autoplay media, and forms that ask for unnecessary information. Every extra step lowers completion.

## Static And Dynamic Choices

Static QR codes store the destination directly in the pattern. They are fast, private, and do not require a vendor dashboard. Their limitation is that the encoded value cannot be changed after printing. Dynamic QR codes usually point to a redirect service, letting the owner edit the final destination later and track scans. That flexibility can be useful, but it adds a dependency and often more data collection.

If the destination is permanent, such as a public contact page, static is usually enough. If the campaign changes weekly, dynamic may be worth considering. Either way, tell users what they are scanning and avoid hiding the destination behind vague copy.

## Design And Scanning Reliability

Good QR design balances branding with readability. High contrast matters more than decoration. Dark code on a light background is the safest combination. Keep a quiet zone around the code so the camera can identify its edges. If you add a logo, use high error correction and keep the logo modest in size.

Size depends on distance. A code on a business card can be small because people hold it close. A poster, banner, or wall sign needs a larger code. Test with more than one phone, in realistic lighting, from realistic angles. Print a sample before ordering hundreds of copies.

## Privacy And Trust

Trust is part of usability. Use a visible domain people recognize. Place the QR code beside a short explanation such as "Scan to view today's menu" or "Scan to download the pre-visit checklist." Avoid codes with no label, especially in public spaces. Attackers sometimes cover legitimate codes with malicious stickers, so businesses should inspect public-facing materials regularly.

Qraft generates codes in the browser, which means the entered content is not uploaded to Qraft's server during generation. That is useful for routine business, classroom, and personal use. Still, avoid encoding secrets such as private keys, passwords, or medical records directly into a static QR pattern.

## Common Mistakes

The most common mistake is printing a code before testing it. The second is linking to a page that is not mobile friendly. Other mistakes include using low contrast colors, placing the code on curved packaging without a sample test, shrinking it too far, or forgetting to update nearby instructions when the destination changes.

A QR code should never be treated as a magic label. It is a small access point into a larger experience. When the destination is useful, the code feels helpful. When the destination is slow, vague, or intrusive, the code feels like a barrier.

## Practical Checklist

- Use HTTPS and a trustworthy domain.
- Write a visible call to action beside the code.
- Keep enough quiet zone around all sides.
- Test the code on iPhone and Android.
- Check the page on mobile data, not only office Wi-Fi.
- Save a source file for future reprints.
- Re-test whenever the destination page changes.

## Accessibility And Placement

QR codes should not be the only way to access important information. If the information is essential, provide a short printed URL, phone number, desk instruction, or human help option nearby. This matters for people without smartphones, people with low battery, visitors with poor connectivity, and users who rely on assistive technology.

Placement also changes accessibility. Put the code where people can comfortably hold a phone steady. Avoid placing important codes too low on walls, behind counters, on reflective surfaces, or on moving screens. For healthcare, education, and public-service contexts, the surrounding text should be readable, direct, and available in the language your audience expects.

## Measuring Success Without Over-Collecting

Teams often want to know whether a QR code is working. Useful measures include destination page visits, form completions, downloads, bookings, or support requests. Those signals are usually more meaningful than raw scan counts. A scan is only the beginning; the real goal is whether the person completed the task.

If you use analytics or dynamic redirects, be transparent in your privacy policy and collect only what you need. For many static QR projects, simple page analytics on the destination are enough. Avoid adding tracking complexity when the code is used for sensitive instructions, patient education, classroom material, or internal notices.

## Maintenance Plan

Every public QR code should have an owner. That person or team should know where the code is printed, what it links to, and when it needs review. A small spreadsheet with the code purpose, destination, print location, publication date, and owner can prevent stale or broken codes months later.

Review codes after website redesigns, domain changes, menu updates, policy changes, event changes, and staff turnover. If a code appears on expensive printed material, use a durable destination URL that your team controls, such as a permanent landing page. Update the landing page content rather than changing the printed code whenever possible.

## Internal Links To Continue Learning

After creating your first code, read the guides on static versus dynamic QR codes, QR code security tips, best QR code practices, and common QR mistakes. If you are building a specific workflow, visit the URL, Wi-Fi, email, SMS, vCard, and location generator pages for examples and focused FAQs.

## FAQ

### Do QR codes work without an app?

Yes. Most modern phone cameras can scan QR codes directly. Some users may still prefer a scanner app, but a separate app is usually not required.

### Can a QR code stop working?

The printed pattern keeps encoding the same data, but the destination can fail if a website goes offline, a page is deleted, or a phone number changes.

### Are QR codes safe?

The code format is safe, but the destination should be treated like any other link. Use recognizable domains and scan only codes from trusted contexts.

## Conclusion

${topic} is not just a technical topic. It is a design, trust, and communication topic. Use the generator to create a clear code, then support it with helpful text, a fast destination, and a testing habit. That combination is what turns a QR code from a decorative square into a useful bridge between offline attention and online action.`

export const articles: Article[] = [
  {
    slug: 'what-is-a-qr-code',
    title: 'What Is a QR Code?',
    description: 'A practical explanation of QR codes, how they are used, and what makes a QR experience trustworthy.',
    category: 'Basics',
    tags: ['qr basics', 'mobile', 'scanning'],
    author: 'Qraft Editorial Team',
    date: '2026-07-08',
    readingTime: '8 min read',
    related: ['how-qr-codes-work', 'best-qr-code-practices'],
    markdown: deepGuide('What Is a QR Code?', 'A QR code is a two-dimensional barcode that stores information a phone camera can read quickly.', 'new users and small teams'),
  },
  {
    slug: 'static-vs-dynamic-qr-codes',
    title: 'Static vs Dynamic QR Codes',
    description: 'Understand when to use static QR codes and when dynamic QR codes make more sense.',
    category: 'Strategy',
    tags: ['static qr', 'dynamic qr', 'analytics'],
    author: 'Qraft Editorial Team',
    date: '2026-07-08',
    readingTime: '9 min read',
    related: ['qr-code-security-tips', 'common-qr-mistakes'],
    markdown: deepGuide('Static vs Dynamic QR Codes', 'Static QR codes store the final value directly, while dynamic QR codes usually rely on an editable redirect.', 'business owners and marketers'),
  },
  {
    slug: 'qr-codes-for-hospitals',
    title: 'QR Codes for Hospitals',
    description: 'How clinics and hospitals can use QR codes for instructions, check-ins, maps, and patient education.',
    category: 'Healthcare',
    tags: ['healthcare', 'patient experience', 'privacy'],
    author: 'Qraft Editorial Team',
    date: '2026-07-08',
    readingTime: '10 min read',
    related: ['qr-code-security-tips', 'best-qr-code-practices'],
    markdown: deepGuide('QR Codes for Hospitals', 'Healthcare QR codes should reduce confusion while protecting privacy and patient trust.', 'patients, caregivers, and hospital operations teams'),
  },
  {
    slug: 'qr-codes-for-restaurants',
    title: 'QR Codes for Restaurants',
    description: 'Menu, ordering, feedback, Wi-Fi, and loyalty QR code ideas for restaurants and cafes.',
    category: 'Restaurants',
    tags: ['menus', 'restaurants', 'wifi'],
    author: 'Qraft Editorial Team',
    date: '2026-07-08',
    readingTime: '8 min read',
    related: ['best-qr-code-practices', 'common-qr-mistakes'],
    markdown: deepGuide('QR Codes for Restaurants', 'Restaurant QR codes work best when they make ordering, menu browsing, feedback, or Wi-Fi access easier.', 'restaurant owners, managers, and guests'),
  },
  {
    slug: 'qr-codes-for-business-cards',
    title: 'QR Codes for Business Cards',
    description: 'Turn a printed business card into a digital contact, portfolio, booking page, or product profile.',
    category: 'Business',
    tags: ['vcard', 'networking', 'business cards'],
    author: 'Qraft Editorial Team',
    date: '2026-07-08',
    readingTime: '8 min read',
    related: ['static-vs-dynamic-qr-codes', 'best-qr-code-practices'],
    markdown: deepGuide('QR Codes for Business Cards', 'A business card QR code should make saving contact details or opening a professional profile effortless.', 'founders, sales teams, recruiters, and freelancers'),
  },
  {
    slug: 'qr-codes-for-events',
    title: 'QR Codes for Events',
    description: 'Use QR codes for tickets, schedules, maps, feedback, lead capture, and post-event resources.',
    category: 'Events',
    tags: ['events', 'tickets', 'check-in'],
    author: 'Qraft Editorial Team',
    date: '2026-07-08',
    readingTime: '9 min read',
    related: ['qr-code-security-tips', 'how-qr-codes-work'],
    markdown: deepGuide('QR Codes for Events', 'Event QR codes should move people through check-in, navigation, scheduling, and follow-up with less friction.', 'event planners, attendees, and venue teams'),
  },
  {
    slug: 'qr-code-security-tips',
    title: 'QR Code Security Tips',
    description: 'Practical security guidance for scanning and publishing QR codes safely.',
    category: 'Security',
    tags: ['security', 'privacy', 'safe scanning'],
    author: 'Qraft Editorial Team',
    date: '2026-07-08',
    readingTime: '9 min read',
    related: ['static-vs-dynamic-qr-codes', 'common-qr-mistakes'],
    markdown: deepGuide('QR Code Security Tips', 'QR safety depends on context, destination transparency, and sensible publishing practices.', 'publishers, scanners, and operations teams'),
  },
  {
    slug: 'how-qr-codes-work',
    title: 'How QR Codes Work',
    description: 'A plain-English guide to QR patterns, data encoding, error correction, and scanning.',
    category: 'Technical',
    tags: ['error correction', 'encoding', 'versions'],
    author: 'Qraft Editorial Team',
    date: '2026-07-08',
    readingTime: '10 min read',
    related: ['what-is-a-qr-code', 'best-qr-code-practices'],
    markdown: deepGuide('How QR Codes Work', 'QR codes use a grid of modules, position markers, format information, and error correction to store data reliably.', 'students, builders, and curious readers'),
  },
  {
    slug: 'best-qr-code-practices',
    title: 'Best QR Code Practices',
    description: 'A field-tested checklist for QR code design, placement, testing, and printing.',
    category: 'Best Practices',
    tags: ['printing', 'design', 'testing'],
    author: 'Qraft Editorial Team',
    date: '2026-07-08',
    readingTime: '8 min read',
    related: ['common-qr-mistakes', 'qr-code-security-tips'],
    markdown: deepGuide('Best QR Code Practices', 'The best QR codes are easy to notice, easy to trust, easy to scan, and connected to a useful mobile page.', 'designers, marketers, educators, and operations teams'),
  },
  {
    slug: 'common-qr-mistakes',
    title: 'Common QR Mistakes',
    description: 'Avoid the errors that make QR codes hard to scan, confusing, or untrustworthy.',
    category: 'Best Practices',
    tags: ['mistakes', 'testing', 'print'],
    author: 'Qraft Editorial Team',
    date: '2026-07-08',
    readingTime: '8 min read',
    related: ['best-qr-code-practices', 'qr-code-security-tips'],
    markdown: deepGuide('Common QR Mistakes', 'Most QR problems come from poor context, weak contrast, bad sizing, or destinations that do not match the user promise.', 'teams preparing codes for print or public use'),
  },
]

export const learnGuides = [
  'How to create QR codes',
  'How QR codes store information',
  'QR code error correction',
  'Different QR code versions',
  'Barcode vs QR Code',
  'Healthcare QR codes',
  'Payment QR codes',
  'Marketing QR codes',
  'Educational QR codes',
].map((title, index) => ({
  slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  title,
  description:
    'A practical learning guide with plain-language explanations, real use cases, design advice, and links to related QR tools.',
  level: index < 4 ? 'Beginner' : 'Applied',
}))

export const docs = [
  'Getting Started',
  'How to Download',
  'Printing Tips',
  'Best QR Size',
  'Error Correction',
  'Troubleshooting',
  'API (future)',
].map((title) => ({
  slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  title,
  description: `Documentation for ${title.toLowerCase()} when creating QR codes with Qraft.`,
}))

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug)
}

export function getRelatedArticles(article: Article) {
  return article.related.map(getArticle).filter(Boolean) as Article[]
}

export function getPopularTypes() {
  return qrTypes.slice(0, 6)
}
