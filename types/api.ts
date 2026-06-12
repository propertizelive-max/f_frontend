// Exact backend response shapes

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export interface ApiCategory {
  id: string
  name: string
  slug: string
  description: string | null
  imageUrl: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface ApiProductImage {
  id: string
  imageUrl: string
  imageType: 'GALLERY' | 'DIAGRAM'
  sortOrder: number
  createdAt: string
}

export interface ApiProductCategory {
  id: string
  name: string
  slug: string
}

export type ProductStatus = 'DRAFT' | 'PUBLISHED' | 'ACTIVE' | 'ARCHIVED' | 'OUT_OF_STOCK'

export interface ApiProduct {
  id: string
  title: string
  slug: string
  description: string | null
  price: number
  discountPrice: number | null
  stock: number
  sku: string | null
  material: string | null
  status: ProductStatus
  color: string | null
  dimensions: string | null
  weight: number | null
  finish: string | null
  style: string | null
  careInstructions: string | null
  warranty: string | null
  images: ApiProductImage[]
  isFeatured: boolean
  isActive: boolean
  categoryId: string
  category: ApiProductCategory | null
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface ApiCartItemProduct {
  id: string
  title: string
  slug: string
  price: number
  discountPrice: number | null
  imageUrls: string[]
  stock: number
  isActive: boolean
  status: ProductStatus
}

export interface ApiCartItem {
  id: string
  cartId: string
  productId: string
  quantity: number
  product: ApiCartItemProduct | null
  createdAt: string
  updatedAt: string
}

export interface ApiCart {
  id: string
  userId: string
  items: ApiCartItem[]
  totalItems: number
  totalPrice: number
  createdAt: string
  updatedAt: string
}

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED'
export type PaymentMethod = 'COD' | 'ONLINE' | 'UPI'

export interface ApiOrderItem {
  id: string
  productId: string
  productTitle: string
  productImage: string | null
  productSku: string | null
  productColor: string | null
  productCategoryName: string | null
  quantity: number
  price: number
  totalPrice: number
}

export interface ApiOrder {
  id: string
  fullName: string
  email: string
  phoneNumber: string
  shippingAddress: string
  city: string
  state: string
  zipCode: string
  gstin: string | null
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  orderStatus: OrderStatus
  productAmount: number
  deliveryCharge: number
  totalAmount: number
  items: ApiOrderItem[]
  createdAt: string
  updatedAt: string
  cancelReason: string | null
  cancelledAt: string | null
  cancelledBy: string | null
}
