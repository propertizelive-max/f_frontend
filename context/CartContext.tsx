'use client'

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import type { CartItem } from '@/types/cart'

const CART_KEY = 'nh_cart'
const FREE_DELIVERY_THRESHOLD = 5000
const DELIVERY_CHARGE = 499

interface CartState {
  items: CartItem[]
  coupon: { code: string; discount: number } | null
}

type CartAction =
  | { type: 'ADD_ITEM'; item: CartItem }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QTY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'APPLY_COUPON'; code: string; discount: number }
  | { type: 'REMOVE_COUPON' }
  | { type: 'LOAD'; state: CartState }

function reducer(state: CartState, action: CartAction): CartState {
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
      if (action.quantity < 1) {
        return { ...state, items: state.items.filter((i) => i.productId !== action.productId) }
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.productId === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      }

    case 'CLEAR_CART':
      return { items: [], coupon: null }

    case 'APPLY_COUPON':
      return { ...state, coupon: { code: action.code, discount: action.discount } }

    case 'REMOVE_COUPON':
      return { ...state, coupon: null }

    default:
      return state
  }
}

interface CartContextValue {
  items: CartItem[]
  count: number
  subtotal: number
  mrp: number
  discount: number
  couponDiscount: number
  deliveryCharge: number
  total: number
  coupon: CartState['coupon']
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  updateQty: (productId: string, quantity: number) => void
  clearCart: () => void
  applyCoupon: (code: string, discount: number) => void
  removeCoupon: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], coupon: null })
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY)
      if (raw) {
        const saved = JSON.parse(raw) as CartState
        dispatch({ type: 'LOAD', state: saved })
      }
    } catch {
      // ignore malformed storage
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(state))
    } catch {
      // ignore storage errors
    }
  }, [state])

  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const mrp = state.items.reduce(
    (sum, i) => sum + (i.originalPrice ?? i.price) * i.quantity,
    0
  )
  const discount = mrp - subtotal
  const couponDiscount = state.coupon?.discount ?? 0
  const deliveryCharge = subtotal > FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE
  const total = subtotal - couponDiscount + deliveryCharge
  const count = state.items.reduce((sum, i) => sum + i.quantity, 0)

  const addItem = useCallback((item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', item })
  }, [])

  const removeItem = useCallback((productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', productId })
  }, [])

  const updateQty = useCallback((productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QTY', productId, quantity })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [])

  const applyCoupon = useCallback((code: string, discount: number) => {
    dispatch({ type: 'APPLY_COUPON', code, discount })
  }, [])

  const removeCoupon = useCallback(() => {
    dispatch({ type: 'REMOVE_COUPON' })
  }, [])

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        count,
        subtotal,
        mrp,
        discount,
        couponDiscount,
        deliveryCharge,
        total,
        coupon: state.coupon,
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
