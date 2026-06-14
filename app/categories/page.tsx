import { Suspense } from 'react'
import type { Metadata } from 'next'
import { CategoriesPageClient } from '@/components/categories/CategoriesPageClient'

export const metadata: Metadata = {
  title: 'Categories | Nordic Hearth',
  description: 'Browse furniture categories and products',
}

export default function CategoriesPage() {
  return (
    <Suspense>
      <CategoriesPageClient />
    </Suspense>
  )
}
