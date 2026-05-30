'use client'

import Image from 'next/image'
import { Trash2, Heart, Minus, Plus } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import type { CartItem } from '@/types/cart'
import { Badge } from '@/components/ui/Badge'

type Props = { item: CartItem }

export function CartItemRow({ item }: Props) {
  const { updateQty, removeItem } = useCart()

  const discountPct = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : item.discountPercent ?? 0

  return (
    <div className="flex gap-4 py-5 border-b border-border last:border-0">
      <div className="relative w-24 h-24 shrink-0 bg-surface overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm font-medium text-charcoal leading-snug">{item.name}</h3>
            {item.color && (
              <p className="text-[10px] uppercase tracking-[0.12em] text-muted mt-1">
                {item.color}
                {item.variant ? ` · ${item.variant}` : ''}
              </p>
            )}
          </div>

          <div className="text-right shrink-0">
            <p className="text-sm font-semibold text-charcoal">
              {formatPrice(item.price, 'INR')}
            </p>
            {item.originalPrice && item.originalPrice > item.price && (
              <p className="text-[11px] text-muted line-through">
                {formatPrice(item.originalPrice, 'INR')}
              </p>
            )}
            {discountPct > 0 && (
              <Badge label={`${discountPct}% OFF`} variant="sale" className="mt-0.5" />
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-0">
            <button
              onClick={() => updateQty(item.productId, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center border border-border hover:border-charcoal text-charcoal transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={12} />
            </button>
            <span className="w-10 h-8 flex items-center justify-center border-y border-border text-sm font-medium text-charcoal">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQty(item.productId, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center border border-border hover:border-charcoal text-charcoal transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={12} />
            </button>
            <p className="ml-3 text-[10px] text-accent uppercase tracking-wider">Limited-Time Deal</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {}}
              className="flex items-center gap-1.5 text-[11px] text-muted hover:text-charcoal transition-colors"
              aria-label="Save for later"
            >
              <Heart size={13} />
              Save For Later
            </button>
            <button
              onClick={() => removeItem(item.productId)}
              className="flex items-center gap-1.5 text-[11px] text-red-500 hover:text-red-700 transition-colors"
              aria-label="Remove item"
            >
              <Trash2 size={13} />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
