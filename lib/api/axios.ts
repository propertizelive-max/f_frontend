import axios from 'axios'
import { env } from '@/config/env'

const apiClient = axios.create({
  baseURL: env.API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
  withCredentials: true,  // sends httpOnly accessToken cookie automatically
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      const { useAuthStore } = await import('@/store/auth.store')
      const wasAuthenticated = useAuthStore.getState().isAuthenticated
      useAuthStore.getState().clearAuth()
      // Only force re-auth if the user was logged in — not for background/silent calls
      if (wasAuthenticated) {
        window.location.href = `${env.API_BASE_URL}/auth/google`
      }
    }
    return Promise.reject(error)
  }
)

export default apiClient
