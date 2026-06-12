'use client'

import Link from 'next/link'
import { useProducts } from '@/features/products/hooks/useProducts'
import { apiProductToCard } from '@/lib/mappers'
import { ProductCard } from '@/components/products/ProductCard'
import { SkeletonCard } from '@/components/ui/SkeletonCard'

type RelatedProductsProps = {
  categoryId: string
  currentProductId: string
  categoryName?: string
}

export default function RelatedProducts({
  categoryId,
  currentProductId,
  categoryName,
}: RelatedProductsProps) {
  const { data, isLoading } = useProducts({ categoryId, limit: 5, sortBy: 'createdAt', order: 'DESC' })

  // Exclude the current product, cap at 4
  const products = (data?.data ?? [])
    .filter((p) => p.id !== currentProductId)
    .slice(0, 4)
    .map(apiProductToCard)

  // Nothing to show once loaded
  if (!isLoading && products.length === 0) return null

  return (
    <section className="mt-20 pt-12 border-t border-border">
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.35em] text-accent mb-2">
            You May Also Like
          </span>
          <h2 className="font-display text-2xl lg:text-3xl font-medium text-charcoal">
            {categoryName ? `More from ${categoryName}` : 'From the Same Collection'}
          </h2>
        </div>
        {categoryId && (
          <Link
            href={`/products?categoryId=${categoryId}${categoryName ? `&categoryName=${encodeURIComponent(categoryName)}` : ''}`}
            className="hidden sm:block text-[10px] uppercase tracking-[0.2em] font-medium text-charcoal border-b border-charcoal pb-0.5 hover:text-accent hover:border-accent transition-colors"
          >
            View All
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} aspectRatio="3/4" />
            ))
          : products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
      </div>
    </section>
  )
}
