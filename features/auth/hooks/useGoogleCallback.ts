'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth.store'
import { authApi } from '@/features/auth/services/auth.api'

export function useGoogleCallback() {
  const router = useRouter()
  const setUser = useAuthStore((s) => s.setUser)

  useEffect(() => {
    console.log('GOOGLE CALLBACK RUNNING')
    authApi
      .getProfile()
      .then((user) => {


        console.log('GOOGLE USER', user)

        setUser(user)


        console.log(
          'AUTH STORAGE',
          localStorage.getItem('auth-storage')
        )
        router.replace('/')
      })
      .catch((err) => {
        console.error('GOOGLE CALLBACK ERROR', err)
        router.replace('/login')
      })
  }, [setUser, router])
}
