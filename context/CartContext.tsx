'use client'

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { CartItem } from '@/types/cart'
import type { ApiCart, ApiCartItem } from '@/types/api'
import { cartApi } from '@/features/cart/services/cart.api'
import { useAuthStore } from '@/store/auth.store'
import { useCartStore } from '@/store/cart.store'
import { toast } from '@/hooks/useToast'
import { extractApiErrorMessage } from '@/lib/api/error'

// ─── Constants ────────────────────────────────────────────────────────────────
const CART_QUERY_KEY = ['cart']
const LOCAL_CART_KEY = 'nh_cart'
const FREE_DELIVERY_THRESHOLD = 5000
const DELIVERY_CHARGE = 499

// ─── Backend → UI mapper ──────────────────────────────────────────────────────
function isProductPurchasable(p: ApiCartItem['product']): boolean {
  if (!p) return false
  return (p.status === 'ACTIVE' || p.status === 'PUBLISHED') && p.isActive
}

function toCartItem(item: ApiCartItem): CartItem {
  const p = item.product
  const price = p?.discountPrice ?? p?.price ?? 0
  const originalPrice = p?.discountPrice != null ? p.price : undefined
  return {
    productId: item.productId,
    cartItemId: item.id,
    slug: p?.slug ?? item.productId,
    name: p?.title ?? '',
    price,
    originalPrice,
    quantity: item.quantity,
    image: p?.imageUrls?.[0] ?? '',
    notPurchasable: !isProductPurchasable(p),
  }
}

// ─── Local reducer (unauthenticated users only) ───────────────────────────────
interface LocalState {
  items: CartItem[]
  coupon: { code: string; discount: number } | null
}

type LocalAction =
  | { type: 'LOAD'; state: LocalState }
  | { type: 'ADD_ITEM'; item: CartItem }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QTY'; productId: string; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'APPLY_COUPON'; code: string; discount: number }
  | { type: 'REMOVE_COUPON' }

function localReducer(state: LocalState, action: LocalAction): LocalState {
  switch (action.type) {
    case 'LOAD':
      return action.state
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.productId === action.item.productId)
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.productId === action.item.productId
              ? { ...i, quantity: i.quantity + action.item.quantity }
              : i
          ),
        }
      }
      return { ...state, items: [...state.items, action.item] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.productId !== action.productId) }
    case 'UPDATE_QTY':
      if (action.quantity < 1)
        return { ...state, items: state.items.filter((i) => i.productId !== action.productId) }
      return {
        ...state,
        items: state.items.map((i) =>
          i.productId === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      }
    case 'CLEAR':
      return { items: [], coupon: null }
    case 'APPLY_COUPON':
      return { ...state, coupon: { code: action.code, discount: action.discount } }
    case 'REMOVE_COUPON':
      return { ...state, coupon: null }
    default:
      return state
  }
}

// ─── Context value shape ──────────────────────────────────────────────────────
interface CartContextValue {
  items: CartItem[]
  count: number
  subtotal: number
  mrp: number
  discount: number
  couponDiscount: number
  deliveryCharge: number
  total: number
  coupon: LocalState['coupon']
  isLoading: boolean
  addItem: (item: CartItem) => Promise<void>
  removeItem: (productId: string) => void
  updateQty: (productId: string, quantity: number) => void
  clearCart: () => void
  applyCoupon: (code: string, discount: number) => void
  removeCoupon: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

// ─── Provider ─────────────────────────────────────────────────────────────────
export function CartProvider({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const qc = useQueryClient()

  // ── Backend cart via React Query (authenticated only) ─────────────────────
  const { data: backendCart, isLoading: cartLoading } = useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: () => cartApi.get(),
    enabled: isAuthenticated,
    retry: false,
    staleTime: 30_000,
  })

  const { mutateAsync: apiAddItem } = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      cartApi.addItem(productId, quantity),
    onSuccess: (cart) => qc.setQueryData(CART_QUERY_KEY, cart),
    onError: (err) => toast(extractApiErrorMessage(err), 'error'),
  })

  const { mutate: apiUpdateItem } = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      cartApi.updateItem(itemId, quantity),
    onSuccess: (cart) => qc.setQueryData(CART_QUERY_KEY, cart),
    onError: (err) => toast(extractApiErrorMessage(err), 'error'),
  })

  const { mutate: apiRemoveItem } = useMutation({
    mutationFn: (itemId: string) => cartApi.removeItem(itemId),
    onSuccess: (cart) => qc.setQueryData(CART_QUERY_KEY, cart),
    onError: (err) => toast(extractApiErrorMessage(err), 'error'),
  })

  const { mutate: apiClearCart } = useMutation({
    mutationFn: () => cartApi.clear(),
    onSuccess: (cart) => qc.setQueryData(CART_QUERY_KEY, cart),
    onError: (err) => toast(extractApiErrorMessage(err), 'error'),
  })

  // ── Local reducer (unauthenticated only) ──────────────────────────────────
  const [localState, dispatch] = useReducer(localReducer, { items: [], coupon: null })

  useEffect(() => {
    if (isAuthenticated) return
    try {
      const raw = localStorage.getItem(LOCAL_CART_KEY)
      if (raw) dispatch({ type: 'LOAD', state: JSON.parse(raw) as LocalState })
    } catch { /* ignore */ }
  }, [isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) return
    try {
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(localState))
    } catch { /* ignore */ }
  }, [localState, isAuthenticated])

  // ── Active items: backend when authed, localStorage otherwise ─────────────
  const items: CartItem[] = isAuthenticated
    ? (backendCart?.items ?? []).map(toCartItem)
    : localState.items

  // ── Derived totals ────────────────────────────────────────────────────────
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const mrp = items.reduce((s, i) => s + (i.originalPrice ?? i.price) * i.quantity, 0)
  const discount = mrp - subtotal
  const coupon = isAuthenticated ? null : localState.coupon
  const couponDiscount = coupon?.discount ?? 0
  const deliveryCharge = subtotal > FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE
  const total = subtotal - couponDiscount + deliveryCharge
  // Use backend totalItems for auth users; count quantities locally otherwise
  const count = isAuthenticated
    ? (backendCart?.totalItems ?? 0)
    : localState.items.reduce((s, i) => s + i.quantity, 0)

  // ── Sync count to Zustand cart store for navbar badge ─────────────────────
  useEffect(() => {
    useCartStore.getState().setCartCount(count)
  }, [count])

  // ── Cart mutations ────────────────────────────────────────────────────────

  const addItem = useCallback(
    async (item: CartItem): Promise<void> => {
      if (isAuthenticated) {
        await apiAddItem({ productId: item.productId, quantity: item.quantity })
      } else {
        dispatch({ type: 'ADD_ITEM', item })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isAuthenticated]
  )

  // Reads item ID from query cache so it's always fresh
  const getBackendItemId = useCallback(
    (productId: string): string | undefined =>
      (qc.getQueryData<ApiCart>(CART_QUERY_KEY))?.items.find(
        (i) => i.productId === productId
      )?.id,
    [qc]
  )

  const removeItem = useCallback(
    (productId: string) => {
      if (isAuthenticated) {
        const id = getBackendItemId(productId)
        if (id) apiRemoveItem(id)
      } else {
        dispatch({ type: 'REMOVE_ITEM', productId })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isAuthenticated, getBackendItemId]
  )

  const updateQty = useCallback(
    (productId: string, quantity: number) => {
      if (isAuthenticated) {
        const id = getBackendItemId(productId)
        if (!id) return
        if (quantity < 1) {
          apiRemoveItem(id)
        } else {
          apiUpdateItem({ itemId: id, quantity })
        }
      } else {
        dispatch({ type: 'UPDATE_QTY', productId, quantity })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isAuthenticated, getBackendItemId]
  )

  const clearCart = useCallback(() => {
    if (isAuthenticated) {
      apiClearCart()
    } else {
      dispatch({ type: 'CLEAR' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  const applyCoupon = useCallback(
    (code: string, discount: number) => dispatch({ type: 'APPLY_COUPON', code, discount }),
    []
  )
  const removeCoupon = useCallback(() => dispatch({ type: 'REMOVE_COUPON' }), [])

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        subtotal,
        mrp,
        discount,
        couponDiscount,
        deliveryCharge,
        total,
        coupon,
        isLoading: isAuthenticated && cartLoading,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
