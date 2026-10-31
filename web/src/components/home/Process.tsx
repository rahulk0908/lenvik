import { Eyebrow } from '../ui'

const steps = [
  { title: 'Consult', desc: 'We learn your goals, site and budget, and agree on scope.' },
  { title: 'Plan & design', desc: 'Drawings, approvals, costing and a schedule you can hold us to.' },
  { title: 'Build', desc: 'A dedicated site team with weekly photo and progress reports.' },
  { title: 'Handover', desc: 'Inspections, documentation and aftercare once you move in.' },
]

export function Process() {
  return (
    <section id="process" className="scroll-mt-6 bg-white">
      <div className="mx-auto flex max-w-[1360px] flex-wrap gap-16 px-6 py-28 md:px-8">
        <div className="flex flex-[1_1_360px] flex-col gap-4">
          <Eyebrow>Process</Eyebrow>
          <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-[-0.035em] md:text-[52px]">
            Clear steps.
            <br />
            No surprises.
          </h2>
          <p className="max-w-[380px] text-[17px] leading-relaxed text-muted">
            Weekly photo updates and a single point of contact from day one.
          </p>
        </div>
        <ol className="flex flex-[2_1_600px] flex-col">
          {steps.map((s, i) => (
            <li key={s.title} className="flex flex-wrap items-baseline gap-6 border-t border-line py-7">
              <span className="w-16 font-display text-[15px] text-muted">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="flex-[1_1_200px] font-display text-[26px] font-medium tracking-[-0.02em]">{s.title}</h3>
              <p className="flex-[2_1_280px] leading-relaxed text-muted">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
