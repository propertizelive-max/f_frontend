'use client'

import { useQuery } from '@tanstack/react-query'
import { productsApi, type ProductsQueryParams } from '@/features/products/services/products.api'

export function useProducts(params: ProductsQueryParams = {}) {
  const { categoryId, ...rest } = params
  return useQuery({
    queryKey: ['products', params],
    queryFn: () =>
      categoryId
        ? productsApi.getByCategory(categoryId, rest)
        : productsApi.list(params),
    staleTime: 60_000,
    placeholderData: (prev) => prev,
  })
}
