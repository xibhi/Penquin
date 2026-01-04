import React, { useRef } from 'react'
import { BentoGrid, BentoGridItem } from '@/components/BentoGrid'
import { motion, useInView } from 'motion/react'

const Features = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.3
  })

  return (
    <div ref={containerRef} className='md:max-w-3xl mx-auto my-8 md:my-18'>
      <motion.h2
        initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
        animate={isInView ? { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.3 } } : {}}
        className='bg-clip-text text-transparent py-2 max-md:mx-6 relative z-20 font-bold font-sans tracking-tight text-4xl md:text-7xl bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-neutral-700 dark:to-white'
      >
        Features
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, filter: 'blur(10px)', y: 40 }}
        animate={isInView ? { opacity: 1, filter: 'blur(0px)', y: 0, transition: { delay: 0.4, duration: 0.3 } } : {}}
      >
        <BentoGrid className='md:max-w-3xl max-w-[calc(100%-2rem)] mx-auto my-8 md:auto-rows-[12rem]'>
          {features.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              className={item.className}
            />
          ))}
        </BentoGrid>
      </motion.div>
    </div>
  )
}

const features = [
  {
    title: 'Browser Tools',
    description: 'Critical security extensions for passive scanning, request tampering, and vulnerability detection — seamlessly integrated.',
    className: 'md:col-span-2'
  },
  {
    title: 'Structured Recon',
    description: 'Subdomain enumeration → endpoint mapping → targeted scans. Clear, stepwise, effective.',
    className: 'md:col-span-1'
  },
  {
    title: 'Commands. Ready. Go',
    description: ' Pre-built commands for scanning, exploitation, and automation — save time, execute faster.',
    className: 'md:col-span-1'
  },
  {
    title: 'Hacker Insights, Curated',
    description: 'Resumes, channels, follow lists, writeups, books, CLI tips, and WSL setup guides — everything you need to level up',
    className: 'md:col-span-2'
  }
]

export default Features