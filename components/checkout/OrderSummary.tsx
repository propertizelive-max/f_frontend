'use client'

import { ShieldCheck, Award } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'

type Props = {
  showItems?: boolean
}

export function OrderSummary({ showItems = false }: Props) {
  const { items, count, mrp, discount, coupon, couponDiscount, deliveryCharge, total, subtotal } = useCart()

  const savings = mrp - total + (deliveryCharge === 0 && subtotal > 0 ? 0 : 0)

  return (
    <div className="bg-white border border-border p-5 sticky top-24">
      {showItems && items.length > 0 && (
        <div className="mb-5 pb-5 border-b border-border space-y-4">
          {items.map((item) => (
            <div key={item.productId} className="flex gap-3">
              <div className="w-14 h-14 shrink-0 bg-surface overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-charcoal leading-snug line-clamp-2">{item.name}</p>
                {item.color && (
                  <p className="text-[10px] text-muted uppercase tracking-wider mt-0.5">
                    {item.color}
                    {item.variant ? ` · ${item.variant}` : ''}
                  </p>
                )}
                <p className="text-[10px] text-muted mt-0.5">QTY: {item.quantity}</p>
              </div>
              <div className="text-xs font-medium text-charcoal shrink-0">
                {formatPrice(item.price * item.quantity, 'INR')}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-[10px] uppercase tracking-[0.15em] text-muted font-medium mb-4">
        Price Detail ({count} {count === 1 ? 'item' : 'items'})
      </p>

      <div className="space-y-2.5 text-sm">
        <div className="flex justify-between">
          <span className="text-charcoal/70">MRP</span>
          <span className="text-charcoal">{formatPrice(mrp, 'INR')}</span>
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
          <span className="text-charcoal/70">Delivery</span>
          <span className={deliveryCharge === 0 ? 'text-green-600 font-medium' : 'text-charcoal'}>
            {deliveryCharge === 0 ? 'Free' : formatPrice(deliveryCharge, 'INR')}
          </span>
        </div>
      </div>

      <div className="border-t border-border mt-4 pt-4 flex justify-between items-baseline">
        <span className="font-display text-base font-medium text-charcoal">Total Payable</span>
        <div className="text-right">
          <span className="font-display text-xl font-semibold text-charcoal">
            {formatPrice(total, 'INR')}
          </span>
          <p className="text-[9px] uppercase tracking-widest text-muted mt-0.5">Inclusive of all taxes</p>
        </div>
      </div>

      {savings > 0 && (
        <p className="mt-3 text-xs text-center text-green-700 bg-green-50 border border-green-100 px-3 py-2">
          Congratulations! You've just saved {formatPrice(savings, 'INR')} on your order.
        </p>
      )}

      <p className="mt-3 text-[10px] text-center text-muted">
        EMI starting from {formatPrice(Math.round(total / 18), 'INR')}/Month
      </p>

      <div className="mt-5 pt-4 border-t border-border flex items-center justify-center gap-6">
        <span className="flex items-center gap-1.5 text-[10px] text-muted uppercase tracking-wider">
          <ShieldCheck size={13} className="text-accent" />
          Secure Payment
        </span>
        <span className="flex items-center gap-1.5 text-[10px] text-muted uppercase tracking-wider">
          <Award size={13} className="text-accent" />
          10 Year Warranty
        </span>
      </div>
    </div>
  )
}
