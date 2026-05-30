'use client'

import { cn } from '@/lib/utils'
import type { ProductVariantOption } from '@/types/product'

type ProductVariantSelectorProps = {
  variants: ProductVariantOption[]
  selected: string
  onChange: (id: string) => void
}

export default function ProductVariantSelector({
  variants,
  selected,
  onChange,
}: ProductVariantSelectorProps) {
  if (variants.length === 0) return null

  return (
    <div className="space-y-2.5">
      <span className="text-[10px] uppercase tracking-[0.15em] text-muted">Size</span>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const outOfStock = variant.stock === 0
          return (
            <button
              key={variant.id}
              onClick={() => !outOfStock && onChange(variant.id)}
              disabled={outOfStock}
              aria-pressed={selected === variant.id}
              aria-label={`Select size ${variant.label}${outOfStock ? ' — out of stock' : ''}`}
              className={cn(
                'px-4 py-1.5 text-xs border rounded-sm transition-all duration-150',
                selected === variant.id
                  ? 'bg-charcoal text-cream border-charcoal'
                  : 'bg-transparent text-charcoal border-border hover:border-charcoal',
                outOfStock && 'opacity-40 cursor-not-allowed line-through',
              )}
            >
              {variant.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
