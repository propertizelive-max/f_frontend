import apiClient from '@/lib/api/axios'
import type { ApiCart } from '@/types/api'

export const cartApi = {
  get: () =>
    apiClient.get<ApiCart>('/cart').then((r) => r.data),

  addItem: (productId: string, quantity: number) =>
    apiClient.post<ApiCart>('/cart/items', { productId, quantity }).then((r) => r.data),

  updateItem: (itemId: string, quantity: number) =>
    apiClient.patch<ApiCart>(`/cart/items/${itemId}`, { quantity }).then((r) => r.data),

  removeItem: (itemId: string) =>
    apiClient.delete<ApiCart>(`/cart/items/${itemId}`).then((r) => r.data),

  clear: () =>
    apiClient.delete<ApiCart>('/cart/clear').then((r) => r.data),
}
