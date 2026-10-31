// Writes src/data/content.json before dev/build.
// With SANITY_PROJECT_ID set, content comes from Sanity; otherwise the bundled sample is used.
import { copyFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const dataDir = fileURLToPath(new URL('../src/data/', import.meta.url))
const out = dataDir + 'content.json'
const projectId = process.env.SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || 'production'

const query = `{
  "settings": *[_type == "siteSettings"][0]{
    companyName, tagline, heroEyebrow, heroText, yearFounded, phone, whatsapp, email, hours, replyTime,
    "heroVideo": coalesce(heroVideo.asset->url, "/hero.mp4"),
    "heroPoster": coalesce(heroPoster.asset->url, "/hero-poster.jpg"),
    "stats": coalesce(stats[]{value, label}, []),
    "interiorOfferings": coalesce(interiorOfferings[]{title, description}, []),
    "clientLogos": coalesce(clientLogos[]{name, "logo": logo.asset->url}, [])
  },
  "services": *[_type == "service"] | order(order asc){
    title, "slug": slug.current, description, "points": coalesce(points, []), "image": image.asset->url, "imageHint": title
  },
  "projects": *[_type == "project"] | order(featured desc, year desc){
    title, "slug": slug.current, category, status, "featured": coalesce(featured, false), location, year, client, area,
    startDate, handover, progress, summary, "body": coalesce(body, []), "services": coalesce(services, []),
    "coverImage": coverImage.asset->url, "gallery": coalesce(gallery[].asset->url, []),
    "milestones": coalesce(milestones[]{title, note, date, "done": coalesce(done, false)}, [])
  },
  "testimonials": *[_type == "testimonial"] | order(order asc){
    name, role, service, quote, "project": project->{title, "slug": slug.current}
  },
  "faqs": *[_type == "faq"] | order(order asc){question, answer}
}`

if (!projectId && process.env.NETLIFY) {
  // Never publish sample content: fail the deploy so the current live site stays up
  throw new Error('[content] SANITY_PROJECT_ID is not set in Netlify environment variables (needs the Builds scope)')
} else if (!projectId) {
  await copyFile(dataDir + 'sample-content.json', out)
  console.log('[content] SANITY_PROJECT_ID not set, using sample content')
} else {
  // Live API, not apicdn: a rebuild triggered by a publish must not get a cached, older result
  const url = `https://${projectId}.api.sanity.io/v2025-01-01/data/query/${dataset}?perspective=published&query=${encodeURIComponent(query)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`[content] Sanity request failed: ${res.status} ${await res.text()}`)
  const { result } = await res.json()
  if (!result.settings) throw new Error('[content] No siteSettings document found in Sanity')
  await writeFile(out, JSON.stringify(result, null, 2))
  console.log(`[content] fetched ${result.projects.length} projects from Sanity`)
}
