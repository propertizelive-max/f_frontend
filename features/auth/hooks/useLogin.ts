'use client'

import { useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '@/store/auth.store'
import { authApi } from '@/features/auth/services/auth.api'
import type { LoginPayload } from '@/types/auth.types'

export function useLogin() {
  const setUser = useAuthStore((s) => s.setUser)

  const loginWithGoogle = useCallback(() => {
    window.location.href = authApi.googleOAuthUrl()
  }, [])

  const mutation = useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: async () => {

      try {
        const user = await authApi.getProfile()
        console.log('STEP 2: Profile received', user)
        setUser(user)
        console.log('STEP 3: User saved')

        console.log(
          'STEP 4: Storage',
          localStorage.getItem('auth-storage')
        )



      } catch (err) {
        console.error('PROFILE REQUEST FAILED', err)
      }

    },
  })

  return {
    loginWithGoogle,
    login: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  }
}
