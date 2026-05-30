import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'new' | 'sale' | 'soldout' | 'accent'

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-surface text-charcoal',
  new:     'bg-charcoal text-cream',
  sale:    'bg-accent text-white',
  soldout: 'bg-muted/20 text-muted',
  accent:  'bg-accent/10 text-accent',
}

type BadgeProps = {
  label: string
  variant?: BadgeVariant
  className?: string
}

export function Badge({ label, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] rounded-sm',
        variantClasses[variant],
        className
      )}
    >
      {label}
    </span>
  )
}
