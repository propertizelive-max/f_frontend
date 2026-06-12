import apiClient from '@/lib/api/axios'
import type { ApiProduct, PaginatedResponse } from '@/types/api'

export interface ProductsQueryParams {
  page?: number
  limit?: number
  search?: string
  categoryId?: string
  sortBy?: 'title' | 'price' | 'createdAt' | 'stock' | 'status'
  order?: 'ASC' | 'DESC'
  minPrice?: number
  maxPrice?: number
  isFeatured?: boolean
  status?: 'DRAFT' | 'PUBLISHED' | 'ACTIVE' | 'ARCHIVED' | 'OUT_OF_STOCK'
}

export const productsApi = {
  list: (params: ProductsQueryParams = {}) =>
    apiClient
      .get<PaginatedResponse<ApiProduct>>('/products', { params })
      .then((r) => r.data),

  getById: (id: string) =>
    apiClient.get<ApiProduct>(`/products/${id}`).then((r) => r.data),

  getByCategory: (categoryId: string, params: Omit<ProductsQueryParams, 'categoryId'> = {}) =>
    apiClient
      .get<PaginatedResponse<ApiProduct>>(`/categories/${categoryId}/products`, { params })
      .then((r) => r.data),
}
