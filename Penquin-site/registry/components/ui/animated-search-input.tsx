'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion, stagger, useAnimate, AnimationSequence } from 'motion/react'

interface AnimatedSearchInputProps
  extends Omit<React.ComponentProps<"input">, 'placeholder'> {
  placeholders: string[],
  value: string,
  setValue: (val: string) => void,
  haltDuration?: number,
  enableTabCompletion?: boolean
}

const AnimatedSearchInput = React.forwardRef<HTMLInputElement, AnimatedSearchInputProps>(
  ({ placeholders, haltDuration = 1, enableTabCompletion = true, className, type, value, setValue, onFocus, onBlur, ...props }, ref) => {
    const [currentIdx, setCurrentIdx] = React.useState(0); // currentIdx of the suggestion which is currently showing
    const [isFocused, setIsFocused] = React.useState(false);

    const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (enableTabCompletion && isFocused && e.key === 'Tab') {
        setValue(placeholders[currentIdx]);
      }
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    }

    return (
      <div className='mx-4 my-2 relative'>
        <input
          ref={ref}
          type={type}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeydown}
          className={cn(
            'h-10 w-full min-w-[25rem] border-2 border-neutral-200 dark:border-neutral-700 rounded-full px-6 py-2 text-sm shadow-xl/10 dark:shadow-lg dark:shadow-white focus-visible:outline-none disabled:opacity-50',
            'bg-gradient-to-r from-neutral-50 to-neutral-100',
            'dark:from-neutral-800 dark:to-neutral-900',
            className
          )}
          {...props}
        />
        <div className='h-full w-full py-1 flex px-6 items-center absolute inset-0 pointer-events-none select-none'>
          {
            (value === undefined || value === null || value === '') && placeholders[currentIdx] && (
              <AnimatedPlaceholder text={placeholders[currentIdx]} haltDuration={haltDuration} increasecurrentIdx={() => setCurrentIdx(prevcurrentIdx => (prevcurrentIdx + 1) % placeholders.length)} key={currentIdx} />
            )
          }
        </div>
      </div>
    )
  }
)

AnimatedSearchInput.displayName = 'AnimatedSearchInput'

const AnimatedPlaceholder = ({ text, increasecurrentIdx, haltDuration }: { text: string, increasecurrentIdx: () => void, haltDuration: number }) => {
  const [scope, animate] = useAnimate();

  React.useEffect(() => {
    const startAnimation = async () => {
      const sequence: AnimationSequence = [
        ['span', { y: 0, opacity: 1, filter: 'blur(0px)' }, { duration: 0.3, type: 'tween', delay: stagger(0.05) }],
        ['span', {}, { at: `+${haltDuration}` }], // delay between two placeholders
        ['span', { y: -20, opacity: 0, filter: 'blur(10px)' }, { duration: 0.3, type: 'tween', delay: stagger(0.05) }]
      ]

      await animate(sequence);

      increasecurrentIdx(); // to initialize the animation for the next suggestion
    }

    startAnimation();
  }, [animate, haltDuration, increasecurrentIdx])

  return (
    <div ref={scope} className='text-nowrap overflow-hidden'>
      {
        text.split('').map((t, i) => (
          <motion.span
            initial={{
              y: 20,
              opacity: 0,
              filter: 'blur(10px)'
            }}
            className='inline-block whitespace-pre-wrap text-sm text-muted-foreground pointer-events-none select-none'
            aria-hidden={true}
            key={`${t}-${i}`}
          >
            {t}
          </motion.span>
        ))
      }
    </div>
  )
}

export { AnimatedSearchInput }
