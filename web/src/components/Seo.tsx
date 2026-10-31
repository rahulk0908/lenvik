import { Head } from 'vite-react-ssg'
import { settings } from '../lib/content'

const siteUrl = import.meta.env.VITE_SITE_URL ?? ''

export function Seo({ title, description, image, path = '' }: { title?: string; description?: string; image?: string | null; path?: string }) {
  const fullTitle = title ? `${title} | Lenvik` : `${settings.companyName} | ${settings.tagline}`
  const desc =
    description ??
    'Complete house construction, interiors, structural steel, PEB structures, roofing and mechanical piping — planned and delivered by one team.'
  const img = image ?? settings.heroPoster ?? '/logo.png'
  const absImg = img.startsWith('http') ? img : `${siteUrl}${img}`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={settings.companyName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={absImg} />
      {siteUrl && <meta property="og:url" content={`${siteUrl}${path}`} />}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}
