import type { Metadata } from 'next'
import { AddressForm } from '@/components/checkout/AddressForm'

export const metadata: Metadata = {
  title: 'Delivery Address | Nordic Hearth',
}

export default function AddressPage() {
  return <AddressForm />
}
