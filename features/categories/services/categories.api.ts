import apiClient from '@/lib/api/axios'
import type { ApiCategory, PaginatedResponse } from '@/types/api'

export interface CategoriesQueryParams {
  page?: number
  limit?: number
  search?: string
  isActive?: boolean
  sortBy?: 'name' | 'createdAt' | 'isActive'
  order?: 'ASC' | 'DESC'
}

export const categoriesApi = {
  list: (params: CategoriesQueryParams = {}) =>
    apiClient
      .get<PaginatedResponse<ApiCategory>>('/categories', { params })
      .then((r) => r.data),

  getById: (id: string) =>
    apiClient.get<ApiCategory>(`/categories/${id}`).then((r) => r.data),
}
