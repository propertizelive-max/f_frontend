import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ContainerTag = 'div' | 'section' | 'article' | 'main' | 'aside'

type ContainerProps = {
  children: ReactNode
  className?: string
  as?: ContainerTag
}

export function Container({ children, className, as = 'div' }: ContainerProps) {
  const Tag = as as React.ElementType
  return (
    <Tag className={cn('max-w-[1440px] mx-auto px-6 lg:px-14', className)}>
      {children}
    </Tag>
  )
}
