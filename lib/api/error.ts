export function extractApiErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const data = (error as { response?: { data?: unknown } }).response?.data
    if (data && typeof data === 'object') {
      const d = data as { message?: string | string[] }
      if (typeof d.message === 'string') return d.message
      if (Array.isArray(d.message)) return d.message.join('. ')
    }
  }
  if (error instanceof Error && error.message && error.message !== 'Network Error') {
    return error.message
  }
  return 'Network error. Please try again.'
}
