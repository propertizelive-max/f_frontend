'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import apiClient from '@/lib/api/axios'

type FormState = {
  fullName: string
  email: string
  phone: string
  subject: string
  message: string
}

type FieldError = Partial<Record<keyof FormState, string>>

const SUBJECTS = [
  'Order Enquiry',
  'Product Information',
  'Delivery & Shipping',
  'Returns & Refunds',
  'General Question',
  'Other',
]

function validate(data: FormState): FieldError {
  const errors: FieldError = {}
  if (!data.fullName.trim()) errors.fullName = 'Full name is required.'
  if (!data.email.trim()) {
    errors.email = 'Email address is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!data.subject) errors.subject = 'Please select a subject.'
  if (!data.message.trim()) errors.message = 'Message cannot be empty.'
  else if (data.message.trim().length < 20) errors.message = 'Message must be at least 20 characters.'
  return errors
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FieldError>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const fieldErrors = validate(form)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }
    setLoading(true)
    try {
      await apiClient.post('/contact', {
        fullName: form.fullName,
        email: form.email,
        phoneNumber: form.phone || undefined,
        subject: form.subject,
        message: form.message,
      })
      setSubmitted(true)
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Something went wrong. Please try again.'
      setErrors({ message: msg })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="py-16 text-center">
        <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C17A3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-medium text-charcoal mb-3">
          Message Received
        </h3>
        <p className="text-sm text-muted max-w-sm mx-auto leading-relaxed">
          Thank you for reaching out. A member of our team will respond within 1–2 business days.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Full Name"
          placeholder="Jane Smith"
          value={form.fullName}
          onChange={(e) => set('fullName', e.target.value)}
          error={errors.fullName}
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="jane@example.com"
          value={form.email}
          onChange={(e) => set('email', e.target.value)}
          error={errors.email}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Phone Number (optional)"
          type="tel"
          placeholder="+44 7700 900000"
          value={form.phone}
          onChange={(e) => set('phone', e.target.value)}
        />

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="subject"
            className="text-xs font-medium uppercase tracking-[0.1em] text-charcoal/70"
          >
            Subject
          </label>
          <select
            id="subject"
            value={form.subject}
            onChange={(e) => set('subject', e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-border rounded text-sm text-charcoal focus:outline-none focus:border-charcoal transition-colors appearance-none cursor-pointer"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B6560' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
          >
            <option value="" disabled>Select a subject…</option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.subject && <p className="text-xs text-red-500">{errors.subject}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="message"
          className="text-xs font-medium uppercase tracking-[0.1em] text-charcoal/70"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us how we can help you…"
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
          className={`w-full px-4 py-2.5 bg-white border rounded text-sm text-charcoal placeholder:text-muted focus:outline-none focus:border-charcoal transition-colors resize-none ${errors.message ? 'border-red-400 focus:border-red-400' : 'border-border'}`}
        />
        {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
      </div>

      <Button type="submit" variant="primary" size="lg" isLoading={loading}>
        Send Message
      </Button>
    </form>
  )
}
