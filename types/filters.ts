export interface FilterState {
  material: string[]
  size: string[]
  priceMax: number
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest'
}

export interface FilterOption {
  value: string
  label: string
  count: number
}

export const PRICE_MAX_DEFAULT = 5000

export const DEFAULT_FILTERS: FilterState = {
  material: [],
  size: [],
  priceMax: PRICE_MAX_DEFAULT,
  sortBy: 'featured',
}

export const MATERIAL_OPTIONS: FilterOption[] = [
  { value: 'oak',    label: 'White Oak', count: 3 },
  { value: 'walnut', label: 'Walnut',    count: 3 },
  { value: 'linen',  label: 'Linen',     count: 2 },
  { value: 'velvet', label: 'Velvet',    count: 2 },
  { value: 'marble', label: 'Marble',    count: 2 },
]

export const SIZE_OPTIONS: FilterOption[] = [
  { value: 'small',  label: 'Small',  count: 3 },
  { value: 'medium', label: 'Medium', count: 5 },
  { value: 'large',  label: 'Large',  count: 4 },
]

export const SORT_OPTIONS = [
  { value: 'featured',   label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest',     label: 'Newest First' },
] as const
