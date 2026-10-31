import { useState } from 'react'
import { categories, projects } from '../lib/content'
import { ProjectCard } from '../components/ProjectCard'
import { Seo } from '../components/Seo'
import { Eyebrow } from '../components/ui'

const statuses = ['All', 'Completed', 'Ongoing'] as const
const PAGE = 9

export default function Projects() {
  const [cat, setCat] = useState('All')
  const [status, setStatus] = useState<(typeof statuses)[number]>('All')
  const [limit, setLimit] = useState(PAGE)

  const matching = projects.filter(
    (p) => (cat === 'All' || p.category === cat) && (status === 'All' || p.status === status),
  )
  const visible = matching.slice(0, limit)

  return (
    <>
      <Seo title="Projects" description="Homes, interiors, steel and PEB structures, roofing and piping projects by Lenvik." path="/projects" />

      <section className="mx-auto flex max-w-[1360px] flex-wrap items-end justify-between gap-8 px-6 pb-12 pt-16 md:px-8">
        <div className="flex flex-col gap-4">
          <Eyebrow>Portfolio</Eyebrow>
          <h1 className="font-display text-[clamp(44px,6vw,84px)] font-medium leading-none tracking-[-0.04em]">Our projects</h1>
        </div>
        <p className="max-w-[420px] text-[17px] leading-relaxed text-muted">
          Homes, interiors and industrial structures we have delivered, or are building right now.
        </p>
      </section>

      <section aria-label="Filters" className="mx-auto max-w-[1360px] px-6 pb-10 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-line py-4">
          <div role="group" aria-label="Category" className="flex flex-wrap gap-2">
            {['All', ...categories].map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => {
                  setCat(c)
                  setLimit(PAGE)
                }}
                className={`h-11 rounded-full border px-5 text-[15px] transition-colors ${
                  cat === c ? 'border-navy bg-navy text-white' : 'border-line-2 bg-white hover:border-navy'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div role="group" aria-label="Status" className="flex gap-1 rounded-full bg-mist p-1">
            {statuses.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={status === s}
                onClick={() => setStatus(s)}
                className={`h-10 rounded-full px-4.5 text-sm ${
                  status === s ? 'bg-white font-medium shadow-sm' : 'text-muted hover:text-navy'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <p aria-live="polite" className="mt-5 text-sm text-muted">
          Showing {visible.length} of {matching.length} projects
        </p>
      </section>

      <section className="mx-auto max-w-[1360px] px-6 pb-24 md:px-8">
        {visible.length ? (
          <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center gap-2 rounded-[20px] bg-white px-8 py-16 text-center">
            <strong className="font-display text-[22px] font-medium">No projects match these filters</strong>
            <span className="text-muted">Try another category or status.</span>
          </div>
        )}
        {matching.length > limit && (
          <div className="mt-16 flex justify-center">
            <button
              type="button"
              onClick={() => setLimit((l) => l + PAGE)}
              className="h-[52px] rounded-full border border-navy px-7 font-medium hover:bg-navy hover:text-white"
            >
              Load more projects
            </button>
          </div>
        )}
      </section>
    </>
  )
}
