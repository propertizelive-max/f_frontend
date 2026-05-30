import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type BreadcrumbItem = { label: string; href: string }

type BreadcrumbProps = {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <span key={item.href} className="flex items-center gap-1">
            {index > 0 && (
              <ChevronRight className="w-3 h-3 text-muted shrink-0" />
            )}
            {isLast ? (
              <span className="text-[11px] tracking-wide text-charcoal font-medium truncate max-w-[180px]">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-[11px] tracking-wide text-muted hover:text-charcoal transition-colors"
              >
                {item.label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
