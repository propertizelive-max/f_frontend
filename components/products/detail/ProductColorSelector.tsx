'use client'

import { cn } from '@/lib/utils'
import type { ProductColor } from '@/types/product'

type ProductColorSelectorProps = {
  colors: ProductColor[]
  selected: string
  onChange: (id: string) => void
}

export default function ProductColorSelector({
  colors,
  selected,
  onChange,
}: ProductColorSelectorProps) {
  if (colors.length === 0) return null

  const selectedColor = colors.find((c) => c.id === selected)

  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.15em] text-muted">Colour</span>
        {selectedColor && (
          <span className="text-[11px] text-charcoal">{selectedColor.name}</span>
        )}
      </div>
      <div className="flex flex-wrap gap-2.5">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => onChange(color.id)}
            title={color.name}
            aria-label={`Select colour ${color.name}`}
            aria-pressed={selected === color.id}
            className={cn(
              'w-7 h-7 rounded-full border-2 transition-all duration-200',
              selected === color.id
                ? 'border-charcoal scale-110'
                : 'border-transparent hover:border-muted hover:scale-105',
            )}
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
    </div>
  )
}
