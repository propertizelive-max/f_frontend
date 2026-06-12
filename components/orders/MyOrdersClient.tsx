'use client'

import Link from 'next/link'
import { Package } from 'lucide-react'
import { useMyOrders } from '@/features/orders/hooks/useOrders'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Loader } from '@/components/ui/Loader'
import { formatPrice } from '@/lib/utils'
import type { OrderStatus } from '@/types/api'

type StatusBadgeConfig = {
  label: string
  variant: 'default' | 'new' | 'sale' | 'soldout' | 'accent'
  className?: string
}

function getStatusBadge(status: OrderStatus): StatusBadgeConfig {
  switch (status) {
    case 'PENDING':    return { label: 'Pending',    variant: 'default' }
    case 'PROCESSING': return { label: 'Processing', variant: 'accent' }
    case 'SHIPPED':    return { label: 'Shipped',    variant: 'new' }
    case 'DELIVERED':  return { label: 'Delivered',  variant: 'default', className: '!bg-green-100 !text-green-700' }
    case 'CANCELLED':  return { label: 'Cancelled',  variant: 'soldout' }
  }
}

function formatOrderDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function MyOrdersClient() {
  const { data: orders, isLoading, isError } = useMyOrders()

  if (isLoading) {
    return (
      <Container className="py-20 flex justify-center">
        <Loader size="lg" />
      </Container>
    )
  }

  if (isError) {
    return (
      <Container className="py-20 text-center">
        <p className="text-sm text-red-500">Failed to load orders. Please try again.</p>
      </Container>
    )
  }

  if (!orders || orders.length === 0) {
    return (
      <Container className="py-20 text-center">
        <Package size={48} className="mx-auto text-border mb-4" />
        <h2 className="font-display text-xl text-charcoal mb-2">No orders yet</h2>
        <p className="text-sm text-muted mb-6">
          When you place an order, it will appear here.
        </p>
        <Link href="/products">
          <Button variant="accent">Start Shopping</Button>
        </Link>
      </Container>
    )
  }

  return (
    <Container className="py-10">
      <h1 className="font-display text-2xl lg:text-3xl font-medium text-charcoal mb-8">
        My Orders
      </h1>
      <div className="space-y-4">
        {orders.map((order) => {
          const badge = getStatusBadge(order.orderStatus)
          const firstItem = order.items[0]
          const extraCount = order.items.length - 1

          return (
            <div key={order.id} className="border border-border bg-white p-5">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {firstItem?.productImage && (
                  <div className="w-20 h-20 shrink-0 bg-surface overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={firstItem.productImage}
                      alt={firstItem.productTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.1em] text-muted">
                        Order #{order.id.slice(0, 8).toUpperCase()}
                      </p>
                      <p className="text-xs text-muted mt-0.5">
                        {formatOrderDate(order.createdAt)}
                      </p>
                    </div>
                    <Badge
                      label={badge.label}
                      variant={badge.variant}
                      className={badge.className}
                    />
                  </div>

                  <p className="text-sm font-medium text-charcoal leading-snug">
                    {firstItem?.productTitle ?? '—'}
                    {extraCount > 0 && (
                      <span className="text-muted font-normal"> +{extraCount} more</span>
                    )}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
                    <div className="text-sm">
                      <span className="text-muted">Total: </span>
                      <span className="font-semibold text-charcoal">
                        {formatPrice(order.totalAmount, 'INR')}
                      </span>
                      <span className="text-[10px] text-muted ml-2 uppercase tracking-wider">
                        {order.paymentMethod}
                      </span>
                    </div>
                    <Link href={`/orders/${order.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Container>
  )
}
