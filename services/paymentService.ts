import type { PaymentConfig } from '@/types/payment'

export const PAYMENT_CONFIG: PaymentConfig = {
  provider: 'COD',
  currency: 'INR',
}

// Stub: wire up Razorpay or Stripe SDK here when payment gateway is configured.
// Steps to implement:
//   1. npm install razorpay  (or @stripe/stripe-js)
//   2. Set NEXT_PUBLIC_RAZORPAY_KEY in .env.local
//   3. Replace this function with actual SDK initialization
//   4. Add 'RAZORPAY' option to OrderConfirmation payment method radio
export async function initializePayment(_config: PaymentConfig): Promise<never> {
  throw new Error('Payment gateway not yet configured. Only COD is available.')
}
