'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useResetPassword } from '@/features/auth/hooks/useResetPassword'
import { extractAuthErrorMessage } from '@/lib/api/error'
import { validateRegisterPassword } from '@/lib/validation'

export function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const { mutate: resetPassword, isPending, error: mutationError, isSuccess } = useResetPassword()

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<{ newPassword?: string; confirmPassword?: string }>({})

  if (!token) {
    return (
      <div className="flex flex-col gap-5 text-center">
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 px-4 py-3">
          Invalid or missing reset link.
        </p>
        <Link
          href="/forgot-password"
          className="text-sm text-charcoal font-medium hover:text-accent transition-colors underline underline-offset-2"
        >
          Request a new reset link
        </Link>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-5 text-center">
        <p className="text-sm text-charcoal bg-surface border border-border px-4 py-3">
          Your password has been reset successfully.
        </p>
        <Link
          href="/login"
          className="text-sm text-charcoal font-medium hover:text-accent transition-colors underline underline-offset-2"
        >
          Continue to Sign In
        </Link>
      </div>
    )
  }

  function validate() {
    const next: typeof fieldErrors = {}
    const passErr = validateRegisterPassword(newPassword)
    if (passErr) next.newPassword = passErr
    if (!next.newPassword && confirmPassword !== newPassword) {
      next.confirmPassword = 'Passwords do not match'
    }
    setFieldErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    resetPassword({ token: token as string, newPassword })
  }

  const formError = mutationError ? extractAuthErrorMessage(mutationError) : null

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {formError && (
        <p className="text-sm text-red-500 text-center bg-red-50 border border-red-200 px-4 py-2.5">
          {formError}
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium uppercase tracking-[0.1em] text-charcoal/70">
          New Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
            className={`w-full px-4 py-2.5 pr-10 bg-white border rounded text-sm text-charcoal placeholder:text-muted focus:outline-none focus:border-charcoal transition-colors ${
              fieldErrors.newPassword ? 'border-red-400 focus:border-red-400' : 'border-border'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-charcoal transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {fieldErrors.newPassword ? (
          <p className="text-xs text-red-500">{fieldErrors.newPassword}</p>
        ) : (
          <p className="text-xs text-muted">Minimum 8 characters with letters and numbers.</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium uppercase tracking-[0.1em] text-charcoal/70">
          Confirm Password
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
          className={`w-full px-4 py-2.5 bg-white border rounded text-sm text-charcoal placeholder:text-muted focus:outline-none focus:border-charcoal transition-colors ${
            fieldErrors.confirmPassword ? 'border-red-400 focus:border-red-400' : 'border-border'
          }`}
        />
        {fieldErrors.confirmPassword && (
          <p className="text-xs text-red-500">{fieldErrors.confirmPassword}</p>
        )}
      </div>

      <Button type="submit" variant="primary" fullWidth isLoading={isPending}>
        {isPending ? 'RESETTING...' : 'RESET PASSWORD'}
      </Button>
    </form>
  )
}
