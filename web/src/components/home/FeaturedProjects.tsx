import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { projects } from '../../lib/content'
import { ProjectCard } from '../ProjectCard'
import { Reveal, SectionHeader } from '../ui'

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured).slice(0, 4)
  const [lead, ...rest] = featured.length ? featured : projects.slice(0, 4)
  if (!lead) return null

  return (
    <section className="mx-auto max-w-[1360px] px-6 pb-28 md:px-8">
      <SectionHeader
        eyebrow="Selected work"
        title="Featured projects"
        aside={
          <Link
            to="/projects"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-navy px-5.5 font-medium hover:bg-navy hover:text-white"
          >
            All projects <ArrowRight size={16} />
          </Link>
        }
      />
      <div className="grid gap-x-6 gap-y-10 md:grid-cols-3">
        <Reveal className="md:col-span-3">
          <ProjectCard project={lead} wide />
        </Reveal>
        {rest.map((p) => (
          <Reveal key={p.slug}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
