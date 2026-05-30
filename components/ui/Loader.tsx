import { cn } from '@/lib/utils'

type LoaderSize = 'sm' | 'md' | 'lg'

const sizeClasses: Record<LoaderSize, string> = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-[3px]',
}

type LoaderProps = {
  size?: LoaderSize
  className?: string
  label?: string
}

export function Loader({ size = 'md', className, label = 'Loading…' }: LoaderProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn('inline-flex items-center justify-center', className)}
    >
      <span
        className={cn(
          'rounded-full border-charcoal border-t-transparent animate-spin',
          sizeClasses[size]
        )}
        aria-hidden="true"
      />
    </span>
  )
}
