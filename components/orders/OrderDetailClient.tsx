'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, MapPin, Package, XCircle } from 'lucide-react'
import { useOrder, useCancelOrder } from '@/features/orders/hooks/useOrders'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Loader } from '@/components/ui/Loader'
import { toast } from '@/hooks/useToast'
import { extractApiErrorMessage } from '@/lib/api/error'
import { formatPrice, cn } from '@/lib/utils'
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

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  COD:    'Cash on Delivery',
  UPI:    'UPI',
  ONLINE: 'Online Payment',
}

const PAYMENT_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pending',
  PAID:    'Paid',
  FAILED:  'Failed',
}

type Props = { orderId: string }

export function OrderDetailClient({ orderId }: Props) {
  const { data: order, isLoading, isError } = useOrder(orderId)
  const cancelMutation = useCancelOrder()

  const [showCancelModal, setShowCancelModal] = useState(false)
  const [cancelReason, setCancelReason] = useState('')

  const canCancel =
    order?.orderStatus === 'PENDING' || order?.orderStatus === 'PROCESSING'

  function handleCancelConfirm() {
    if (!cancelReason.trim() || !order) return
    cancelMutation.mutate(
      { id: order.id, reason: cancelReason.trim() },
      {
        onSuccess: () => {
          toast('Order cancelled successfully', 'success')
          setShowCancelModal(false)
          setCancelReason('')
        },
        onError: (err) => {
          toast(extractApiErrorMessage(err), 'error')
        },
      }
    )
  }

  if (isLoading) {
    return (
      <Container className="py-20 flex justify-center">
        <Loader size="lg" />
      </Container>
    )
  }

  if (isError || !order) {
    return (
      <Container className="py-20 text-center">
        <p className="text-sm text-red-500 mb-4">Order not found or failed to load.</p>
        <Link href="/orders">
          <Button variant="outline">Back to Orders</Button>
        </Link>
      </Container>
    )
  }

  const statusBadge = getStatusBadge(order.orderStatus)

  return (
    <Container className="py-10">
      {/* Back link */}
      <Link
        href="/orders"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-muted hover:text-charcoal transition-colors mb-8"
      >
        <ArrowLeft size={13} />
        Back to Orders
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl font-medium text-charcoal">
            Order #{order.id.slice(0, 8).toUpperCase()}
          </h1>
          <p className="text-sm text-muted mt-1">
            Placed on{' '}
            {new Date(order.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            label={statusBadge.label}
            variant={statusBadge.variant}
            className={statusBadge.className}
          />
          {canCancel && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCancelModal(true)}
            >
              <XCircle size={13} className="mr-1.5" />
              Cancel Order
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
        <div className="space-y-5">
          {/* Items */}
          <section className="border border-border bg-white p-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-charcoal mb-5">
              <Package size={14} className="text-accent" />
              Items ({order.items.length})
            </h2>
            <div className="space-y-5">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 shrink-0 bg-surface overflow-hidden">
                    {item.productImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.productImage}
                        alt={item.productTitle}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted">
                        <Package size={24} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-charcoal leading-snug">
                      {item.productTitle}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1">
                      {item.productSku && (
                        <p className="text-[10px] uppercase tracking-[0.1em] text-muted">
                          SKU: {item.productSku}
                        </p>
                      )}
                      {item.productColor && (
                        <p className="text-[10px] uppercase tracking-[0.1em] text-muted">
                          {item.productColor}
                        </p>
                      )}
                      {item.productCategoryName && (
                        <p className="text-[10px] uppercase tracking-[0.1em] text-muted">
                          {item.productCategoryName}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted">Qty: {item.quantity}</span>
                      <span className="text-sm font-semibold text-charcoal">
                        {formatPrice(item.totalPrice, 'INR')}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted mt-0.5">
                      {formatPrice(item.price, 'INR')} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Shipping address */}
          <section className="border border-border bg-white p-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-charcoal mb-4">
              <MapPin size={14} className="text-accent" />
              Shipping Address
            </h2>
            <div className="text-sm text-charcoal space-y-0.5">
              <p className="font-medium">{order.fullName}</p>
              <p>{order.shippingAddress}</p>
              <p>{order.city}, {order.state}</p>
              <p>{order.zipCode}</p>
              <p>+91 {order.phoneNumber}</p>
              {order.gstin && (
                <p className="text-xs text-muted mt-1">GSTIN: {order.gstin}</p>
              )}
            </div>
          </section>

          {/* Cancellation info */}
          {order.orderStatus === 'CANCELLED' && order.cancelReason && (
            <section className="border border-red-200 bg-red-50 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-red-700 mb-2">
                Cancellation Details
              </h2>
              <p className="text-sm text-red-600">{order.cancelReason}</p>
              {order.cancelledAt && (
                <p className="text-xs text-red-400 mt-1">
                  Cancelled on{' '}
                  {new Date(order.cancelledAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              )}
            </section>
          )}
        </div>

        {/* Right column: pricing + payment */}
        <div className="space-y-5">
          {/* Pricing */}
          <section className="border border-border bg-white p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-charcoal mb-4">
              Price Details
            </h2>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-charcoal/70">Product Total</span>
                <span>{formatPrice(order.productAmount, 'INR')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/70">Delivery Charge</span>
                <span>{formatPrice(order.deliveryCharge, 'INR')}</span>
              </div>
            </div>
            <div className="border-t border-border mt-4 pt-4 flex justify-between font-medium">
              <span className="text-charcoal">Total Paid</span>
              <span className="text-charcoal">{formatPrice(order.totalAmount, 'INR')}</span>
            </div>
          </section>

          {/* Payment */}
          <section className="border border-border bg-white p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-charcoal mb-4">
              Payment
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-charcoal/70">Method</span>
                <span className="text-charcoal">
                  {PAYMENT_METHOD_LABELS[order.paymentMethod] ?? order.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/70">Status</span>
                <span
                  className={cn(
                    'font-medium',
                    order.paymentStatus === 'PAID' ? 'text-green-600' :
                    order.paymentStatus === 'FAILED' ? 'text-red-500' :
                    'text-muted'
                  )}
                >
                  {PAYMENT_STATUS_LABELS[order.paymentStatus] ?? order.paymentStatus}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Cancel confirmation modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-border p-6 max-w-sm w-full">
            <h3 className="font-display text-lg font-medium text-charcoal mb-1">
              Cancel Order?
            </h3>
            <p className="text-sm text-muted mb-4">
              This action cannot be undone. Stock will be restored.
            </p>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Reason for cancellation (required)"
              maxLength={500}
              className="w-full border border-border px-3 py-2.5 text-sm text-charcoal resize-none h-24 focus:outline-none focus:border-charcoal transition-colors placeholder:text-muted"
            />
            <div className="flex gap-3 mt-4">
              <Button
                variant="ghost"
                fullWidth
                onClick={() => {
                  setShowCancelModal(false)
                  setCancelReason('')
                }}
              >
                Keep Order
              </Button>
              <Button
                variant="primary"
                fullWidth
                disabled={!cancelReason.trim()}
                isLoading={cancelMutation.isPending}
                onClick={handleCancelConfirm}
              >
                Confirm Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </Container>
  )
}
