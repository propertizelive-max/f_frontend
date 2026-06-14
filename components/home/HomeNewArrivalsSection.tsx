'use client'

import { useQuery } from '@tanstack/react-query'
import { productsApi } from '@/features/products/services/products.api'
import { ProductCard } from '@/components/products/ProductCard'
import { SkeletonCard } from '@/components/ui/SkeletonCard'
import { apiProductToCard } from '@/lib/mappers'

export function HomeNewArrivalsSection() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', { page: 1, limit: 4, sortBy: 'createdAt', order: 'DESC' }],
    queryFn: () =>
      productsApi.list({ page: 1, limit: 4, sortBy: 'createdAt', order: 'DESC' }),
    staleTime: 0,
  })
  // test line start 
  console.log('HOME RESPONSE', data)
  console.log('HOME PRODUCTS', data?.data)
  // test line end
  const products = (data?.data ?? []).map(apiProductToCard)

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} aspectRatio="3/4" />
        ))}
      </div>
    )
  }

  if (isError || !products.length) {
    return (
      <p className="text-center text-sm text-muted py-8">
        Could not load products. Make sure the backend is running.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}
