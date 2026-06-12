'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ordersApi, type CheckoutPayload } from '@/features/orders/services/orders.api'

export function useMyOrders() {
  return useQuery({
    queryKey: ['orders', 'my-orders'],
    queryFn: () => ordersApi.getMyOrders(),
    staleTime: 60_000,
    retry: false,
  })
}

export function useOrder(id: string | null) {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: () => ordersApi.getById(id!),
    enabled: !!id,
    staleTime: 60_000,
  })
}

export function useCheckout() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: CheckoutPayload) => ordersApi.checkout(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['orders'] })
      qc.invalidateQueries({ queryKey: ['cart'] })
    },
  })
}

export function useCancelOrder() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      ordersApi.cancel(id, reason),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['orders'] })
    },
  })
}
