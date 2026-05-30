'use client'

import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key)
      if (stored !== null) setValue(JSON.parse(stored) as T)
    } catch {
      // Storage unavailable or parse error — keep initialValue
    }
  }, [key])

  function set(newValue: T) {
    try {
      setValue(newValue)
      window.localStorage.setItem(key, JSON.stringify(newValue))
    } catch {
      // Storage unavailable — state update still succeeds
    }
  }

  return [value, set] as const
}
