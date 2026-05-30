'use client'

import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'accent'
type ButtonSize = 'sm' | 'md' | 'lg'

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-charcoal text-cream border border-charcoal hover:bg-charcoal/90',
  outline: 'bg-transparent text-charcoal border border-charcoal hover:bg-charcoal hover:text-cream',
  ghost:   'bg-transparent text-charcoal border border-transparent hover:bg-surface',
  accent:  'bg-accent text-white border border-accent hover:bg-accent-dark',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-5 py-2 text-[10px] tracking-[0.15em]',
  md: 'px-8 py-3 text-[11px] tracking-[0.2em]',
  lg: 'px-10 py-3.5 text-[11px] tracking-[0.2em]',
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center uppercase font-medium transition-colors duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
            aria-hidden="true"
          />
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
