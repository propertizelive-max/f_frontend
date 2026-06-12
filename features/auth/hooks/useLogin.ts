'use client'

import { useCallback } from 'react'
import { authApi } from '@/features/auth/services/auth.api'

export function useLogin() {
  const loginWithGoogle = useCallback(() => {
    window.location.href = authApi.googleOAuthUrl()
  }, [])

  return { loginWithGoogle }
}
