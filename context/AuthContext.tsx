'use client'

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import type { AuthState, User } from '@/types/auth'

type AuthAction =
  | { type: 'LOGIN'; user: User; token: string }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; loading: boolean }

interface AuthContextValue extends AuthState {
  login: (user: User, token: string) => void
  logout: () => void
  openAuthModal: (pendingAction?: () => void) => void
  closeAuthModal: () => void
  isModalOpen: boolean
  pendingAction: (() => void) | null
}

const TOKEN_KEY = 'nh_access_token'
const USER_KEY = 'nh_user'

function reducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return { isAuthenticated: true, user: action.user, accessToken: action.token, isLoading: false }
    case 'LOGOUT':
      return { isAuthenticated: false, user: null, accessToken: null, isLoading: false }
    case 'SET_LOADING':
      return { ...state, isLoading: action.loading }
    default:
      return state
  }
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    isAuthenticated: false,
    user: null,
    accessToken: null,
    isLoading: true,
  })
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [pendingAction, setPendingAction] = React.useState<(() => void) | null>(null)

  useEffect(() => {
    try {
      const token = localStorage.getItem(TOKEN_KEY)
      const raw = localStorage.getItem(USER_KEY)
      if (token && raw) {
        const user = JSON.parse(raw) as User
        dispatch({ type: 'LOGIN', user, token })
      } else {
        dispatch({ type: 'SET_LOADING', loading: false })
      }
    } catch {
      dispatch({ type: 'SET_LOADING', loading: false })
    }
  }, [])

  const login = useCallback((user: User, token: string) => {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
    dispatch({ type: 'LOGIN', user, token })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    document.cookie = 'auth_token=; path=/; max-age=0'
    dispatch({ type: 'LOGOUT' })
  }, [])

  const openAuthModal = useCallback((action?: () => void) => {
    setPendingAction(action ? () => action : null)
    setIsModalOpen(true)
  }, [])

  const closeAuthModal = useCallback(() => {
    setIsModalOpen(false)
    setPendingAction(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{ ...state, login, logout, openAuthModal, closeAuthModal, isModalOpen, pendingAction }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
