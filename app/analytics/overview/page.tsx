import { Suspense } from 'react'
import { AuthCallbackRedirect } from './AuthCallbackRedirect'

export const metadata = { title: 'Signing In | Nordic Hearth' }

export default function AnalyticsOverviewPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <Suspense fallback={<p className="text-sm text-muted">Signing you in…</p>}>
        <AuthCallbackRedirect />
      </Suspense>
    </div>
  )
}
