import apiClient from '@/lib/api/axios'
import { env } from '@/config/env'
import type {
  User,
  RegisterPayload,
  RegisterResponse,
  LoginPayload,
  LoginResponse,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  MessageResponse,
} from '@/types/auth.types'

export const authApi = {
  register: (payload: RegisterPayload) =>
    apiClient.post<RegisterResponse>('/user/signin', payload).then((r) => r.data),

  login: (payload: LoginPayload) =>
    apiClient.post<LoginResponse>('/auth/login', payload).then((r) => r.data),

  forgotPassword: (payload: ForgotPasswordPayload) =>
    apiClient.post<MessageResponse>('/auth/forgot-password', payload).then((r) => r.data),

  resetPassword: (payload: ResetPasswordPayload) =>
    apiClient.post<MessageResponse>('/auth/reset-password', payload).then((r) => r.data),

  getProfile: () =>
    apiClient.get<User>('/user/profile').then((r) => r.data),

  googleOAuthUrl: () => `${env.API_BASE_URL}/auth/google`,

  logout: () => Promise.resolve(),
}
