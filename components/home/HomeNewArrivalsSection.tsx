'use client'

import { useProducts } from '@/features/products/hooks/useProducts'
import { ProductCard } from '@/components/products/ProductCard'
import { SkeletonCard } from '@/components/ui/SkeletonCard'
import { apiProductToCard } from '@/lib/mappers'

export function HomeNewArrivalsSection() {
  const { data, isLoading, isError } = useProducts({ limit: 4, sortBy: 'createdAt', order: 'DESC' })

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} aspectRatio="3/4" />
        ))}
      </div>
    )
  }

  if (isError || !data?.data?.length) {
    return (
      <p className="text-center text-sm text-muted py-8">
        Could not load products. Make sure the backend is running.
      </p>
    )
  }

  const products = data.data.map(apiProductToCard)

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}
