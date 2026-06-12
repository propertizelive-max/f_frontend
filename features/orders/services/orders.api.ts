import apiClient from '@/lib/api/axios'
import type { ApiOrder, PaymentMethod } from '@/types/api'

export interface CheckoutPayload {
  fullName: string
  phoneNumber: string
  shippingAddress: string
  city: string
  state: string
  zipCode: string
  gstin?: string
  paymentMethod: PaymentMethod
}

export const ordersApi = {
  checkout: (payload: CheckoutPayload) =>
    apiClient.post<ApiOrder>('/orders/checkout', payload).then((r) => r.data),

  getMyOrders: () =>
    apiClient.get<ApiOrder[]>('/orders/my-orders').then((r) => r.data),

  getById: (id: string) =>
    apiClient.get<ApiOrder>(`/orders/${id}`).then((r) => r.data),

  cancel: (id: string, reason: string) =>
    apiClient.patch<ApiOrder>(`/orders/${id}/cancel`, { reason }).then((r) => r.data),
}
