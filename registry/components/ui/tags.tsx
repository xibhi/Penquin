'use client'

import React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

type ItemType = {
  name: string,
  logo: React.ReactNode
}

const Tags = ({ overlap, children }: { overlap: boolean, children: React.ReactNode }) => {
  return (
    <div 
      className='flex justify-center items-center'
      style={{ 
        '--tag-overlap': overlap ? '-0.2rem' : '0',
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

Tags.displayName = 'Tags'

const TagItem = ({ item }: { item: ItemType }) => {
  return (
    <motion.div
      layout
      whileHover={'animate'}
      whileTap={'animate'}
      initial={'initial'}
      className={cn(
        'flex cursor-pointer',
        'mx-[var(--tag-overlap)]'
      )}
    >
      <motion.div
        variants={{
          animate: { paddingRight: 2 }
        }}
        transition={{
          type: 'spring'
        }}
        className='flex items-center'
      >
        {item.logo}
      </motion.div>
      <motion.div
        variants={{
          initial: { width: 0 },
          animate: { width: 'auto' },
          exit: { width: 0 }
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
          mass: 0.5
        }}
        className='overflow-hidden whitespace-nowrap font-sans'
      >
        {item.name}
      </motion.div>
    </motion.div>
  )
}

TagItem.displayName = 'TagItem'

export { Tags, TagItem }