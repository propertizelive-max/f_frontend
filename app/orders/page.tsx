import type { Metadata } from 'next'
import { MyOrdersClient } from '@/components/orders/MyOrdersClient'

export const metadata: Metadata = {
  title: 'My Orders | Nordic Hearth',
}

export default function OrdersPage() {
  return <MyOrdersClient />
}
