import type { Metadata } from 'next'
import { OrderConfirmation } from '@/components/checkout/OrderConfirmation'

export const metadata: Metadata = {
  title: 'Order Confirmation | Nordic Hearth',
}

export default function ConfirmationPage() {
  return <OrderConfirmation />
}
