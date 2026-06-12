'use client'

import { useQuery } from '@tanstack/react-query'
import { productsApi } from '@/features/products/services/products.api'

export function useProduct(id: string | null) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getById(id!),
    enabled: !!id,
    staleTime: 60_000,
  })
}
