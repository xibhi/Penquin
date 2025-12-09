import React from 'react'

const Badge = () => {
  return (
    <div className='relative z-50 m-2 bg-linear-to-r from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800 border dark:border-white border-neutral-800/80 px-3 md:px-5 md:py-1 rounded-full shadow-muted-foreground hover:shadow-lg/30 transition-shadow duration-300 select-none'>
      <span className='text-[12px] md:text-sm font-sans text-primary'>Everything You Need</span>
    </div>
  )
}

export default Badge