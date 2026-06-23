'use client'

import { useMutation } from '@tanstack/react-query'
import { authApi } from '@/features/auth/services/auth.api'
import type { ResetPasswordPayload } from '@/types/auth.types'

export function useResetPassword() {
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => authApi.resetPassword(payload),
  })
}
