'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function getPageRange(current: number, total: number): (number | '...')[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)

  const pageSet = new Set<number>()
  pageSet.add(1)
  pageSet.add(total)
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pageSet.add(i)
  }

  const sorted = Array.from(pageSet).sort((a, b) => a - b)
  const result: (number | '...')[] = []
  for (let i = 0; i < sorted.length; i++) {
    result.push(sorted[i])
    if (i < sorted.length - 1 && sorted[i + 1] - sorted[i] > 1) {
      result.push('...')
    }
  }
  return result
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = getPageRange(currentPage, totalPages)

  return (
    <nav
      className="flex items-center justify-center gap-1 pt-12 pb-4"
      aria-label="Pagination navigation"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={cn(
          'flex items-center gap-1.5 px-4 py-2.5 text-[10px] uppercase tracking-[0.15em] border border-border transition-colors duration-200',
          currentPage === 1
            ? 'text-muted opacity-40 cursor-not-allowed pointer-events-none'
            : 'text-charcoal hover:bg-surface'
        )}
      >
        <ChevronLeft size={11} />
        Prev
      </button>

      <div className="flex items-center gap-1 mx-1">
        {pages.map((page, i) =>
          page === '...' ? (
            <span
              key={`ellipsis-${i}`}
              className="w-9 h-9 flex items-center justify-center text-sm text-muted select-none"
            >
              &hellip;
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
              className={cn(
                'w-9 h-9 text-sm border transition-colors duration-200',
                currentPage === page
                  ? 'bg-charcoal text-cream border-charcoal'
                  : 'text-charcoal border-border hover:bg-surface'
              )}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={cn(
          'flex items-center gap-1.5 px-4 py-2.5 text-[10px] uppercase tracking-[0.15em] border border-border transition-colors duration-200',
          currentPage === totalPages
            ? 'text-muted opacity-40 cursor-not-allowed pointer-events-none'
            : 'text-charcoal hover:bg-surface'
        )}
      >
        Next
        <ChevronRight size={11} />
      </button>
    </nav>
  )
}
