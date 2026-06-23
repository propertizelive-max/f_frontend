import { Suspense } from 'react'
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm'

export const metadata = { title: 'Reset Password | Nordic Hearth' }

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">Reset Password</h1>
          <p className="text-sm text-muted">Choose a new password for your account.</p>
        </div>
        <div className="bg-white border border-border p-8 md:p-10">
          <Suspense fallback={<div className="h-64 animate-pulse" />}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
