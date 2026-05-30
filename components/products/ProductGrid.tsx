import { ProductCard } from '@/components/products/ProductCard'
import { SkeletonCard } from '@/components/ui/SkeletonCard'
import type { ProductListing } from '@/types/product'

type ProductGridProps = {
  products: ProductListing[]
  loading?: boolean
  onClearFilters?: () => void
}

export function ProductGrid({ products, loading = false, onClearFilters }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} aspectRatio="3/4" />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-28 text-center">
        <p className="font-display italic text-2xl lg:text-3xl text-charcoal mb-3">
          No pieces found
        </p>
        <p className="text-sm text-muted mb-10 max-w-xs leading-relaxed">
          Try adjusting your filters to discover more from our collection.
        </p>
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="text-[10px] uppercase tracking-[0.2em] font-medium text-charcoal border border-charcoal px-8 py-3 hover:bg-charcoal hover:text-cream transition-colors duration-300"
          >
            Clear Filters
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}
