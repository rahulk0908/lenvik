// Builds seed.ndjson from the web app's sample content, for: npx sanity dataset import seed.ndjson production --missing
// Settings, services and FAQs are published; sample projects and testimonials are imported as drafts to review first.
import { readFile, writeFile } from 'node:fs/promises'

const sample = JSON.parse(await readFile(new URL('../../web/src/data/sample-content.json', import.meta.url)))
const key = (i) => `k${i}`
const docs = []

const { settings } = sample
docs.push({
  _id: 'siteSettings',
  _type: 'siteSettings',
  companyName: settings.companyName,
  tagline: settings.tagline,
  heroEyebrow: settings.heroEyebrow,
  heroText: settings.heroText,
  yearFounded: settings.yearFounded,
  phone: settings.phone,
  whatsapp: settings.whatsapp,
  email: settings.email,
  hours: settings.hours,
  replyTime: settings.replyTime,
  stats: settings.stats.map((s, i) => ({ _key: key(i), ...s })),
  interiorOfferings: settings.interiorOfferings.map((o, i) => ({ _key: key(i), ...o })),
  clientLogos: settings.clientLogos.map((c, i) => ({ _key: key(i), name: c.name })),
})

sample.services.forEach((s, i) =>
  docs.push({
    _id: `service-${s.slug}`,
    _type: 'service',
    title: s.title,
    slug: { _type: 'slug', current: s.slug },
    order: i + 1,
    description: s.description,
    points: s.points,
  }),
)

sample.faqs.forEach((f, i) => docs.push({ _id: `faq-${i + 1}`, _type: 'faq', question: f.question, answer: f.answer, order: i + 1 }))

sample.projects.forEach((p) =>
  docs.push({
    _id: `drafts.project-${p.slug}`,
    _type: 'project',
    title: p.title,
    slug: { _type: 'slug', current: p.slug },
    category: p.category,
    status: p.status,
    featured: p.featured,
    location: p.location,
    year: p.year,
    client: p.client,
    area: p.area,
    startDate: p.startDate,
    handover: p.handover,
    ...(p.progress != null && { progress: p.progress }),
    summary: p.summary,
    body: p.body,
    services: p.services,
    milestones: p.milestones.map((m, i) => ({ _key: key(i), ...m })),
  }),
)

sample.testimonials.forEach((t, i) =>
  docs.push({
    _id: `drafts.testimonial-${i + 1}`,
    _type: 'testimonial',
    name: t.name,
    role: t.role,
    service: t.service,
    quote: t.quote,
    order: i + 1,
    ...(t.project && { project: { _type: 'reference', _ref: `project-${t.project.slug}`, _weak: true } }),
  }),
)

await writeFile(new URL('../seed.ndjson', import.meta.url), docs.map((d) => JSON.stringify(d)).join('\n') + '\n')
console.log(`Wrote seed.ndjson with ${docs.length} documents`)
