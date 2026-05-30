import type { ProductId } from './product'

export interface CartItem {
  productId: ProductId
  slug: string
  name: string
  price: number
  originalPrice?: number
  discountPercent?: number
  quantity: number
  image: string
  color?: string
  variant?: string
}

export interface Cart {
  items: CartItem[]
  total: number
  count: number
}
