'use client'

import { cn } from '@/lib/utils'
import type { ApiCategory } from '@/types/api'

interface CategoriesGridProps {
  categories: ApiCategory[]
  selectedCategoryId: string | null
  onCategorySelect: (categoryId: string | null) => void
}

export function CategoriesGrid({
  categories,
  selectedCategoryId,
  onCategorySelect,
}: CategoriesGridProps) {
  const allSelected = selectedCategoryId === null

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6">
      {/* All option */}
      <button
        onClick={() => onCategorySelect(null)}
        className="group cursor-pointer text-left"
      >
        <div
          className={cn(
            'overflow-hidden rounded-xl bg-surface aspect-square flex items-center justify-center transition-all duration-300',
            allSelected ? 'ring-2 ring-charcoal' : 'hover:ring-1 hover:ring-charcoal/40'
          )}
        >
          <span className="font-display text-lg font-medium text-charcoal">All</span>
        </div>
        <p
          className={cn(
            'mt-2.5 text-center text-[10px] uppercase tracking-[0.2em] font-medium transition-colors',
            allSelected ? 'text-accent' : 'text-charcoal group-hover:text-accent'
          )}
        >
          All
        </p>
      </button>

      {categories.map((cat) => {
        const isSelected = cat.id === selectedCategoryId
        const imageUrl = cat.imageUrl ?? `https://picsum.photos/seed/cat-${cat.slug}/500/500`

        return (
          <button
            key={cat.id}
            onClick={() => onCategorySelect(cat.id)}
            className="group cursor-pointer text-left"
          >
            <div
              className={cn(
                'overflow-hidden rounded-xl bg-surface aspect-square transition-all duration-300',
                isSelected ? 'ring-2 ring-charcoal' : 'hover:ring-1 hover:ring-charcoal/40'
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p
              className={cn(
                'mt-2.5 text-center text-[10px] uppercase tracking-[0.2em] font-medium transition-colors',
                isSelected ? 'text-accent' : 'text-charcoal group-hover:text-accent'
              )}
            >
              {cat.name}
            </p>
          </button>
        )
      })}
    </div>
  )
}
