'use client'

import { useQuery } from '@tanstack/react-query'
import { categoriesApi } from '@/features/categories/services/categories.api'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.list({ isActive: true, limit: 20 }),
    staleTime: 300_000,
  })
}
