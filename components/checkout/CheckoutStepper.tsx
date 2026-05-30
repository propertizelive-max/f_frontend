'use client'

import { usePathname } from 'next/navigation'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CheckoutStep } from '@/types/checkout'

const STEPS: { key: CheckoutStep; label: string; number: number }[] = [
  { key: 'cart', label: 'Cart', number: 1 },
  { key: 'address', label: 'Address', number: 2 },
  { key: 'confirmation', label: 'Confirmation', number: 3 },
]

const ORDER: CheckoutStep[] = ['cart', 'address', 'confirmation']

export function CheckoutStepper() {
  const pathname = usePathname()
  const currentStep: CheckoutStep =
    pathname.endsWith('/confirmation') ? 'confirmation' :
    pathname.endsWith('/address') ? 'address' :
    'cart'
  const currentIndex = ORDER.indexOf(currentStep)

  return (
    <nav aria-label="Checkout progress" className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((step, idx) => {
        const isCompleted = idx < currentIndex
        const isActive = idx === currentIndex

        return (
          <div key={step.key} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border transition-colors',
                  isCompleted && 'bg-accent border-accent text-white',
                  isActive && 'bg-charcoal border-charcoal text-cream',
                  !isCompleted && !isActive && 'bg-white border-border text-muted'
                )}
              >
                {isCompleted ? <Check size={13} strokeWidth={2.5} /> : step.number}
              </div>
              <span
                className={cn(
                  'text-[10px] uppercase tracking-[0.15em] font-medium whitespace-nowrap',
                  isActive && 'text-charcoal',
                  isCompleted && 'text-accent',
                  !isCompleted && !isActive && 'text-muted'
                )}
              >
                {step.label}
              </span>
            </div>

            {idx < STEPS.length - 1 && (
              <div
                className={cn(
                  'w-24 sm:w-36 h-px mx-3 mb-5 transition-colors',
                  idx < currentIndex ? 'bg-accent' : 'bg-border'
                )}
              />
            )}
          </div>
        )
      })}
    </nav>
  )
}
