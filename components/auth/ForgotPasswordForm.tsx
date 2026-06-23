'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useForgotPassword } from '@/features/auth/hooks/useForgotPassword'
import { extractAuthErrorMessage } from '@/lib/api/error'
import { validateEmail } from '@/lib/validation'

const SUCCESS_MESSAGE = 'If that email is registered, a reset link has been sent.'

export function ForgotPasswordForm() {
  const { mutate: forgotPassword, isPending, error: mutationError, isSuccess } = useForgotPassword()

  const [email, setEmail] = useState('')
  const [fieldError, setFieldError] = useState<string | undefined>()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const emailErr = validateEmail(email)
    setFieldError(emailErr ?? undefined)
    if (emailErr) return
    forgotPassword({ email })
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-5 text-center">
        <p className="text-sm text-charcoal bg-surface border border-border px-4 py-3">
          {SUCCESS_MESSAGE}
        </p>
        <Link
          href="/login"
          className="text-sm text-charcoal font-medium hover:text-accent transition-colors underline underline-offset-2"
        >
          Back to Sign In
        </Link>
      </div>
    )
  }

  const formError = mutationError ? extractAuthErrorMessage(mutationError) : null

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <p className="text-sm text-muted text-center">
        Enter your account email and we&apos;ll send you a link to reset your password.
      </p>

      {formError && (
        <p className="text-sm text-red-500 text-center bg-red-50 border border-red-200 px-4 py-2.5">
          {formError}
        </p>
      )}

      <Input
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={fieldError}
        autoComplete="email"
      />

      <Button type="submit" variant="primary" fullWidth isLoading={isPending}>
        {isPending ? 'SENDING...' : 'SEND RESET LINK'}
      </Button>

      <p className="text-center text-sm text-muted">
        Remembered your password?{' '}
        <Link
          href="/login"
          className="text-charcoal font-medium hover:text-accent transition-colors underline underline-offset-2"
        >
          Sign In
        </Link>
      </p>
    </form>
  )
}
