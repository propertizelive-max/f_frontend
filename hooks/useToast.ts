'use client'

import { useState, useEffect } from 'react'

export type ToastItem = { id: string; message: string; type: 'success' | 'error' }

type Listener = (toasts: ToastItem[]) => void

let _toasts: ToastItem[] = []
const _listeners: Listener[] = []

function _notify() {
  _listeners.forEach((l) => l([..._toasts]))
}

export function toast(message: string, type: 'success' | 'error' = 'success') {
  const id = `${Date.now()}-${Math.random()}`
  _toasts = [..._toasts, { id, message, type }]
  _notify()
  setTimeout(() => {
    _toasts = _toasts.filter((t) => t.id !== id)
    _notify()
  }, 3500)
}

export function useToastState(): ToastItem[] {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  useEffect(() => {
    _listeners.push(setToasts)
    return () => {
      const idx = _listeners.indexOf(setToasts)
      if (idx > -1) _listeners.splice(idx, 1)
    }
  }, [])
  return toasts
}
