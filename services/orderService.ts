import { ordersApi, type CheckoutPayload } from '@/features/orders/services/orders.api'
import type { ApiOrder } from '@/types/api'

type OrderResult = { ok: true; data: ApiOrder } | { ok: false; error: string }

export async function placeOrder(payload: CheckoutPayload): Promise<OrderResult> {
  try {
    const data = await ordersApi.checkout(payload)
    return { ok: true, data }
  } catch (err: unknown) {
    const axiosErr = err as { response?: { data?: { message?: string | string[] } } }
    const msg = Array.isArray(axiosErr.response?.data?.message)
      ? axiosErr.response!.data!.message!.join('. ')
      : axiosErr.response?.data?.message ??
        (err instanceof Error ? err.message : 'Order placement failed')
    return { ok: false, error: msg }
  }
}
