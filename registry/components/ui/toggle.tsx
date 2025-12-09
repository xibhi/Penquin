'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

import { useAnimate } from 'motion/react'

export interface ToggleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  isOn: boolean,
  toggleOn: () => void
}

const Toggle = React.forwardRef<HTMLDivElement, ToggleProps>(
  ({ className, isOn, toggleOn, ...props }, ref) => {
    const [scope, animate] = useAnimate();

    const isMounted = React.useRef(true);

    React.useEffect(() => {
      if (isMounted.current) {
        isMounted.current = false;
        return;
      }

      (async () => {
        // To fix the sudden jerk if 'isOn' is true be default
        scope.current.style.marginLeft = !isOn ? 'auto' : 0

        await animate(
          scope.current,
          {
            width: '2.5rem'
          },
          {
            duration: 0.15
          }
        ).finished;

        scope.current.style.marginLeft = isOn ? 'auto' : 0

        await animate(
          scope.current,
          {
            width: '1.25rem',
          },
          {
            duration: 0.15
          }
        ).finished;
      })();
    }, [isOn, animate, scope]);

    return (
      <div
        className={cn(
          'w-12 p-1 rounded-full shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] cursor-pointer relative transition-colors duration-200',
          isOn ? 'bg-neutral-800 dark:bg-neutral-300' : 'bg-neutral-300 dark:bg-neutral-800',
          className
        )}
        ref={ref}
        {...props}
        onClick={toggleOn}
      >
        <div
          ref={scope}
          className={cn(
            'h-5 w-5 rounded-full bg-white dark:bg-black',
            isOn && 'ml-auto'
          )}
        />
      </div>
    )
  }
)

Toggle.displayName = 'Toggle'

export { Toggle }