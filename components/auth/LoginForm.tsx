'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { useLogin } from '@/features/auth/hooks/useLogin'
import { GoogleLoginButton } from '@/features/auth/components/GoogleLoginButton'

type LoginFormProps = {
  mode?: 'page' | 'modal'
  onSuccess?: () => void
  onSwitchToRegister?: () => void
}

export function LoginForm({ mode = 'page', onSwitchToRegister }: LoginFormProps) {
  const { loginWithGoogle } = useLogin()

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-muted text-center">
        Sign in securely with your Google account. No password required.
      </p>

      <Button type="button" variant="primary" fullWidth onClick={loginWithGoogle}>
        SIGN IN WITH GOOGLE
      </Button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted uppercase tracking-widest">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <GoogleLoginButton />

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
    </div>
  )
}
