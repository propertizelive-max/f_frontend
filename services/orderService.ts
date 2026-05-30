import type { ApiResponse } from '@/services/api'
import type { OrderPayload, OrderResponse } from '@/types/checkout'

const BASE = process.env.NEXT_PUBLIC_API_URL ?? ''

export async function placeOrder(payload: OrderPayload): Promise<ApiResponse<OrderResponse>> {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('nh_access_token') : null
    const res = await fetch(`${BASE}/orders/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    })

    const json = await res.json()

    if (!res.ok) {
      return { ok: false, error: json.message ?? 'Order placement failed' }
    }

    return { ok: true, data: json as OrderResponse }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Network error' }
  }
}
