export type QrType = {
  slug: string
  name: string
  shortName: string
  description: string
  example: string
  benefits: string[]
  bestPractices: string[]
  faq: { question: string; answer: string }[]
}

export const qrTypes: QrType[] = [
  {
    slug: 'url',
    name: 'URL QR Code Generator',
    shortName: 'URL',
    description:
      'Create a QR code that opens a website, landing page, product page, form, menu, portfolio, or digital profile.',
    example: 'https://qr.antss.in/blog/what-is-a-qr-code',
    benefits: ['Send people to the exact page they need', 'Works on posters, packaging, receipts, and business cards', 'Easy to test before printing'],
    bestPractices: ['Use HTTPS links', 'Prefer short destination URLs', 'Test the final printed code from normal scanning distance'],
    faq: [
      { question: 'Can a URL QR code expire?', answer: 'A static URL QR code keeps working as long as the destination page remains online.' },
      { question: 'Should I use a short URL?', answer: 'Shorter URLs create cleaner QR patterns and usually scan faster.' },
    ],
  },
  {
    slug: 'wifi',
    name: 'Wi-Fi QR Code Generator',
    shortName: 'Wi-Fi',
    description:
      'Create a Wi-Fi QR code guests can scan to join your network without typing the password manually.',
    example: 'WIFI:T:WPA;S:GuestNetwork;P:StrongGuestPassword;;',
    benefits: ['Helpful for cafes, clinics, offices, and rentals', 'Reduces password typing mistakes', 'Keeps guest onboarding simple'],
    bestPractices: ['Use a guest network', 'Avoid exposing private admin networks', 'Update printed codes when the password changes'],
    faq: [
      { question: 'Is a Wi-Fi QR code safe?', answer: 'It is safe when used for a guest network and displayed only where guests should have access.' },
      { question: 'Does it work on iPhone and Android?', answer: 'Most modern iPhone and Android cameras recognize standard Wi-Fi QR codes.' },
    ],
  },
  {
    slug: 'email',
    name: 'Email QR Code Generator',
    shortName: 'Email',
    description:
      'Create a QR code that opens a pre-filled email draft with recipient, subject, and body text.',
    example: 'mailto:hello@example.com?subject=Project%20Inquiry',
    benefits: ['Make support requests easier', 'Useful on flyers, invoices, and product inserts', 'Reduces typing errors in email addresses'],
    bestPractices: ['Keep the subject clear', 'Avoid very long message bodies', 'Use a monitored inbox'],
    faq: [
      { question: 'Can I pre-fill the message?', answer: 'Yes, email QR codes can include a recipient, subject, and starter message.' },
      { question: 'Will it send automatically?', answer: 'No. The user reviews and sends the email from their own mail app.' },
    ],
  },
  {
    slug: 'sms',
    name: 'SMS QR Code Generator',
    shortName: 'SMS',
    description:
      'Create a QR code that opens a text message draft to a phone number with optional pre-filled text.',
    example: 'SMSTO:+15550123456:Send me the appointment details',
    benefits: ['Fast appointment requests', 'Useful for events and support desks', 'Great for audiences that prefer text messages'],
    bestPractices: ['Use an active business number', 'Keep the message short', 'Avoid collecting sensitive data by SMS'],
    faq: [
      { question: 'Does the message send automatically?', answer: 'No. The scanner must confirm the message in their SMS app.' },
      { question: 'Can I use international numbers?', answer: 'Yes, use the full country code for the most reliable result.' },
    ],
  },
  {
    slug: 'vcard',
    name: 'vCard QR Code Generator',
    shortName: 'vCard',
    description:
      'Create a scannable contact card for business cards, conference badges, team pages, and printed sales material.',
    example: 'BEGIN:VCARD\\nVERSION:3.0\\nFN:Qraft Team\\nORG:Qraft\\nURL:https://qr.antss.in\\nEND:VCARD',
    benefits: ['Save contacts without manual typing', 'Modernizes printed business cards', 'Useful for sales, recruiting, and networking'],
    bestPractices: ['Include only contact details you want public', 'Use a professional email address', 'Print with enough quiet zone around the code'],
    faq: [
      { question: 'Can phones save the contact directly?', answer: 'Most modern phones offer to create a contact after scanning a vCard QR code.' },
      { question: 'Can I include a website?', answer: 'Yes, vCards can include a website, phone, email, company, and address.' },
    ],
  },
  {
    slug: 'location',
    name: 'Location QR Code Generator',
    shortName: 'Location',
    description:
      'Create a QR code that opens a map location for offices, clinics, venues, delivery points, and event entrances.',
    example: 'geo:28.6139,77.2090?q=Qraft%20Office',
    benefits: ['Reduces wrong-address confusion', 'Works well on invitations and signage', 'Helpful for delivery and event check-in'],
    bestPractices: ['Use precise coordinates for large venues', 'Add a readable address near the QR code', 'Test with Apple Maps and Google Maps'],
    faq: [
      { question: 'Should I use an address or coordinates?', answer: 'Coordinates are more precise, while map links can include labels and directions.' },
      { question: 'Can I use it for events?', answer: 'Yes, location QR codes are ideal for invitations, venue signage, and parking instructions.' },
    ],
  },
]

export function getQrType(slug: string) {
  return qrTypes.find((type) => type.slug === slug)
}

