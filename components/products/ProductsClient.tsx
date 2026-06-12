'use client'

import { useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { FilterBar } from '@/components/products/FilterBar'
import { ProductGrid } from '@/components/products/ProductGrid'
import { Pagination } from '@/components/products/Pagination'
import { useProducts } from '@/features/products/hooks/useProducts'
import { apiProductToCard } from '@/lib/mappers'
import type { FilterState } from '@/types/filters'
import { DEFAULT_FILTERS, PRICE_MAX_DEFAULT } from '@/types/filters'
import type { ProductsQueryParams } from '@/features/products/services/products.api'

const ITEMS_PER_PAGE = 9

function buildApiParams(
  filters: FilterState,
  page: number,
  categoryId?: string
): ProductsQueryParams {
  const params: ProductsQueryParams = { page, limit: ITEMS_PER_PAGE }

  if (categoryId) {
    params.categoryId = categoryId
  }

  if (filters.priceMax < PRICE_MAX_DEFAULT) {
    params.maxPrice = filters.priceMax
  }

  switch (filters.sortBy) {
    case 'price-asc':
      params.sortBy = 'price'
      params.order = 'ASC'
      break
    case 'price-desc':
      params.sortBy = 'price'
      params.order = 'DESC'
      break
    case 'newest':
      params.sortBy = 'createdAt'
      params.order = 'DESC'
      break
    default:
      params.sortBy = 'createdAt'
      params.order = 'DESC'
  }

  return params
}

export function ProductsClient() {
  const searchParams = useSearchParams()
  const categoryId = searchParams.get('categoryId') ?? undefined
  const categoryName = searchParams.get('categoryName') ?? undefined

  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [currentPage, setCurrentPage] = useState(1)
  const gridRef = useRef<HTMLDivElement>(null)

  const { data, isLoading } = useProducts(buildApiParams(filters, currentPage, categoryId))

  const products = (data?.data ?? []).map(apiProductToCard)
  const totalPages = data ? Math.ceil(data.total / ITEMS_PER_PAGE) : 0

  function handleFiltersChange(next: FilterState) {
    setFilters(next)
    setCurrentPage(1)
  }

  function handlePageChange(page: number) {
    setCurrentPage(page)
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function clearFilters() {
    setFilters(DEFAULT_FILTERS)
    setCurrentPage(1)
  }

  return (
    <>
      {categoryName && (
        <div className="max-w-[1440px] mx-auto px-6 lg:px-14 pt-10">
          <p className="text-[10px] uppercase tracking-[0.3em] font-semibold text-accent mb-1">
            Category
          </p>
          <h2 className="font-display text-3xl lg:text-4xl font-medium text-charcoal">
            {categoryName}
          </h2>
        </div>
      )}

      <FilterBar
        filters={filters}
        onChange={handleFiltersChange}
        totalCount={data?.total ?? 0}
      />

      <div ref={gridRef} className="scroll-mt-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-14 py-12 lg:py-16">
          <ProductGrid
            products={products}
            loading={isLoading}
            onClearFilters={clearFilters}
          />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </>
  )
}
