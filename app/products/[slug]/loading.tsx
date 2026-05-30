import { Container } from '@/components/layout/Container'
import { SkeletonCard } from '@/components/ui/SkeletonCard'

export default function ProductDetailLoading() {
  return (
    <Container as="main" className="py-8 lg:py-12">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2 mb-8 animate-pulse">
        <div className="h-2.5 w-10 bg-surface rounded" />
        <div className="h-2.5 w-2 bg-surface rounded" />
        <div className="h-2.5 w-16 bg-surface rounded" />
        <div className="h-2.5 w-2 bg-surface rounded" />
        <div className="h-2.5 w-32 bg-surface rounded" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10 lg:gap-16">
        {/* Gallery skeleton */}
        <div className="space-y-4">
          <SkeletonCard aspectRatio="3/4" />
          <div className="hidden md:flex gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-16 aspect-square bg-surface animate-pulse rounded-sm" />
            ))}
          </div>
        </div>

        {/* Info skeleton */}
        <div className="space-y-5 animate-pulse">
          <div className="h-3 w-16 bg-surface rounded" />
          <div className="space-y-2">
            <div className="h-8 w-3/4 bg-surface rounded" />
            <div className="h-3 w-24 bg-surface rounded" />
          </div>
          <div className="h-7 w-28 bg-surface rounded" />
          <div className="space-y-2 pt-4 border-t border-border">
            <div className="h-3 bg-surface rounded w-full" />
            <div className="h-3 bg-surface rounded w-5/6" />
            <div className="h-3 bg-surface rounded w-4/6" />
          </div>
          <div className="flex gap-2 pt-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-7 h-7 rounded-full bg-surface" />
            ))}
          </div>
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-8 w-16 bg-surface rounded-sm" />
            ))}
          </div>
          <div className="space-y-3 pt-4">
            <div className="h-11 bg-surface rounded-sm w-full" />
            <div className="h-11 bg-surface rounded-sm w-full" />
          </div>
        </div>
      </div>
    </Container>
  )
}
