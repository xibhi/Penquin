'use client'

import React from 'react'
import { cn } from '@/lib/utils';

import { IconMoon, IconSun } from '@tabler/icons-react';
import { Button } from './button';

export interface DarkModeToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
    toggleDark: () => void
  }

const DarkModeToggle = ({ className, toggleDark, ...props }: DarkModeToggleProps) => {
  return (
    <Button
      size={'icon'}
      variant={'secondary'}
      className={cn(
        'relative bg-gray-100 dark:bg-zinc-900 rounded-full',
        className,
      )}
      onClick={toggleDark}
      {...props}
    >
      <IconMoon className='rotate-0 scale-100 dark:rotate-90 dark:scale-0 transition-all duration-200 absolute left-1/2 top-1/2 -translate-1/2' />
      <IconSun className='rotate-90 scale-0 dark:rotate-0 dark:scale-90 transition-all duration-200 absolute left-1/2 top-1/2 -translate-1/2' />
    </Button>
  )
}

DarkModeToggle.displayName = 'DarkModeToggle'

export { DarkModeToggle }