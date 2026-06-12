'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { authApi } from '@/features/auth/services/auth.api'
import type { RegisterPayload } from '@/types/auth.types'

export function useRegister() {
  const router = useRouter()

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    onSuccess: () => {
      router.push('/login')
    },
  })
}
