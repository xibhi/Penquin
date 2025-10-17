'use client'

import React from 'react'
import DarkModeToggle from './DarkModeToggle'
import Image from 'next/image'
import Link from 'next/link'
import { FaGithub, FaXTwitter } from 'react-icons/fa6'
import { FaSearch } from "react-icons/fa";
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname()
  const isDocs = pathname?.startsWith('/docs')

  return (
    <div className='h-16 w-full'>
      <div className='fixed w-full inset-x-0 bg-background border-b border-border top-0 z-50 flex justify-between items-center md:px-20 px-8 py-4'>
        <div className='flex items-center'>
          <Link href={'/'} className='flex items-center gap-2'>
            <Image
              src={'/Penquin.png'}
              height={30}
              width={30}
              alt='Logo'
              className='rounded-md invert dark:invert-0'
            />
            <h2 className='text-xl font-sans font-bold tracking-tight'>Penquin</h2>
          </Link>
          {isDocs && (
            <Link href={'/docs'} className='hidden md:flex items-center gap-2 ml-6 text-sm text-foreground no-underline'>
              <span className='font-medium'>Documentation</span>
            </Link>
          )}
        </div>
        <div className='flex items-center gap-2'>
          {isDocs && (
            <button
              type='button'
              aria-label='Search documentation'
              className='hidden sm:flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors'
            >
              <FaSearch className='h-3.5 w-3.5' />
              <span className='hidden md:inline'>Search documentation..</span>
              <kbd className='ml-2 hidden lg:inline-flex items-center justify-center rounded border bg-muted px-1.5 text-[10px] leading-none'>K</kbd>
            </button>
          )}
          <Link href={'https://github.com/xibhi/penquin'} target={'_blank'} className='p-2 rounded-full cursor-pointer'><FaGithub size={18} /></Link>
          <Link href={'https://x.com/PenquinTool'} target={'_blank'} className='p-2 rounded-full cursor-pointer'><FaXTwitter size={18} /></Link>
          <DarkModeToggle />
        </div>
      </div>
    </div>
  )
}

export default Navbar
