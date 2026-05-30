'use client'

import Link from 'next/link'
import { MapPin, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useCheckout } from '@/context/CheckoutContext'
import { Button } from '@/components/ui/Button'
import { CartItemRow } from './CartItemRow'
import { CouponInput } from './CouponInput'

export function CartReview() {
  const { items, count } = useCart()
  const { goToStep } = useCheckout()

  const hasOutOfStock = false

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag size={48} className="mx-auto text-border mb-4" />
        <h2 className="font-display text-xl text-charcoal mb-2">Your cart is empty</h2>
        <p className="text-sm text-muted mb-6">Add some beautiful pieces to get started.</p>
        <Link href="/products">
          <Button variant="accent">Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-medium text-charcoal">
          My Cart{' '}
          <span className="text-muted font-sans text-lg font-normal">({count})</span>
        </h1>
        <span className="flex items-center gap-1.5 text-xs text-muted">
          <MapPin size={13} className="text-accent" />
          Deliver to: <strong className="text-charcoal">400075, Mumbai</strong>
        </span>
      </div>

      <div className="border border-border bg-white px-5">
        {items.map((item) => (
          <CartItemRow key={item.productId} item={item} />
        ))}
      </div>

      <div className="mt-4 border border-border bg-white px-5 py-4">
        <CouponInput />
      </div>

      <div className="mt-6">
        <Button
          variant="accent"
          size="lg"
          fullWidth
          disabled={hasOutOfStock}
          onClick={() => goToStep('address')}
        >
          Continue to Address
        </Button>
        {hasOutOfStock && (
          <p className="text-xs text-red-500 text-center mt-2">
            Remove out-of-stock items before proceeding.
          </p>
        )}
      </div>
    </div>
  )
}
