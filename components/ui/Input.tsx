'use client'

import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium uppercase tracking-[0.1em] text-charcoal/70"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-2.5 bg-white border border-border rounded text-sm text-charcoal',
            'placeholder:text-muted focus:outline-none focus:border-charcoal transition-colors',
            error && 'border-red-400 focus:border-red-400',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        {hint && !error && <p className="text-xs text-muted">{hint}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
