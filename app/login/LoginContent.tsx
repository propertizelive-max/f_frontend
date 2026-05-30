'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { LoginForm } from '@/components/auth/LoginForm'

export function LoginContent() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') ?? '/'

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(redirect)
    }
  }, [isAuthenticated, isLoading, redirect, router])

  if (isLoading || isAuthenticated) return null

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">Log In</h1>
        <p className="text-sm text-muted">Access your account and orders.</p>
      </div>
      <div className="bg-white border border-border p-8 md:p-10">
        <LoginForm mode="page" onSuccess={() => router.replace(redirect)} />
      </div>
    </div>
  )
}
