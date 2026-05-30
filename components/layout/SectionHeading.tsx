import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import type { Alignment } from '@/types/common'

type SectionHeadingProps = {
  title: string
  subtitle?: string
  action?: ReactNode
  align?: Alignment
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  action,
  align = 'left',
  className,
}: SectionHeadingProps) {
  if (align === 'center') {
    return (
      <div className={cn('text-center mb-12', className)}>
        {subtitle && (
          <p className="text-[10px] uppercase tracking-[0.2em] text-accent mb-2">{subtitle}</p>
        )}
        <h2 className="font-display text-3xl font-medium text-charcoal">{title}</h2>
      </div>
    )
  }

  return (
    <div className={cn('flex items-end justify-between mb-8', className)}>
      <div>
        {subtitle && (
          <p className="text-[10px] uppercase tracking-[0.2em] text-accent mb-2">{subtitle}</p>
        )}
        <h2 className="font-display text-3xl font-medium text-charcoal">{title}</h2>
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
