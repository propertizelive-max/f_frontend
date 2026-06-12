'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { cartApi } from '@/features/cart/services/cart.api'

const CART_KEY = ['cart']

export function useCart() {
  return useQuery({
    queryKey: CART_KEY,
    queryFn: () => cartApi.get(),
    staleTime: 30_000,
    retry: false,
  })
}

export function useAddCartItem() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      cartApi.addItem(productId, quantity),
    onSuccess: (cart) => qc.setQueryData(CART_KEY, cart),
  })
}

export function useUpdateCartItem() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      cartApi.updateItem(itemId, quantity),
    onSuccess: (cart) => qc.setQueryData(CART_KEY, cart),
  })
}

export function useRemoveCartItem() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (itemId: string) => cartApi.removeItem(itemId),
    onSuccess: (cart) => qc.setQueryData(CART_KEY, cart),
  })
}

export function useClearCart() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: () => cartApi.clear(),
    onSuccess: (cart) => qc.setQueryData(CART_KEY, cart),
  })
}
