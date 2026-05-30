'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

type ProductImageGalleryProps = {
  images: string[]
  selectedIndex: number
  onSelect: (index: number) => void
  productName: string
}

const MAX_VISIBLE_THUMBS = 4

export default function ProductImageGallery({
  images,
  selectedIndex,
  onSelect,
  productName,
}: ProductImageGalleryProps) {
  const visibleThumbs = images.slice(0, MAX_VISIBLE_THUMBS)
  const extraCount = images.length - MAX_VISIBLE_THUMBS

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-surface group">
        {images.length > 0 ? (
          <Image
            src={images[selectedIndex] ?? images[0]}
            alt={`${productName} — view ${selectedIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={selectedIndex === 0}
          />
        ) : (
          <div className="w-full h-full bg-surface flex items-center justify-center">
            <span className="text-muted text-sm">No image available</span>
          </div>
        )}
      </div>

      {/* Thumbnails — hidden on mobile */}
      {images.length > 1 && (
        <div className="hidden md:flex gap-3">
          {visibleThumbs.map((src, i) => (
            <button
              key={src}
              onClick={() => onSelect(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                'relative aspect-square w-16 shrink-0 overflow-hidden rounded-sm bg-surface transition-all duration-200',
                selectedIndex === i
                  ? 'ring-1 ring-charcoal'
                  : 'opacity-70 hover:opacity-100',
              )}
            >
              <Image
                src={src}
                alt={`${productName} thumbnail ${i + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}

          {extraCount > 0 && (
            <button
              onClick={() => onSelect(MAX_VISIBLE_THUMBS)}
              aria-label={`View ${extraCount} more images`}
              className="relative aspect-square w-16 shrink-0 overflow-hidden rounded-sm bg-surface ring-0 hover:ring-1 hover:ring-border transition-all"
            >
              <Image
                src={images[MAX_VISIBLE_THUMBS]}
                alt={`More images`}
                fill
                sizes="64px"
                className="object-cover opacity-40"
              />
              <span className="absolute inset-0 flex items-center justify-center text-[11px] font-medium text-charcoal">
                +{extraCount}
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}
