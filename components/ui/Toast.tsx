'use client'

import { useToastState } from '@/hooks/useToast'
import { cn } from '@/lib/utils'

export function Toaster() {
  const toasts = useToastState()

  if (toasts.length === 0) return null

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={cn(
            'px-5 py-3 text-sm font-medium text-white shadow-lg animate-in slide-in-from-bottom-2 duration-300',
            t.type === 'success' ? 'bg-charcoal' : 'bg-red-600'
          )}
        >
          {t.message}
        </div>
      ))}
    </div>
  )
}
