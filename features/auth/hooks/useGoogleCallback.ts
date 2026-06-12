'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth.store'
import { authApi } from '@/features/auth/services/auth.api'

export function useGoogleCallback() {
  const router = useRouter()
  const setUser = useAuthStore((s) => s.setUser)

  useEffect(() => {
    authApi
      .getProfile()
      .then((user) => {
        setUser(user)
        router.replace('/')
      })
      .catch(() => {
        router.replace('/login')
      })
  }, [setUser, router])
}
