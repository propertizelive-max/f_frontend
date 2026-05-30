'use client'

import { useState, useRef, useMemo } from 'react'
import { FilterBar } from '@/components/products/FilterBar'
import { ProductGrid } from '@/components/products/ProductGrid'
import { Pagination } from '@/components/products/Pagination'
import { PRODUCTS } from '@/data/products'
import type { FilterState } from '@/types/filters'
import { DEFAULT_FILTERS, PRICE_MAX_DEFAULT } from '@/types/filters'

const ITEMS_PER_PAGE = 9

export function ProductsClient() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [currentPage, setCurrentPage] = useState(1)
  const gridRef = useRef<HTMLDivElement>(null)

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS]

    if (filters.material.length > 0) {
      result = result.filter((p) => filters.material.includes(p.material))
    }
    if (filters.size.length > 0) {
      result = result.filter((p) => filters.size.includes(p.size))
    }
    if (filters.priceMax < PRICE_MAX_DEFAULT) {
      result = result.filter((p) => p.priceNum <= filters.priceMax)
    }

    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.priceNum - b.priceNum)
        break
      case 'price-desc':
        result.sort((a, b) => b.priceNum - a.priceNum)
        break
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
    }

    return result
  }, [filters])

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

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
      <FilterBar
        filters={filters}
        onChange={handleFiltersChange}
        totalCount={filteredProducts.length}
      />

      <div ref={gridRef} className="scroll-mt-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-14 py-12 lg:py-16">
          <ProductGrid
            products={paginatedProducts}
            onClearFilters={clearFilters}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  )
}
