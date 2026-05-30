import { Suspense } from 'react'
import { LoginContent } from './LoginContent'

export const metadata = { title: 'Log In | Nordic Hearth' }

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4 py-16">
      <Suspense fallback={<div className="w-full max-w-md h-96 bg-white border border-border animate-pulse" />}>
        <LoginContent />
      </Suspense>
    </div>
  )
}
