'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import type { ProductCardData } from '@/types/product'

type ProductCardProps = ProductCardData & {
  className?: string
}

export function ProductCard({ id, slug, name, price, image, subtitle, isNew, className }: ProductCardProps) {
  const [wished, setWished] = useState(false)

  return (
    <article className={cn('group', className)}>
      <div className="relative overflow-hidden rounded-xl bg-surface aspect-[3/4]">
        <Link href={`/products/${slug}`} aria-label={name}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {isNew && (
          <div className="absolute top-3 left-3">
            <Badge label="New" variant="new" />
          </div>
        )}

        <button
          onClick={() => setWished((w) => !w)}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={wished}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
        >
          <Heart
            size={14}
            className={wished ? 'fill-accent stroke-accent' : 'stroke-charcoal'}
          />
        </button>
      </div>

      <div className="mt-3 space-y-0.5">
        <Link
          href={`/products/${slug}`}
          className="block text-sm font-medium text-charcoal hover:text-accent transition-colors"
        >
          {name}
        </Link>
        {subtitle && <p className="text-xs text-muted">{subtitle}</p>}
        <p className="text-sm text-muted">{price}</p>
      </div>
    </article>
  )
}
