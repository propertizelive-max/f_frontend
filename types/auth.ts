export type { User, AuthTokens, LoginCredentials, RegisterPayload, AuthResponse } from '@/types/auth.types'

export interface AuthState {
  isAuthenticated: boolean
  user: import('@/types/auth.types').User | null
  accessToken: string | null
  isLoading: boolean
}

export type LoginRequest = import('@/types/auth.types').LoginCredentials
export type RegisterRequest = import('@/types/auth.types').RegisterPayload
