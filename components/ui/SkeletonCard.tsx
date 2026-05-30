import { cn } from '@/lib/utils'

type AspectRatio = '3/4' | '1/1' | '16/9'

const aspectClasses: Record<AspectRatio, string> = {
  '3/4':  'aspect-[3/4]',
  '1/1':  'aspect-square',
  '16/9': 'aspect-video',
}

type SkeletonCardProps = {
  aspectRatio?: AspectRatio
  className?: string
}

export function SkeletonCard({ aspectRatio = '3/4', className }: SkeletonCardProps) {
  return (
    <div className={cn('animate-pulse', className)} aria-hidden="true">
      <div className={cn('rounded-xl bg-surface', aspectClasses[aspectRatio])} />
      <div className="mt-3 space-y-2">
        <div className="h-3 bg-surface rounded w-3/4" />
        <div className="h-3 bg-surface rounded w-1/2" />
      </div>
    </div>
  )
}
