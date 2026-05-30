import type { Metadata } from 'next'
import { CartReview } from '@/components/checkout/CartReview'

export const metadata: Metadata = {
  title: 'Cart | Nordic Hearth',
}

export default function CartPage() {
  return <CartReview />
}
