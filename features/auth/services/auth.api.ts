import apiClient from '@/lib/api/axios'
import { env } from '@/config/env'
import type { User, RegisterPayload, RegisterResponse } from '@/types/auth.types'

export const authApi = {
  register: (payload: RegisterPayload) =>
    apiClient.post<RegisterResponse>('/user/signin', payload).then((r) => r.data),

  getProfile: () =>
    apiClient.get<User>('/user/profile').then((r) => r.data),

  googleOAuthUrl: () => `${env.API_BASE_URL}/auth/google`,

  logout: () => Promise.resolve(),
}
