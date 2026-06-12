'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useAuthStore } from '@/store/auth.store'
import type { User } from '@/types/auth.types'

interface AuthContextValue {
  isAuthenticated: boolean
  user: User | null
  isLoading: boolean
  login: (user: User) => void
  logout: () => void
  openAuthModal: (pendingAction?: () => void) => void
  closeAuthModal: () => void
  isModalOpen: boolean
  pendingAction: (() => void) | null
  // Legacy compat
  accessToken: null
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, setUser, clearAuth } = useAuthStore()
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const login = useCallback(
    (user: User) => {
      setUser(user)
    },
    [setUser]
  )

  const logout = useCallback(() => {
    clearAuth()
  }, [clearAuth])

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
      value={{
        isAuthenticated,
        user,
        isLoading,
        login,
        logout,
        openAuthModal,
        closeAuthModal,
        isModalOpen,
        pendingAction,
        accessToken: null,
      }}
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
