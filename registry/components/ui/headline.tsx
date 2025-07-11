import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'

const headlineVariants = cva(
  'bg-clip-text text-transparent text-center py-2 relative z-20 font-bold font-sans tracking-tight from-neutral-900 to-neutral-600 dark:from-neutral-600 dark:to-white',
  {
    variants: {
      variant: {
        bottom: 'bg-gradient-to-b',
        top: 'bg-gradient-to-t',
        right: 'bg-gradient-to-r',
        topRight: 'bg-gradient-to-tr',
        topLeft: 'bg-gradient-to-tl'
      },
      size: {
        default: 'text-5xl md:text-7xl',
        medium: 'text-4xl md:text-6xl',
        small: 'text-3xl md:text-5xl'
      }
    },
    defaultVariants: {
      variant: 'bottom',
      size: 'default'
    }
  }
)

export interface HeadlineProps
extends React.HTMLAttributes<HTMLDivElement>,
VariantProps<typeof headlineVariants> {}

const Headline = ({ className, variant, size, ...props }: HeadlineProps) => {
  return (
    <h1
      className={cn(headlineVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Headline }