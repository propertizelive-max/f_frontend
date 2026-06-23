'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useLogin } from '@/features/auth/hooks/useLogin'
import { GoogleLoginButton } from '@/features/auth/components/GoogleLoginButton'
import { extractAuthErrorMessage } from '@/lib/api/error'
import { validateEmail, validatePassword } from '@/lib/validation'

type LoginFormProps = {
  mode?: 'page' | 'modal'
  onSuccess?: () => void
  onSwitchToRegister?: () => void
}

export function LoginForm({ mode = 'page', onSuccess, onSwitchToRegister }: LoginFormProps) {
  const router = useRouter()
  const { login, isPending, error: mutationError } = useLogin()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({})

  function validate() {
    const next: typeof fieldErrors = {}
    const emailErr = validateEmail(email)
    const passErr = validatePassword(password)
    if (emailErr) next.email = emailErr
    if (passErr) next.password = passErr
    setFieldErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    login(
      { email, password },
      {
        onSuccess: () => {
          if (onSuccess) {
            onSuccess()
          } else {
            router.replace('/')
          }
        },
      }
    )
  }

  const formError = mutationError ? extractAuthErrorMessage(mutationError) : null

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <GoogleLoginButton label="Continue with Google" />

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted uppercase tracking-widest">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

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
        error={fieldErrors.email}
        autoComplete="email"
      />

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium uppercase tracking-[0.1em] text-charcoal/70">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-xs text-muted hover:text-accent transition-colors underline underline-offset-2"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className={`w-full px-4 py-2.5 pr-10 bg-white border rounded text-sm text-charcoal placeholder:text-muted focus:outline-none focus:border-charcoal transition-colors ${
              fieldErrors.password ? 'border-red-400 focus:border-red-400' : 'border-border'
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
        {fieldErrors.password && <p className="text-xs text-red-500">{fieldErrors.password}</p>}
      </div>

      <Button type="submit" variant="primary" fullWidth isLoading={isPending}>
        {isPending ? 'SIGNING IN...' : 'SIGN IN'}
      </Button>

      <p className="text-center text-sm text-muted">
        New Customer?{' '}
        {mode === 'modal' && onSwitchToRegister ? (
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-charcoal font-medium hover:text-accent transition-colors underline underline-offset-2"
          >
            Create Account
          </button>
        ) : (
          <Link
            href="/register"
            className="text-charcoal font-medium hover:text-accent transition-colors underline underline-offset-2"
          >
            Create Account
          </Link>
        )}
      </p>
    </form>
  )
}
