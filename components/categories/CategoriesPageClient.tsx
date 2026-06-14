'use client'

import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { CategoriesGrid } from '@/components/categories/CategoriesGrid'
import { ProductGrid } from '@/components/products/ProductGrid'
import { Pagination } from '@/components/products/Pagination'
import { SkeletonCard } from '@/components/ui/SkeletonCard'
import { useCategories } from '@/features/categories/hooks/useCategories'
import { useProducts } from '@/features/products/hooks/useProducts'
import { apiProductToCard } from '@/lib/mappers'

const ITEMS_PER_PAGE = 12

export function CategoriesPageClient() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const { data: categoriesData, isLoading: categoriesLoading } = useCategories()
  const { data: productsData, isLoading: productsLoading } = useProducts({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    categoryId: selectedCategoryId ?? undefined,
  })

  const categories = categoriesData?.data ?? []
  const products = (productsData?.data ?? []).map(apiProductToCard)
  const totalPages = productsData ? Math.ceil(productsData.total / ITEMS_PER_PAGE) : 0

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId)

  function handleCategorySelect(categoryId: string | null) {
    setSelectedCategoryId(categoryId)
    setCurrentPage(1)
  }

  function handlePageChange(page: number) {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* ── Categories ──────────────────────────────────────────── */}
      <Container as="section" className="py-16 lg:py-20">
        <SectionHeading title="All Categories" subtitle="Collections" align="center" />

        {categoriesLoading ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6">
            {Array.from({ length: 7 }).map((_, i) => (
              <SkeletonCard key={i} aspectRatio="1/1" />
            ))}
          </div>
        ) : (
          <CategoriesGrid
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onCategorySelect={handleCategorySelect}
          />
        )}
      </Container>

      <div className="border-t border-border" />

      {/* ── Products ────────────────────────────────────────────── */}
      <Container as="section" className="py-16 lg:py-20">
        <SectionHeading
          title={selectedCategory ? selectedCategory.name : 'All Products'}
          subtitle="Products"
        />

        <ProductGrid
          products={products}
          loading={productsLoading}
          onClearFilters={selectedCategoryId ? () => handleCategorySelect(null) : undefined}
        />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </Container>
    </>
  )
}
