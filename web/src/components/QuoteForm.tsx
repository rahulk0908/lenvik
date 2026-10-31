import { useState, type FormEvent } from 'react'
import { ArrowRight, Check, Mail } from 'lucide-react'
import { settings } from '../lib/content'
import { emailCopy, whatsappLink, whatsappMessage, type QuoteRequest } from '../lib/quote'

const serviceOptions = ['Civil construction', 'Interior design', 'Structural steel', 'PEB structures', 'Roofing', 'Mechanical piping']
const budgets = ['Not sure yet', '[Range 1]', '[Range 2]', '[Range 3]']
const timelines = ['Within 1 month', '1–3 months', '3–6 months', 'Just exploring']

const field =
  'h-[50px] w-full rounded-xl border border-line-2 bg-ground px-3.5 text-navy placeholder:text-muted/70 focus:border-royal focus:outline-none'
const label = 'flex flex-col gap-2 text-sm font-medium'

const empty: QuoteRequest = {
  name: '',
  phone: '',
  email: '',
  location: '',
  services: ['Civil construction'],
  budget: budgets[0],
  timeline: timelines[0],
  message: '',
}

export function QuoteForm() {
  const [form, setForm] = useState<QuoteRequest>(empty)
  const [error, setError] = useState('')
  const [sentLink, setSentLink] = useState<string | null>(null)

  const set = (key: keyof QuoteRequest) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const toggle = (s: string) =>
    setForm((f) => ({ ...f, services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s] }))

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!form.services.length) return setError('Choose at least one service.')
    if (!form.name.trim() || !form.phone.trim() || !form.location.trim())
      return setError('Please fill in your name, phone and project location.')
    setError('')

    // Open WhatsApp synchronously so popup blockers allow it, then email a copy in the background
    const link = whatsappLink(whatsappMessage(form))
    window.open(link, '_blank', 'noopener')
    emailCopy(form).catch(() => {})
    setSentLink(link)
  }

  async function emailOnly() {
    if (!form.name.trim() || !form.phone.trim()) return setError('Please fill in at least your name and phone.')
    setError('')
    await emailCopy(form).catch(() => {})
    setSentLink('')
  }

  if (sentLink !== null) {
    return (
      <div role="status" className="flex min-h-[520px] flex-col items-center justify-center gap-5 text-center">
        <span className="grid size-18 place-items-center rounded-full bg-sky text-navy">
          <Check size={32} strokeWidth={2.4} />
        </span>
        <h2 className="font-display text-3xl font-medium tracking-[-0.03em]">Thanks — we’ve got your request</h2>
        <p className="max-w-md leading-relaxed text-muted">
          Our team will call you within {settings.replyTime} to talk through the project and arrange a site visit.
        </p>
        {sentLink && (
          <p className="text-sm text-muted">
            WhatsApp didn’t open?{' '}
            <a href={sentLink} target="_blank" rel="noreferrer" className="font-medium text-navy underline">
              Tap here to send your request
            </a>
          </p>
        )}
        <button
          type="button"
          onClick={() => {
            setForm(empty)
            setSentLink(null)
          }}
          className="h-12 rounded-full border border-navy px-6 font-medium"
        >
          Send another request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-7">
      <div className="flex flex-col gap-1.5">
        <h2 className="font-display text-3xl font-medium tracking-[-0.03em]">Request a quote</h2>
        <p className="text-[15px] text-muted">Fields marked * are required.</p>
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-sm font-medium">
          What do you need? * <span className="font-normal text-muted">(choose any)</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {serviceOptions.map((s) => {
            const on = form.services.includes(s)
            return (
              <button
                key={s}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(s)}
                className={`inline-flex h-11 items-center gap-2 rounded-full border px-4.5 text-[15px] transition-colors ${
                  on ? 'border-navy bg-navy text-white' : 'border-line-2 bg-white text-navy hover:border-navy'
                }`}
              >
                {on && <Check size={14} strokeWidth={2.4} />}
                {s}
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className="grid gap-4.5 sm:grid-cols-2">
        <label className={label}>
          Full name *
          <input className={field} value={form.name} onChange={set('name')} autoComplete="name" required />
        </label>
        <label className={label}>
          Phone *
          <input className={field} type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" required />
        </label>
        <label className={label}>
          Email
          <input className={field} type="email" value={form.email} onChange={set('email')} autoComplete="email" />
        </label>
        <label className={label}>
          Project location *
          <input className={field} value={form.location} onChange={set('location')} placeholder="City or area" required />
        </label>
        <label className={label}>
          Budget
          <select className={field} value={form.budget} onChange={set('budget')}>
            {budgets.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </label>
        <label className={label}>
          When do you want to start?
          <select className={field} value={form.timeline} onChange={set('timeline')}>
            {timelines.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className={`${label} sm:col-span-2`}>
          Tell us about the project
          <textarea
            className={`${field} h-auto py-3.5`}
            rows={5}
            value={form.message}
            onChange={set('message')}
            placeholder="Plot size, number of floors, rooms to design, structure size…"
          />
        </label>
      </div>

      {error && (
        <p role="alert" className="rounded-xl bg-mist px-4 py-3 text-sm font-medium text-navy">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
        <p className="max-w-xs text-sm text-muted">You can share drawings and photos in the WhatsApp chat.</p>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={emailOnly} className="inline-flex h-11 items-center gap-2 px-2 text-sm font-medium underline-offset-4 hover:underline">
            <Mail size={16} /> Send by email instead
          </button>
          <button
            type="submit"
            className="inline-flex h-[54px] items-center gap-2.5 rounded-full bg-navy px-7 font-medium text-white hover:bg-royal"
          >
            Send via WhatsApp <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </form>
  )
}
