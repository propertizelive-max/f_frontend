'use client'

import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/store/auth.store'
import { authApi } from '@/features/auth/services/auth.api'

export function useProfile() {
  const setUser = useAuthStore((s) => s.setUser)

  return useQuery({
    queryKey: ['auth', 'profile'],
    queryFn: async () => {
      const user = await authApi.getProfile()
      setUser(user)
      return user
    },
    staleTime: 60_000,
    retry: false,
  })
}
