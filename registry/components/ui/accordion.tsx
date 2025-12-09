'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cn } from '@/lib/utils';
import { IconChevronDown } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'motion/react'

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(
  ({ className, ...props }, ref) => (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(
        'divide-y divide-border',
        className
      )}
      {...props}
    />
  )
)
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(
  ({ children, className, ...props }, ref) => {
    return (
      <AccordionPrimitive.Header className='mt-0'>
        <AccordionPrimitive.Trigger
          ref={ref}
          className={cn(
            'flex w-full justify-between p-2 group cursor-pointer',
            className
          )}
          {...props}
        >
          <span className='group-hover:ml-2 text-left transition-all duration-200 text-base font-medium'>{children}</span>
          <IconChevronDown size={18} aria-hidden={true} className='text-muted-foreground shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180' />
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    )
  }
)
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

type AccordionContentProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Content
> & {
  animationDuration?: number
}

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(
  ({ className, children, animationDuration = 0.3, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const contentRef = React.useRef<null | HTMLDivElement>(null);

    React.useEffect(() => {
      const node = contentRef.current;
      if (!node) return;

      // To observe the change in the state of the content
      const observer = new MutationObserver(() => {
        const newState = node.getAttribute('data-state');
        setIsOpen(newState === 'open');
      });

      observer.observe(node, { attributes: true, attributeFilter: ['data-state'] });

      return () => observer.disconnect();
    }, []);

    return (
      <AccordionPrimitive.Content
        forceMount
        ref={contentRef}
        {...props}
        className='overflow-hidden transition-all duration-200'
      >
        <AnimatePresence initial={false}>
          {
            isOpen && (
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0,
                  filter: 'blur(10px)',
                  scale: 0.95
                }}
                animate={{
                  height: 'auto',
                  opacity: 1,
                  filter: 'blur(0px)',
                  scale: 1
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                  filter: 'blur(10px)',
                  scale: 0.95
                }}
                transition={{
                  duration: animationDuration,
                  ease: 'easeInOut',
                  type: 'tween',
                }}
              >
                <div
                  ref={ref}
                  className={cn(
                    'px-4 pb-4 text-sm',
                    className
                  )}
                >
                  {children}
                </div>
              </motion.div>
            )
          }
        </AnimatePresence>
      </AccordionPrimitive.Content>
    )
  }
)
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
