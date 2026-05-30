'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useCheckout } from '@/context/CheckoutContext'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import type { CheckoutFormData } from '@/types/checkout'
import { cn } from '@/lib/utils'

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
]

type FormErrors = Partial<Record<keyof CheckoutFormData, string>>

function validate(data: Partial<CheckoutFormData>): FormErrors {
  const errors: FormErrors = {}
  if (!data.fullName || data.fullName.trim().length < 3)
    errors.fullName = 'Full name must be at least 3 characters'
  if (!data.streetAddress || !data.streetAddress.trim())
    errors.streetAddress = 'Street address is required'
  if (!data.city || !data.city.trim())
    errors.city = 'City is required'
  if (!data.state || !data.state.trim())
    errors.state = 'State is required'
  if (!data.zipCode || !/^\d{6}$/.test(data.zipCode.trim()))
    errors.zipCode = 'Enter a valid 6-digit zip code'
  if (!data.phoneNumber || !/^\d{10}$/.test(data.phoneNumber.trim()))
    errors.phoneNumber = 'Enter a valid 10-digit phone number'
  return errors
}

export function AddressForm() {
  const { formData, saveFormData, goToStep } = useCheckout()
  const { items, total } = useCart()

  const [form, setForm] = useState<Partial<CheckoutFormData>>({
    buyingFor: 'personal',
    ...formData,
  })
  const [errors, setErrors] = useState<FormErrors>({})

  function set<K extends keyof CheckoutFormData>(key: K, value: CheckoutFormData[K]) {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    saveFormData(form as CheckoutFormData)
    goToStep('confirmation')
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-charcoal mb-1">
        Delivery &amp; Billing Address
      </h1>
      <p className="text-sm text-muted mb-6">All fields marked * are required.</p>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <Input
          label="Full Name *"
          placeholder="Enter your full name"
          value={form.fullName ?? ''}
          onChange={(e) => set('fullName', e.target.value)}
          error={errors.fullName}
          autoComplete="name"
        />

        <div className="space-y-3">
          <Input
            label="Street Address *"
            placeholder="House number and street name"
            value={form.streetAddress ?? ''}
            onChange={(e) => set('streetAddress', e.target.value)}
            error={errors.streetAddress}
            autoComplete="address-line1"
          />
          <Input
            placeholder="Apartment, suite, unit, etc. (optional)"
            value={form.apartment ?? ''}
            onChange={(e) => set('apartment', e.target.value)}
            autoComplete="address-line2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="City / Town *"
            placeholder="Enter your city"
            value={form.city ?? ''}
            onChange={(e) => set('city', e.target.value)}
            error={errors.city}
            autoComplete="address-level2"
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium uppercase tracking-[0.1em] text-charcoal/70">
              State *
            </label>
            <select
              value={form.state ?? ''}
              onChange={(e) => set('state', e.target.value)}
              className={cn(
                'w-full px-4 py-2.5 bg-white border border-border text-sm text-charcoal focus:outline-none focus:border-charcoal transition-colors appearance-none',
                errors.state && 'border-red-400'
              )}
            >
              <option value="">Select State</option>
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.state && <p className="text-xs text-red-500">{errors.state}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Zip Code *"
            placeholder="6-digit pin code"
            value={form.zipCode ?? ''}
            onChange={(e) => set('zipCode', e.target.value)}
            error={errors.zipCode}
            maxLength={6}
            inputMode="numeric"
            autoComplete="postal-code"
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium uppercase tracking-[0.1em] text-charcoal/70">
              Phone Number *
            </label>
            <div className="flex">
              <span className="flex items-center px-3 border border-r-0 border-border bg-surface text-sm text-muted shrink-0">
                +91
              </span>
              <input
                type="tel"
                value={form.phoneNumber ?? ''}
                onChange={(e) => set('phoneNumber', e.target.value)}
                placeholder="10-digit mobile"
                maxLength={10}
                inputMode="numeric"
                autoComplete="tel-national"
                className={cn(
                  'flex-1 px-3 py-2.5 bg-white border border-border text-sm text-charcoal placeholder:text-muted focus:outline-none focus:border-charcoal transition-colors',
                  errors.phoneNumber && 'border-red-400'
                )}
              />
            </div>
            {errors.phoneNumber && <p className="text-xs text-red-500">{errors.phoneNumber}</p>}
          </div>
        </div>

        <div className="pt-2">
          <p className="text-xs font-medium uppercase tracking-[0.1em] text-charcoal/70 mb-3">
            Purchase Type
          </p>
          <div className="flex gap-4">
            {(['personal', 'business'] as const).map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-2.5 cursor-pointer text-sm text-charcoal"
              >
                <input
                  type="radio"
                  name="buyingFor"
                  value={opt}
                  checked={form.buyingFor === opt}
                  onChange={() => set('buyingFor', opt)}
                  className="accent-accent"
                />
                {opt === 'personal' ? 'Buying for Personal Use' : 'Buying for Business'}
              </label>
            ))}
          </div>
        </div>

        {form.buyingFor === 'business' && (
          <Input
            label="GSTIN Number (optional)"
            placeholder="e.g. 22AAAAA0000A1Z5"
            value={form.gstin ?? ''}
            onChange={(e) => set('gstin', e.target.value)}
            hint="Required for business tax invoices"
          />
        )}

        <div className="pt-2 border-t border-border space-y-3">
          <Button type="submit" variant="accent" size="lg" fullWidth>
            Continue to Confirmation
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="lg"
            fullWidth
            onClick={() => goToStep('cart')}
          >
            ← Back to Cart
          </Button>
        </div>
      </form>
    </div>
  )
}
