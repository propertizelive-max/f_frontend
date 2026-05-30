export type ProductId = string

export interface Category {
  slug: string
  label: string
  image: string
  count?: number
}

export interface Product {
  id: ProductId
  slug: string
  name: string
  price: number
  currency: string
  images: string[]
  category: string
  description?: string
  isNew?: boolean
  isFeatured?: boolean
  rating?: number
  reviewCount?: number
  stock?: number
}

export interface ProductCardData {
  id: ProductId
  slug: string
  name: string
  price: string
  image: string
  subtitle?: string
  isNew?: boolean
}

export type ProductCategory = 'beds' | 'sofas' | 'dining-chairs' | 'coffee-tables' | 'side-tables'
export type ProductMaterial = 'oak' | 'walnut' | 'linen' | 'velvet' | 'marble'
export type ProductSize = 'small' | 'medium' | 'large'

export interface ProductListing extends ProductCardData {
  subtitle: string
  category: ProductCategory
  material: ProductMaterial
  size: ProductSize
  priceNum: number
}

export interface ProductColor {
  id: string
  name: string
  hex: string
  imageIndex?: number
}

export interface ProductVariantOption {
  id: string
  label: string
  priceOverride?: number
  stock: number
}

export interface ProductSpecifications {
  material: string
  finish: string
  weight: string
  width: string
  height: string
  length: string
}

export interface ProductDetail extends Product {
  originalPrice?: number
  colors: ProductColor[]
  variants: ProductVariantOption[]
  specifications: ProductSpecifications
  overview: string
  careInstructions: string[]
  warranty: {
    period: string
    coverage: string
    exclusions: string[]
  }
  breadcrumb: { label: string; href: string }[]
}
