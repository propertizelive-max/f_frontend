'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useRegister } from '@/features/auth/hooks/useRegister'
import { GoogleLoginButton } from '@/features/auth/components/GoogleLoginButton'
import { extractApiErrorMessage } from '@/lib/api/error'
import { validateEmail, validateFullName, validateRegisterPassword } from '@/lib/validation'

type RegisterFormProps = {
  mode?: 'page' | 'modal'
  onSuccess?: () => void
  onSwitchToLogin?: () => void
}

export function RegisterForm({ mode = 'page', onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const router = useRouter()
  const { mutate: register, isPending, error: mutationError } = useRegister()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string
    email?: string
    password?: string
    terms?: string
  }>({})

  function validate() {
    const next: typeof fieldErrors = {}
    const nameErr = validateFullName(name)
    const emailErr = validateEmail(email)
    const passErr = validateRegisterPassword(password)
    if (nameErr) next.name = nameErr
    if (emailErr) next.email = emailErr
    if (passErr) next.password = passErr
    if (!termsAccepted) next.terms = 'You must accept the Terms of Service to continue'
    setFieldErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    register(
      { name, email, password, role: 'USER' },
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

  const formError = mutationError ? extractApiErrorMessage(mutationError) : null

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <GoogleLoginButton label="Sign Up with Google" />

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
        label="Full Name"
        type="text"
        placeholder="John Doe"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={fieldErrors.name}
        autoComplete="name"
      />

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
        {fieldErrors.password ? (
          <p className="text-xs text-red-500">{fieldErrors.password}</p>
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
      {fieldErrors.terms && <p className="text-xs text-red-500 -mt-3">{fieldErrors.terms}</p>}

      <Button type="submit" variant="primary" fullWidth isLoading={isPending}>
        {isPending ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
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
