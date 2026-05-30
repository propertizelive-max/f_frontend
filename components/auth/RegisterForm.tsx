'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/context/AuthContext'
import { registerUser } from '@/services/authService'
import { validateEmail, validateFullName, validateRegisterPassword } from '@/lib/validation'

type RegisterFormProps = {
  mode?: 'page' | 'modal'
  onSuccess?: () => void
  onSwitchToLogin?: () => void
}

export function RegisterForm({ mode = 'page', onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const { login } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    password?: string
    terms?: string
    form?: string
  }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function validate() {
    const next: typeof errors = {}
    const nameErr = validateFullName(name)
    const emailErr = validateEmail(email)
    const passErr = validateRegisterPassword(password)
    if (nameErr) next.name = nameErr
    if (emailErr) next.email = emailErr
    if (passErr) next.password = passErr
    if (!termsAccepted) next.terms = 'You must accept the Terms of Service to continue'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    setErrors({})
    try {
      const res = await registerUser({ name, email, password })
      login(res.user, res.accessToken)
      onSuccess?.()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      const mapped =
        msg.toLowerCase().includes('exists') || msg.toLowerCase().includes('already')
          ? 'Account already exists'
          : msg
      setErrors({ form: mapped })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <button
        type="button"
        disabled
        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-border text-sm text-charcoal/60 cursor-not-allowed"
        title="Google sign up coming soon"
      >
        <GoogleIcon />
        Sign Up with Google
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted uppercase tracking-widest">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {errors.form && (
        <p className="text-sm text-red-500 text-center bg-red-50 border border-red-200 px-4 py-2.5">
          {errors.form}
        </p>
      )}

      <Input
        label="Full Name"
        type="text"
        placeholder="John Doe"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
        autoComplete="name"
      />

      <Input
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        autoComplete="email"
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium uppercase tracking-[0.1em] text-charcoal/70">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            className={`w-full px-4 py-2.5 pr-10 bg-white border rounded text-sm text-charcoal placeholder:text-muted focus:outline-none focus:border-charcoal transition-colors ${
              errors.password ? 'border-red-400 focus:border-red-400' : 'border-border'
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
        {errors.password ? (
          <p className="text-xs text-red-500">{errors.password}</p>
        ) : (
          <p className="text-xs text-muted">Minimum 8 characters with letters and numbers.</p>
        )}
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-charcoal shrink-0"
        />
        <span className="text-sm text-muted leading-relaxed">
          I agree to{' '}
          <Link href="/terms" className="text-charcoal underline underline-offset-2 hover:text-accent transition-colors">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-charcoal underline underline-offset-2 hover:text-accent transition-colors">
            Privacy Policy
          </Link>
        </span>
      </label>
      {errors.terms && <p className="text-xs text-red-500 -mt-3">{errors.terms}</p>}

      <Button type="submit" variant="primary" fullWidth isLoading={isSubmitting}>
        {isSubmitting ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
      </Button>

      <p className="text-center text-sm text-muted">
        Already have an account?{' '}
        {mode === 'modal' && onSwitchToLogin ? (
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-charcoal font-medium hover:text-accent transition-colors underline underline-offset-2"
          >
            Sign In
          </button>
        ) : (
          <Link
            href="/login"
            className="text-charcoal font-medium hover:text-accent transition-colors underline underline-offset-2"
          >
            Sign In
          </Link>
        )}
      </p>
    </form>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}
