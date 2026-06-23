'use client'

import { useMutation } from '@tanstack/react-query'
import { authApi } from '@/features/auth/services/auth.api'
import type { ForgotPasswordPayload } from '@/types/auth.types'

export function useForgotPassword() {
  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => authApi.forgotPassword(payload),
  })
}
