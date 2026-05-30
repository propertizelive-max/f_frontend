'use client'

import { useState, type ReactNode } from 'react'
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/utils'
import type { FilterState } from '@/types/filters'
import {
  MATERIAL_OPTIONS,
  SIZE_OPTIONS,
  SORT_OPTIONS,
  PRICE_MAX_DEFAULT,
} from '@/types/filters'

type FilterBarProps = {
  filters: FilterState
  onChange: (next: FilterState) => void
  totalCount: number
}

type DropdownProps = {
  label: string
  activeCount: number
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
  children: ReactNode
  alignRight?: boolean
}

function Dropdown({ label, activeCount, isOpen, onToggle, onClose, children, alignRight }: DropdownProps) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={cn(
          'flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] py-1.5 px-3.5 border rounded-full transition-colors duration-200',
          isOpen || activeCount > 0
            ? 'bg-charcoal text-cream border-charcoal'
            : 'bg-white text-charcoal border-border hover:border-charcoal'
        )}
      >
        {label}
        {activeCount > 0 && (
          <span className="w-4 h-4 rounded-full bg-accent text-white text-[9px] flex items-center justify-center font-semibold">
            {activeCount}
          </span>
        )}
        <ChevronDown
          size={10}
          className={cn('transition-transform duration-200', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={onClose}
            aria-hidden="true"
          />
          <div
            className={cn(
              'absolute top-full mt-2 z-40 bg-white border border-border rounded-xl shadow-lg p-4 min-w-[180px]',
              alignRight ? 'right-0' : 'left-0'
            )}
          >
            {children}
          </div>
        </>
      )}
    </div>
  )
}

export function FilterBar({ filters, onChange, totalCount }: FilterBarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const activeFilterCount =
    filters.material.length +
    filters.size.length +
    (filters.priceMax < PRICE_MAX_DEFAULT ? 1 : 0)

  const toggle = (key: string) =>
    setOpenDropdown((prev) => (prev === key ? null : key))
  const close = () => setOpenDropdown(null)

  const toggleMulti = (key: 'material' | 'size', value: string) => {
    const current = filters[key]
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    onChange({ ...filters, [key]: next })
  }

  const clearAll = () =>
    onChange({ material: [], size: [], priceMax: PRICE_MAX_DEFAULT, sortBy: filters.sortBy })

  return (
    <div className="sticky top-16 z-40 bg-white border-b border-border">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-14">

        {/* ── Desktop ────────────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-4 py-3">
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted select-none">
            <SlidersHorizontal size={11} />
            Filter
          </span>

          {/* Material */}
          <Dropdown
            label="Material"
            activeCount={filters.material.length}
            isOpen={openDropdown === 'material'}
            onToggle={() => toggle('material')}
            onClose={close}
          >
            <div className="space-y-0.5">
              {MATERIAL_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-2.5 py-1.5 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.material.includes(opt.value)}
                    onChange={() => toggleMulti('material', opt.value)}
                    className="w-3.5 h-3.5 rounded accent-accent"
                  />
                  <span className="text-sm text-charcoal group-hover:text-accent transition-colors flex-1">
                    {opt.label}
                  </span>
                  <span className="text-xs text-muted">({opt.count})</span>
                </label>
              ))}
            </div>
          </Dropdown>

          {/* Size */}
          <Dropdown
            label="Size"
            activeCount={filters.size.length}
            isOpen={openDropdown === 'size'}
            onToggle={() => toggle('size')}
            onClose={close}
          >
            <div className="space-y-0.5">
              {SIZE_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-2.5 py-1.5 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.size.includes(opt.value)}
                    onChange={() => toggleMulti('size', opt.value)}
                    className="w-3.5 h-3.5 rounded accent-accent"
                  />
                  <span className="text-sm text-charcoal group-hover:text-accent transition-colors flex-1">
                    {opt.label}
                  </span>
                  <span className="text-xs text-muted">({opt.count})</span>
                </label>
              ))}
            </div>
          </Dropdown>

          {/* Price */}
          <Dropdown
            label="Max Price"
            activeCount={filters.priceMax < PRICE_MAX_DEFAULT ? 1 : 0}
            isOpen={openDropdown === 'price'}
            onToggle={() => toggle('price')}
            onClose={close}
          >
            <div className="w-52">
              <p className="text-xs text-muted mb-3">
                Up to{' '}
                <span className="text-charcoal font-medium">
                  {formatPrice(filters.priceMax)}
                </span>
              </p>
              <input
                type="range"
                min={500}
                max={PRICE_MAX_DEFAULT}
                step={100}
                value={filters.priceMax}
                onChange={(e) =>
                  onChange({ ...filters, priceMax: Number(e.target.value) })
                }
                className="w-full accent-accent h-1 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-muted mt-1.5">
                <span>$500</span>
                <span>{formatPrice(PRICE_MAX_DEFAULT)}</span>
              </div>
            </div>
          </Dropdown>

          {/* Spacer + count */}
          <div className="flex-1" />
          <span className="text-xs text-muted">{totalCount} pieces</span>

          {/* Clear */}
          {activeFilterCount > 0 && (
            <button
              onClick={clearAll}
              className="text-xs text-muted hover:text-charcoal transition-colors underline underline-offset-2"
            >
              Clear all
            </button>
          )}

          {/* Sort */}
          <Dropdown
            label={`Sort: ${SORT_OPTIONS.find((o) => o.value === filters.sortBy)?.label ?? 'Featured'}`}
            activeCount={0}
            isOpen={openDropdown === 'sort'}
            onToggle={() => toggle('sort')}
            onClose={close}
            alignRight
          >
            <div>
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onChange({ ...filters, sortBy: opt.value as FilterState['sortBy'] })
                    close()
                  }}
                  className={cn(
                    'w-full text-left px-1 py-2 text-sm transition-colors',
                    filters.sortBy === opt.value
                      ? 'text-accent font-medium'
                      : 'text-charcoal hover:text-accent'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </Dropdown>
        </div>

        {/* ── Mobile: horizontal scroll pills ───────────────── */}
        <div className="flex md:hidden items-center gap-2 py-3 overflow-x-auto">

          {/* Sort native select */}
          <select
            value={filters.sortBy}
            onChange={(e) =>
              onChange({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })
            }
            className="flex-shrink-0 text-[10px] uppercase tracking-widest border border-border rounded-full px-3 py-1.5 bg-white text-charcoal focus:outline-none"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <div className="w-px h-4 bg-border flex-shrink-0" />

          {/* Material pills */}
          {MATERIAL_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => toggleMulti('material', opt.value)}
              className={cn(
                'flex-shrink-0 text-[10px] uppercase tracking-widest border rounded-full px-3 py-1.5 transition-colors duration-200',
                filters.material.includes(opt.value)
                  ? 'bg-charcoal text-cream border-charcoal'
                  : 'bg-white text-charcoal border-border hover:border-charcoal'
              )}
            >
              {opt.label}
            </button>
          ))}

          <div className="w-px h-4 bg-border flex-shrink-0" />

          {/* Size pills */}
          {SIZE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => toggleMulti('size', opt.value)}
              className={cn(
                'flex-shrink-0 text-[10px] uppercase tracking-widest border rounded-full px-3 py-1.5 transition-colors duration-200',
                filters.size.includes(opt.value)
                  ? 'bg-charcoal text-cream border-charcoal'
                  : 'bg-white text-charcoal border-border hover:border-charcoal'
              )}
            >
              {opt.label}
            </button>
          ))}

          {/* Clear */}
          {activeFilterCount > 0 && (
            <button
              onClick={clearAll}
              className="flex-shrink-0 flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted border border-border rounded-full px-3 py-1.5"
            >
              <X size={9} />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
