'use client'

import { Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/layout/Container'
import { Loader } from '@/components/ui/Loader'

function OrderSuccessContent() {
  const params = useSearchParams()
  const orderId = params.get('orderId') ?? '—'

  useEffect(() => {
    try {
      localStorage.removeItem('nh_checkout_step')
      localStorage.removeItem('nh_checkout_form')
    } catch {
      // ignore
    }
  }, [])

  return (
    <div className="max-w-lg mx-auto text-center">
      <CheckCircle
        size={64}
        className="mx-auto text-green-500 mb-6"
        strokeWidth={1.5}
      />

      <h1 className="font-display text-3xl font-medium text-charcoal mb-2">
        Order Placed Successfully!
      </h1>
      <p className="text-muted mb-2">Your order has been confirmed.</p>
      <p className="text-sm text-charcoal bg-surface border border-border inline-block px-4 py-2 mb-8">
        Order ID: <strong>{orderId}</strong>
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/orders">
          <Button variant="outline" size="lg">
            View Orders
          </Button>
        </Link>
        <Link href="/products">
          <Button variant="accent" size="lg">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Container className="py-20">
      <Suspense fallback={<div className="flex justify-center"><Loader size="lg" /></div>}>
        <OrderSuccessContent />
      </Suspense>
    </Container>
  )
}
