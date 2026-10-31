import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { sized } from '../lib/image'

export function Photo({
  src,
  alt,
  hint,
  width = 1200,
  dark = false,
  className = '',
}: {
  src: string | null | undefined
  alt: string
  hint?: string
  width?: number
  dark?: boolean
  className?: string
}) {
  if (src) {
    return <img src={sized(src, width)} alt={alt} loading="lazy" className={`object-cover ${className}`} />
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={`flex items-center justify-center text-xs uppercase tracking-[0.14em] ${
        dark ? 'placeholder-dark text-on-dark-2' : 'placeholder-light text-muted'
      } ${className}`}
    >
      {hint ? `[Photo: ${hint}]` : '[Photo]'}
    </div>
  )
}

export function Eyebrow({ children, dot = false, dark = false }: { children: ReactNode; dot?: boolean; dark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-sm ${dark ? 'text-on-dark' : 'text-muted'}`}>
      {dot && <span className="size-2 rounded-full bg-sky" />}
      {children}
    </span>
  )
}

export function SectionHeader({ eyebrow, title, aside }: { eyebrow: string; title: ReactNode; aside?: ReactNode }) {
  return (
    <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
      <div className="flex flex-col gap-4">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-[-0.035em] md:text-[52px]">
          {title}
        </h2>
      </div>
      {aside}
    </div>
  )
}

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export function StatusPill({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[13px] font-medium text-navy">
      <span className={`size-[7px] rounded-full ${status === 'Ongoing' ? 'bg-sky' : 'bg-royal'}`} />
      {status === 'Ongoing' ? 'In progress' : status}
    </span>
  )
}
