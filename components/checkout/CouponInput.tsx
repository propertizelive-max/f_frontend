'use client'

import { useState } from 'react'
import { Tag, X, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { cn } from '@/lib/utils'

const DEMO_COUPONS: Record<string, number> = {
  NORDIC10: 500,
  HEARTH20: 1000,
  SUMMER26: 2000,
}

export function CouponInput() {
  const { isAuthenticated, openAuthModal } = useAuth()
  const { coupon, applyCoupon, removeCoupon } = useCart()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)

  function handleApply() {
    const trimmed = code.trim().toUpperCase()
    if (!trimmed) {
      setError('Enter a coupon code')
      return
    }
    const discount = DEMO_COUPONS[trimmed]
    if (!discount) {
      setError('Invalid or expired coupon code')
      return
    }
    applyCoupon(trimmed, discount)
    setCode('')
    setError('')
    setOpen(false)
  }

  if (!isAuthenticated) {
    return (
      <button
        onClick={() => openAuthModal()}
        className="w-full flex items-center justify-between px-4 py-3 bg-accent/8 border border-accent/25 rounded text-sm text-charcoal hover:bg-accent/12 transition-colors"
      >
        <span className="flex items-center gap-2">
          <Tag size={14} className="text-accent" />
          <span>
            <span className="font-semibold text-accent">LOGIN</span> to unlock coupons!
          </span>
        </span>
        <ChevronRight size={14} className="text-accent" />
      </button>
    )
  }

  if (coupon) {
    return (
      <div className="flex items-center justify-between px-4 py-3 bg-green-50 border border-green-200 rounded text-sm">
        <span className="flex items-center gap-2 text-green-800">
          <Tag size={14} />
          <span>
            Coupon Applied: <strong>{coupon.code}</strong>
          </span>
        </span>
        <button
          onClick={removeCoupon}
          className="text-xs uppercase tracking-wider text-charcoal border border-border px-2 py-1 hover:bg-surface transition-colors"
        >
          Remove
        </button>
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 text-sm text-accent hover:text-accent-dark transition-colors"
      >
        <Tag size={14} />
        <span>Apply Coupon</span>
      </button>

      {open && (
        <div className="mt-3 flex gap-2">
          <div className="flex-1">
            <input
              type="text"
              value={code}
              onChange={(e) => { setCode(e.target.value); setError('') }}
              onKeyDown={(e) => e.key === 'Enter' && handleApply()}
              placeholder="Enter coupon code"
              className={cn(
                'w-full px-3 py-2 border text-sm text-charcoal placeholder:text-muted focus:outline-none focus:border-charcoal transition-colors uppercase',
                error ? 'border-red-400' : 'border-border'
              )}
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>
          <Button variant="outline" size="sm" onClick={handleApply}>
            Apply
          </Button>
          <button onClick={() => { setOpen(false); setError('') }} className="text-muted hover:text-charcoal">
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
