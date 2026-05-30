export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  accessToken: string | null
  isLoading: boolean
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  accessToken: string
  user: User
}
