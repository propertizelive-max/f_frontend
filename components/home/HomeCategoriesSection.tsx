'use client'

import Link from 'next/link'
import { useCategories } from '@/features/categories/hooks/useCategories'
import { SkeletonCard } from '@/components/ui/SkeletonCard'
import { apiCategoryToNav } from '@/lib/mappers'

export function HomeCategoriesSection() {
  const { data, isLoading, isError } = useCategories()

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} aspectRatio="1/1" />
        ))}
      </div>
    )
  }

  if (isError || !data?.data?.length) {
    return (
      <p className="text-center text-sm text-muted py-8">
        Could not load categories. Make sure the backend is running.
      </p>
    )
  }

  const categories = data.data.map(apiCategoryToNav)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-8">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/products?categoryId=${cat.id}&categoryName=${encodeURIComponent(cat.label)}`}
          className="group cursor-pointer"
        >
          <div className="overflow-hidden rounded-xl bg-surface aspect-square">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cat.image}
              alt={cat.label}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <p className="mt-2.5 text-center text-[10px] uppercase tracking-[0.2em] font-medium text-charcoal">
            {cat.label}
          </p>
        </Link>
      ))}
    </div>
  )
}
