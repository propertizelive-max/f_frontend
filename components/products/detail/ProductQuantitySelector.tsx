'use client'

import { cn } from '@/lib/utils'

type ProductQuantitySelectorProps = {
  value: number
  max: number
  onChange: (n: number) => void
}

export default function ProductQuantitySelector({
  value,
  max,
  onChange,
}: ProductQuantitySelectorProps) {
  return (
    <div className="space-y-2.5">
      <span className="text-[10px] uppercase tracking-[0.15em] text-muted">Quantity</span>
      <div className="inline-flex items-center border border-border rounded-sm">
        <button
          onClick={() => onChange(Math.max(1, value - 1))}
          disabled={value <= 1}
          aria-label="Decrease quantity"
          className={cn(
            'px-3 py-2 text-charcoal hover:bg-surface transition-colors text-sm leading-none select-none',
            value <= 1 && 'opacity-30 cursor-not-allowed',
          )}
        >
          −
        </button>
        <span className="w-10 text-center text-sm text-charcoal border-x border-border py-2 select-none">
          {value}
        </span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label="Increase quantity"
          className={cn(
            'px-3 py-2 text-charcoal hover:bg-surface transition-colors text-sm leading-none select-none',
            value >= max && 'opacity-30 cursor-not-allowed',
          )}
        >
          +
        </button>
      </div>
    </div>
  )
}
