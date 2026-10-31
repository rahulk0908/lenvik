import { settings } from './content'

export type QuoteRequest = {
  name: string
  phone: string
  email: string
  location: string
  services: string[]
  budget: string
  timeline: string
  message: string
}

export function whatsappMessage(q: QuoteRequest) {
  return [
    '*New quote request – Lenvik website*',
    `Name: ${q.name}`,
    `Phone: ${q.phone}`,
    q.email && `Email: ${q.email}`,
    `Location: ${q.location}`,
    `Services: ${q.services.join(', ')}`,
    `Budget: ${q.budget}`,
    `Start: ${q.timeline}`,
    q.message && `Details: ${q.message}`,
  ]
    .filter(Boolean)
    .join('\n')
}

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${settings.whatsapp}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

// Emails a copy to Lenvik so the lead is kept even if WhatsApp is never sent
export async function emailCopy(q: QuoteRequest) {
  const key = import.meta.env.VITE_WEB3FORMS_KEY
  if (!key) return
  await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: key,
      subject: `Quote request: ${q.services.join(', ')} – ${q.name}`,
      from_name: 'Lenvik website',
      ...q,
      services: q.services.join(', '),
    }),
  })
}
