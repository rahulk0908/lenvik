import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { findProject, projects } from '../lib/content'
import { Seo } from '../components/Seo'
import { Eyebrow, Photo } from '../components/ui'
import NotFound from './NotFound'

const chip = 'rounded-full border border-line bg-white px-3.5 py-2 text-sm'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = findProject(slug)
  if (!project) return <NotFound />

  const index = projects.indexOf(project)
  const next = projects[(index + 1) % projects.length]
  const facts = [
    { k: 'Client', v: project.client },
    { k: 'Location', v: project.location },
    { k: 'Area', v: project.area },
    { k: 'Category', v: project.category },
    { k: 'Started', v: project.startDate },
    { k: project.status === 'Ongoing' ? 'Handover' : 'Completed', v: project.handover },
  ]
  const gallery: (string | null)[] = project.gallery.length ? project.gallery : Array(6).fill(null)

  return (
    <>
      <Seo title={project.title} description={project.summary} image={project.coverImage} path={`/projects/${project.slug}`} />

      <section className="mx-auto flex max-w-[1360px] flex-col gap-7 px-6 pb-10 pt-10 md:px-8">
        <Link to="/projects" className="inline-flex min-h-11 items-center gap-2 self-start text-sm text-muted hover:text-navy">
          <ArrowLeft size={16} /> All projects
        </Link>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h1 className="max-w-[860px] font-display text-[clamp(40px,6vw,84px)] font-medium leading-none tracking-[-0.04em]">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            <span className={`${chip} inline-flex items-center gap-2`}>
              <span className={`size-[7px] rounded-full ${project.status === 'Ongoing' ? 'bg-sky' : 'bg-royal'}`} />
              {project.status === 'Ongoing' ? 'In progress' : 'Completed'}
            </span>
            <span className={chip}>{project.category}</span>
            <span className={chip}>{project.location}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1360px] px-6 md:px-8">
        <Photo
          src={project.coverImage}
          alt={project.title}
          hint={`${project.title} cover`}
          width={2000}
          className="aspect-[16/9] w-full rounded-3xl md:aspect-[21/9] md:rounded-[28px]"
        />
      </section>

      <section className="mx-auto flex max-w-[1360px] flex-wrap gap-16 px-6 py-18 md:px-8">
        <div className="flex flex-[2_1_560px] flex-col gap-6">
          <Eyebrow>Overview</Eyebrow>
          <p className="font-display text-2xl leading-[1.35] tracking-[-0.015em] md:text-[30px]">{project.summary}</p>
          {project.body.map((para, i) => (
            <p key={i} className="text-[17px] leading-[1.7] text-muted">
              {para}
            </p>
          ))}
          {project.services.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {project.services.map((s) => (
                <span key={s} className="rounded-full border border-line-2 px-3.5 py-2 text-sm text-muted">
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
        <aside aria-label="Project facts" className="flex-[1_1_320px] self-start rounded-3xl bg-white p-8">
          <dl className="grid grid-cols-2 gap-x-5 gap-y-6">
            {facts.map((f) => (
              <div key={f.k} className="flex flex-col gap-1">
                <dt className="text-[13px] text-muted">{f.k}</dt>
                <dd className="font-display text-[19px] font-medium tracking-[-0.01em]">{f.v}</dd>
              </div>
            ))}
          </dl>
          {project.status === 'Ongoing' && project.progress != null && (
            <div className="mt-7 flex flex-col gap-2.5 border-t border-line pt-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Construction progress</span>
                <strong className="font-medium">{project.progress}%</strong>
              </div>
              <div
                role="progressbar"
                aria-valuenow={project.progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Construction progress"
                className="h-1.5 rounded-full bg-mist"
              >
                <div className="h-1.5 rounded-full bg-navy" style={{ width: `${project.progress}%` }} />
              </div>
            </div>
          )}
        </aside>
      </section>

      {project.milestones.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto flex max-w-[1360px] flex-wrap gap-16 px-6 py-24 md:px-8">
            <div className="flex flex-[1_1_320px] flex-col gap-3">
              <h2 className="font-display text-4xl font-medium tracking-[-0.03em] md:text-[40px]">Timeline</h2>
              <p className="leading-relaxed text-muted">Milestones are updated from the site team’s weekly report.</p>
            </div>
            <ol className="flex flex-[2_1_560px] flex-col">
              {project.milestones.map((m) => (
                <li key={m.title} className="flex items-start gap-5 pb-7">
                  <span
                    aria-hidden="true"
                    className={`mt-1.5 size-3.5 shrink-0 rounded-full border-2 border-navy ${m.done ? 'bg-navy' : 'bg-white'}`}
                  />
                  <div className="flex flex-1 flex-wrap justify-between gap-x-6 gap-y-2 border-b border-line pb-6">
                    <div className="flex flex-col gap-1">
                      <strong className="font-display text-xl font-medium">
                        {m.title}
                        <span className="sr-only">{m.done ? ' (done)' : ' (upcoming)'}</span>
                      </strong>
                      <span className="text-[15px] text-muted">{m.note}</span>
                    </div>
                    <span className="text-sm text-muted">{m.date}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className="mx-auto flex max-w-[1360px] flex-col gap-6 px-6 py-24 md:px-8">
        <h2 className="font-display text-4xl font-medium tracking-[-0.03em] md:text-[40px]">Gallery</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((src, i) => (
            <li key={i}>
              <Photo
                src={src}
                alt={`${project.title} photo ${i + 1}`}
                hint={`${i + 1}`}
                width={900}
                className="aspect-[4/3] w-full rounded-[18px]"
              />
            </li>
          ))}
        </ul>
      </section>

      {next && next !== project && (
        <section className="mx-auto max-w-[1360px] px-6 pb-24 md:px-8">
          <Link
            to={`/projects/${next.slug}`}
            className="group flex flex-wrap items-center justify-between gap-6 rounded-[28px] bg-navy px-8 py-10 text-white md:px-14 md:py-12"
          >
            <span className="flex flex-col gap-2">
              <span className="text-sm text-on-dark-2">Next project</span>
              <span className="font-display text-3xl font-medium tracking-[-0.03em] md:text-[40px]">{next.title}</span>
            </span>
            <span className="grid size-16 place-items-center rounded-full bg-sky text-navy transition-transform group-hover:translate-x-1">
              <ArrowRight size={24} />
            </span>
          </Link>
        </section>
      )}
    </>
  )
}
