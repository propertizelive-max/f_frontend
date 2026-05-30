export type CheckoutStep = 'cart' | 'address' | 'confirmation'

export interface CheckoutFormData {
  fullName: string
  streetAddress: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  phoneNumber: string
  buyingFor: 'personal' | 'business'
  gstin?: string
}

export interface OrderPayload {
  fullName: string
  shippingAddress: string
  city: string
  state: string
  zipCode: string
  phoneNumber: string
  paymentMethod: 'COD'
}

export interface OrderResponse {
  orderId: string
  status: string
  message: string
}
