import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm'

export const metadata = { title: 'Forgot Password | Nordic Hearth' }

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">Forgot Password</h1>
          <p className="text-sm text-muted">We&apos;ll help you get back into your account.</p>
        </div>
        <div className="bg-white border border-border p-8 md:p-10">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  )
}
