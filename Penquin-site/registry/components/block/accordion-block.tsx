'use client'

import React from 'react'
import { motion, useInView } from 'motion/react'
import { cn } from '@/lib/utils'
import { Headline } from '../ui/headline'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'

export type AccordionItemType = {
  trigger: string,
  content: string
}

const AccordionBlock = ({
  title,
  accordionItems,
  className
}: {
  title: React.ReactNode,
  accordionItems: AccordionItemType[],
  className?: string
}) => {
  const scope = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(
    scope,
    {
      once: false,
      amount: 0.3
    }
  )

  const [startAnimation, setStartAnimation] = React.useState(false);

  React.useEffect(() => {
    if (isInView && !startAnimation) setStartAnimation(true)
  }, [isInView, startAnimation, setStartAnimation]);

  const appearVariant = {
    animate: {
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      y: 0
    },
    halt: {
      opacity: 0.5,
      filter: 'blur(10px)',
      scale: 0.95,
      y: 100
    }
  }

  return (
    <motion.div
      initial={false}
      animate={startAnimation ? 'animate' : 'halt'}
      className={cn(
        'flex flex-col md:flex-row md:gap-16 gap-8 relative md:w-[70%] w-[90%] mx-auto my-18',
        className
      )}
    >
      <motion.div
        variants={appearVariant}
        transition={{
          duration: 0.3
        }}
        ref={scope}
      >
        <Headline className='md:sticky md:top-16 z-50 md:text-start'>{title}</Headline>
      </motion.div>
      <motion.div
        variants={appearVariant}
        transition={{ delay: 0.3, duration: 0.4 }}
        className='md:w-1/2 mx-auto'
      >
        <Accordion type='single' collapsible className='w-full'>
          {
            accordionItems.map((item, idx) => (
              <AccordionItem value={`item-${idx}`} key={`item-${idx}`}>
                <AccordionTrigger>{item.trigger}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))
          }
        </Accordion>
      </motion.div>
    </motion.div>
  )
}

export default AccordionBlock
