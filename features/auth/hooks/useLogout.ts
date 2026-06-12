'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth.store'

export function useLogout() {
  const router = useRouter()
  const clearAuth = useAuthStore((s) => s.clearAuth)

  const logout = useCallback(() => {
    clearAuth()
    router.push('/')
  }, [clearAuth, router])

  return { logout }
}
