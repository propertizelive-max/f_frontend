import type { ProductId } from './product'

export interface CartItem {
  productId: ProductId
  cartItemId?: string   // backend cart item UUID — populated after API sync
  slug: string
  name: string
  price: number
  originalPrice?: number
  discountPercent?: number
  quantity: number
  image: string
  color?: string
  variant?: string
  // true when product is no longer purchasable (DRAFT / ARCHIVED / OUT_OF_STOCK or isActive=false)
  notPurchasable?: boolean
}

export interface Cart {
  items: CartItem[]
  total: number
  count: number
}
