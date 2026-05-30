'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, ShieldCheck, Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/context/CartContext'
import { useCheckout } from '@/context/CheckoutContext'
import { useAuth } from '@/context/AuthContext'
import { placeOrder } from '@/services/orderService'
import { toast } from '@/hooks/useToast'
import { formatPrice, cn } from '@/lib/utils'

const PURCHASE_REASONS = [
  'New Home',
  'Home Upgrade',
  'Office/Hotel',
  'Wedding/Gifting',
  'Other',
] as const

export function OrderConfirmation() {
  const router = useRouter()
  const { items, mrp, discount, coupon, couponDiscount, deliveryCharge, total, clearCart } = useCart()
  const { formData, goToStep, setOrderId, resetCheckout } = useCheckout()

  const [serviceLift, setServiceLift] = useState<'available' | 'unavailable' | null>(null)
  const [purchaseReason, setPurchaseReason] = useState<string>('')
  const [loading, setLoading] = useState(false)

  async function handlePlaceOrder() {
    if (!formData.fullName) {
      goToStep('address')
      return
    }

    const shippingAddress = [formData.streetAddress, formData.apartment]
      .filter(Boolean)
      .join(', ')

    setLoading(true)
    const result = await placeOrder({
      fullName: formData.fullName!,
      shippingAddress,
      city: formData.city!,
      state: formData.state!,
      zipCode: formData.zipCode!,
      phoneNumber: formData.phoneNumber!,
      paymentMethod: 'COD',
    })
    setLoading(false)

    if (!result.ok) {
      toast(result.error, 'error')
      return
    }

    const orderId = result.data.orderId
    setOrderId(orderId)
    clearCart()
    resetCheckout()
    router.push(`/order-success?orderId=${orderId}`)
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-medium text-charcoal mb-1">
          Confirm Your Selection
        </h1>
        <p className="text-sm text-muted">Review your shipping and item details before finalisation.</p>
      </div>

      {/* Shipping Address */}
      <section className="border border-border bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-charcoal">
            <MapPin size={14} className="text-accent" />
            Shipping Address
          </h2>
          <button
            onClick={() => goToStep('address')}
            className="flex items-center gap-1.5 text-xs text-accent hover:text-accent-dark transition-colors uppercase tracking-wider"
          >
            <Edit2 size={12} />
            Edit
          </button>
        </div>
        <div className="text-sm text-charcoal space-y-0.5">
          <p className="font-medium">{formData.fullName}</p>
          <p>{formData.streetAddress}{formData.apartment ? `, ${formData.apartment}` : ''}</p>
          <p>{formData.city}, {formData.state}</p>
          <p>{formData.zipCode}</p>
          <p>+91 {formData.phoneNumber}</p>
        </div>
      </section>

      {/* Service Lift */}
      <section className="border border-border bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-charcoal mb-2">
          Service Lift Availability
        </h2>
        <p className="text-xs text-muted mb-4">
          Does your building have a service lift for large furniture delivery?
        </p>
        <div className="grid grid-cols-2 gap-3">
          {(['available', 'unavailable'] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => setServiceLift(opt)}
              className={cn(
                'py-2.5 text-sm border capitalize transition-colors',
                serviceLift === opt
                  ? 'bg-charcoal text-cream border-charcoal'
                  : 'bg-white text-charcoal border-border hover:border-charcoal'
              )}
            >
              {opt === 'available' ? 'Available' : 'Unavailable'}
            </button>
          ))}
        </div>
      </section>

      {/* Purchase reason */}
      <section className="border border-border bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-charcoal mb-4">
          Why are you buying this?
        </h2>
        <div className="flex flex-wrap gap-2">
          {PURCHASE_REASONS.map((reason) => (
            <button
              key={reason}
              onClick={() => setPurchaseReason(reason)}
              className={cn(
                'px-4 py-1.5 text-xs border transition-colors',
                purchaseReason === reason
                  ? 'bg-charcoal text-cream border-charcoal'
                  : 'bg-white text-charcoal border-border hover:border-charcoal'
              )}
            >
              {reason}
            </button>
          ))}
        </div>

        {formData.buyingFor === 'business' && formData.gstin && (
          <div className="mt-4 text-xs text-muted">
            GSTIN: <span className="text-charcoal font-medium">{formData.gstin}</span>
          </div>
        )}
      </section>

      {/* Order summary */}
      <section className="border border-border bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-charcoal">
            Order Summary
          </h2>
          <button
            onClick={() => goToStep('cart')}
            className="flex items-center gap-1.5 text-xs text-accent hover:text-accent-dark transition-colors uppercase tracking-wider"
          >
            <Edit2 size={12} />
            Edit
          </button>
        </div>

        <div className="space-y-3 mb-4">
          {items.map((item) => (
            <div key={item.productId} className="flex justify-between text-sm">
              <span className="text-charcoal/80 truncate pr-4">
                {item.name} × {item.quantity}
              </span>
              <span className="text-charcoal font-medium shrink-0">
                {formatPrice(item.price * item.quantity, 'INR')}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-charcoal/70">MRP</span>
            <span>{formatPrice(mrp, 'INR')}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between">
              <span className="text-charcoal/70">Discount</span>
              <span className="text-green-600">− {formatPrice(discount, 'INR')}</span>
            </div>
          )}
          {coupon && couponDiscount > 0 && (
            <div className="flex justify-between">
              <span className="text-charcoal/70">Coupon ({coupon.code})</span>
              <span className="text-green-600">− {formatPrice(couponDiscount, 'INR')}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-charcoal/70">Shipping</span>
            <span className={deliveryCharge === 0 ? 'text-green-600 font-medium' : ''}>
              {deliveryCharge === 0 ? 'Free' : formatPrice(deliveryCharge, 'INR')}
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-border font-medium text-base">
            <span className="text-charcoal">Total Payable</span>
            <span className="text-charcoal">{formatPrice(total, 'INR')}</span>
          </div>
        </div>
      </section>

      {/* Payment method */}
      <section className="border border-border bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-charcoal mb-4">
          Payment Method
        </h2>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="radio" checked readOnly className="accent-accent" />
          <span className="text-sm text-charcoal">Cash on Delivery (COD)</span>
        </label>
      </section>

      <Button
        variant="accent"
        size="lg"
        fullWidth
        isLoading={loading}
        onClick={handlePlaceOrder}
      >
        Place Order
      </Button>

      <p className="text-[10px] text-center text-muted">
        By confirming, you agree to our{' '}
        <span className="underline cursor-pointer">Terms of Service</span>.
      </p>

      <div className="flex items-center justify-center gap-2 text-xs text-muted">
        <ShieldCheck size={14} className="text-accent" />
        <span>Secure Checkout — Your payment information is protected with industry-standard SSL/TLS.</span>
      </div>
    </div>
  )
}
