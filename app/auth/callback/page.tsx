import { Suspense } from 'react'
import { CallbackHandler } from './CallbackHandler'

export const metadata = { title: 'Signing In | Nordic Hearth' }

export default function AuthCallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <Suspense fallback={<p className="text-sm text-muted">Signing you in…</p>}>
        <CallbackHandler />
      </Suspense>
    </div>
  )
}
