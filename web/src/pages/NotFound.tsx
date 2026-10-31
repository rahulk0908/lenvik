import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-[1360px] flex-col items-start justify-center gap-6 px-6 py-24 md:px-8">
      <Seo title="Page not found" />
      <span className="text-sm text-muted">404</span>
      <h1 className="font-display text-5xl font-medium tracking-[-0.04em] md:text-7xl">This page isn’t built yet.</h1>
      <p className="max-w-md text-[17px] leading-relaxed text-muted">The page you’re looking for doesn’t exist or has moved.</p>
      <Link to="/" className="inline-flex h-12 items-center rounded-full bg-navy px-6 font-medium text-white hover:bg-royal">
        Back to home
      </Link>
    </section>
  )
}
