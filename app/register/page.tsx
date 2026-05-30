'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { RegisterForm } from '@/components/auth/RegisterForm'

export default function RegisterPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || isAuthenticated) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">Create an Account</h1>
          <p className="text-sm text-muted">Start your journey with us.</p>
        </div>
        <div className="bg-white border border-border p-8 md:p-10">
          <RegisterForm mode="page" onSuccess={() => router.replace('/')} />
        </div>
      </div>
    </div>
  )
}
