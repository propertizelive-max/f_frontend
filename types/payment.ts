export type PaymentMethod = 'COD' | 'RAZORPAY' | 'STRIPE'

export interface PaymentConfig {
  provider: PaymentMethod
  publicKey?: string
  currency: string
}
