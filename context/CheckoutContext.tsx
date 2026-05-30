'use client'

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { CheckoutStep, CheckoutFormData } from '@/types/checkout'

const FORM_KEY = 'nh_checkout_form'

interface CheckoutState {
  formData: Partial<CheckoutFormData>
  orderId: string | null
}

type CheckoutAction =
  | { type: 'SAVE_FORM'; data: Partial<CheckoutFormData> }
  | { type: 'SET_ORDER_ID'; orderId: string }
  | { type: 'RESET' }
  | { type: 'LOAD'; formData: Partial<CheckoutFormData> }

function reducer(state: CheckoutState, action: CheckoutAction): CheckoutState {
  switch (action.type) {
    case 'SAVE_FORM':
      return { ...state, formData: { ...state.formData, ...action.data } }
    case 'SET_ORDER_ID':
      return { ...state, orderId: action.orderId }
    case 'RESET':
      return { formData: {}, orderId: null }
    case 'LOAD':
      return { ...state, formData: action.formData }
    default:
      return state
  }
}

interface CheckoutContextValue {
  formData: Partial<CheckoutFormData>
  orderId: string | null
  goToStep: (step: CheckoutStep) => void
  saveFormData: (data: Partial<CheckoutFormData>) => void
  setOrderId: (id: string) => void
  resetCheckout: () => void
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null)

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [state, dispatch] = useReducer(reducer, {
    formData: {},
    orderId: null,
  })

  useEffect(() => {
    try {
      const savedForm = localStorage.getItem(FORM_KEY)
      const formData = savedForm ? (JSON.parse(savedForm) as Partial<CheckoutFormData>) : {}
      if (Object.keys(formData).length > 0) {
        dispatch({ type: 'LOAD', formData })
      }
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(FORM_KEY, JSON.stringify(state.formData))
    } catch {
      // ignore
    }
  }, [state.formData])

  const goToStep = useCallback((step: CheckoutStep) => {
    router.push(`/checkout/${step}`)
  }, [router])

  const saveFormData = useCallback((data: Partial<CheckoutFormData>) => {
    dispatch({ type: 'SAVE_FORM', data })
  }, [])

  const setOrderId = useCallback((orderId: string) => {
    dispatch({ type: 'SET_ORDER_ID', orderId })
  }, [])

  const resetCheckout = useCallback(() => {
    try {
      localStorage.removeItem(FORM_KEY)
    } catch {
      // ignore
    }
    dispatch({ type: 'RESET' })
  }, [])

  return (
    <CheckoutContext.Provider
      value={{ formData: state.formData, orderId: state.orderId, goToStep, saveFormData, setOrderId, resetCheckout }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}

export function useCheckout(): CheckoutContextValue {
  const ctx = useContext(CheckoutContext)
  if (!ctx) throw new Error('useCheckout must be used within CheckoutProvider')
  return ctx
}
