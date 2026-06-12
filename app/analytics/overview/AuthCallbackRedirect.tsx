'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth.store'
import { authApi } from '@/features/auth/services/auth.api'

export function AuthCallbackRedirect() {
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

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-muted">Completing sign-in…</p>
    </div>
  )
}
