'use client'

import { usePathname } from 'next/navigation'
import { CheckoutProvider } from '@/context/CheckoutContext'
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper'
import { OrderSummary } from '@/components/checkout/OrderSummary'
import { Container } from '@/components/layout/Container'

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const showItems = pathname === '/checkout/confirmation'

  return (
    <CheckoutProvider>
      <Container className="py-10">
        <CheckoutStepper />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
          <div>{children}</div>
          <div>
            <OrderSummary showItems={showItems} />
          </div>
        </div>
      </Container>
    </CheckoutProvider>
  )
}
