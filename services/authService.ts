import type { AuthResponse, LoginRequest, RegisterRequest } from '@/types/auth'

const BASE = process.env.NEXT_PUBLIC_API_URL ?? ''

async function request<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error((data as { message?: string }).message ?? 'Something went wrong. Please try again.')
  return data as T
}

export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  return request<AuthResponse>('/auth/login', data)
}

export async function registerUser(data: RegisterRequest): Promise<AuthResponse> {
  return request<AuthResponse>('/auth/register', data)
}

export async function logoutUser(): Promise<void> {
  await fetch(`${BASE}/auth/logout`, { method: 'POST' }).catch(() => {})
}
