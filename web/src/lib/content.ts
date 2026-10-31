// Content is written to content.json at build time by scripts/fetch-content.mjs
import data from '../data/content.json'

export type Stat = { value: string; label: string }
export type Offering = { title: string; description: string }

export type Settings = {
  companyName: string
  tagline: string
  heroEyebrow: string
  heroText: string
  yearFounded: string
  phone: string
  whatsapp: string
  email: string
  hours: string
  replyTime: string
  heroVideo: string | null
  heroPoster: string | null
  stats: Stat[]
  interiorOfferings: Offering[]
  clientLogos: { name: string; logo: string | null }[]
}

export type Service = {
  title: string
  slug: string
  description: string
  points: string[]
  image: string | null
  imageHint: string
}

export type Milestone = { title: string; note: string; date: string; done: boolean }

export type Project = {
  title: string
  slug: string
  category: string
  status: 'Completed' | 'Ongoing'
  featured: boolean
  location: string
  year: string
  client: string
  area: string
  startDate: string
  handover: string
  progress: number | null
  summary: string
  body: string[]
  services: string[]
  coverImage: string | null
  gallery: string[]
  milestones: Milestone[]
}

export type Testimonial = {
  name: string
  role: string
  service: string
  quote: string
  project: { title: string; slug: string } | null
}

export type Faq = { question: string; answer: string }

export type Content = {
  settings: Settings
  services: Service[]
  projects: Project[]
  testimonials: Testimonial[]
  faqs: Faq[]
}

export const content = data as Content
export const { settings, services, projects, testimonials, faqs } = content

export const categories = ['Houses', 'Interiors', 'Steel & PEB', 'Roofing', 'Piping']

export function findProject(slug: string | undefined) {
  return projects.find((p) => p.slug === slug)
}
