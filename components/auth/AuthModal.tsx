'use client'

import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'

export function AuthModal() {
  const { isModalOpen, closeAuthModal, pendingAction } = useAuth()
  const [tab, setTab] = useState<'login' | 'register'>('login')
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isModalOpen) return
    setTab('login')

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeAuthModal()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isModalOpen, closeAuthModal])

  if (!isModalOpen) return null

  function handleSuccess() {
    closeAuthModal()
    if (pendingAction) pendingAction()
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) closeAuthModal()
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      aria-modal="true"
      role="dialog"
      aria-label={tab === 'login' ? 'Sign in' : 'Create account'}
    >
      <div className="relative w-full max-w-md bg-white border border-border shadow-2xl p-8 md:p-10 max-h-[90vh] overflow-y-auto">
        <button
          onClick={closeAuthModal}
          aria-label="Close"
          className="absolute top-4 right-4 text-muted hover:text-charcoal transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex border-b border-border mb-8">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 pb-3 text-xs uppercase tracking-[0.15em] font-medium transition-colors ${
              tab === 'login'
                ? 'text-charcoal border-b-2 border-charcoal -mb-px'
                : 'text-muted hover:text-charcoal'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 pb-3 text-xs uppercase tracking-[0.15em] font-medium transition-colors ${
              tab === 'register'
                ? 'text-charcoal border-b-2 border-charcoal -mb-px'
                : 'text-muted hover:text-charcoal'
            }`}
          >
            Create Account
          </button>
        </div>

        {tab === 'login' ? (
          <LoginForm
            mode="modal"
            onSuccess={handleSuccess}
            onSwitchToRegister={() => setTab('register')}
          />
        ) : (
          <RegisterForm
            mode="modal"
            onSuccess={handleSuccess}
            onSwitchToLogin={() => setTab('login')}
          />
        )}
      </div>
    </div>
  )
}
