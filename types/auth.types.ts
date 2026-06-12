export interface User {
  id: string
  name: string
  email: string
  role: string
  picture?: string | null
  googleId?: string | null
  provider?: string
  createdAt?: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  role: 'USER'
}

export interface RegisterResponse {
  Message: string
}

// Legacy/unused — kept for backward compat with store/index.ts re-exports
export interface AuthTokens {
  accessToken: string
  refreshToken: string
}
export interface LoginCredentials {
  email: string
  password: string
}
export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
}
