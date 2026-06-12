import { create } from 'zustand'
import type { ApiCart } from '@/types/api'

interface CartStore {
  cartCount: number
  setCartCount: (count: number) => void
  syncFromCartResponse: (cart: ApiCart) => void
}

export const useCartStore = create<CartStore>((set) => ({
  cartCount: 0,
  setCartCount: (count) => set({ cartCount: count }),
  syncFromCartResponse: (cart) => set({ cartCount: cart.totalItems }),
}))
