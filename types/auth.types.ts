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
}

export interface RegisterResponse {
  Message: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
}

export interface ForgotPasswordPayload {
  email: string
}

export interface ResetPasswordPayload {
  token: string
  newPassword: string
}

export interface MessageResponse {
  message: string
}
