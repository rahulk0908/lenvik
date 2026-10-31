import { Link } from 'react-router-dom'
import type { Project } from '../lib/content'
import { Photo, StatusPill } from './ui'

export function ProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  return (
    <Link to={`/projects/${project.slug}`} className="group flex flex-col gap-4 text-navy">
      <div className={`relative overflow-hidden ${wide ? 'aspect-[21/9] rounded-3xl' : 'aspect-[4/3] rounded-[20px]'}`}>
        <Photo
          src={project.coverImage}
          alt={project.title}
          hint={project.category}
          width={wide ? 1600 : 900}
          className="size-full transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <span className="absolute left-4 top-4">
          <StatusPill status={project.status} />
        </span>
      </div>
      <div className={wide ? 'flex flex-wrap items-baseline justify-between gap-3' : 'flex items-start justify-between gap-4'}>
        <div className="flex flex-col gap-1">
          <h3
            className={`font-display font-medium tracking-[-0.02em] underline-offset-4 group-hover:underline ${
              wide ? 'text-[32px]' : 'text-[22px]'
            }`}
          >
            {project.title}
          </h3>
          <span className="text-[15px] text-muted">
            {project.category} · {project.location}
          </span>
        </div>
        <span className="whitespace-nowrap pt-1 text-sm text-muted">{project.year}</span>
      </div>
    </Link>
  )
}
