'use client'

import { useGoogleCallback } from '@/features/auth/hooks/useGoogleCallback'
import { Loader } from '@/components/ui/Loader'

export function CallbackHandler() {
  useGoogleCallback()
  return (
    <div className="flex flex-col items-center gap-4">
      <Loader size="lg" />
      <p className="text-sm text-muted">Completing sign-in…</p>
    </div>
  )
}
