import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaGithub, FaXTwitter } from 'react-icons/fa6'

const footLinks = [
  {
    name: 'Essentials',
    href: '/docs'
  },
  {
    name: 'Arsenal',
    href: '/docs/arsenal'
  },
  {
    name: 'Reconnaissance',
    href: '/docs/reconnaissance'
  },
  {
    name: 'Extensions',
    href: '/docs/extensions'
  },
  {
    name: 'Writeups',
    href: '/docs/writeups'
  }
]

const socialLinks = [
  {
    name: 'Twitter / X',
    href: 'https://x.com/xibhi'
  },
  {
    name: 'GitHub',
    href: 'https://github.com/xibhi'
  }
]

const Footer = () => {
  return (
    <div className='p-8 md:px-44'>
      <div className='flex justify-between items-center gap-4 max-md:flex-col'>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2 items-center'>
            <Image
              src={'/Penquin.png'}
              height={30}
              width={30}
              alt='Logo'
              className='rounded-md invert dark:invert-0'
            />
            <h2 className='text-2xl font-sans font-bold tracking-tight'>Penquin</h2>
          </div>
          <p>A product by <Link className='underline hover:text-muted-foreground' href={'https://github.com/xibhi'} target={'_blank'}>Sibhi</Link></p>
        </div>
        <div className='flex gap-28 md:gap-12 my-4 md:my-12 md:mx-18'>
          <ul>
            {
              footLinks.map(l => (
                <li key={l.href} className='hover:text-muted-foreground my-2'>
                  <Link href={l.href}>{l.name}</Link>
                </li>
              ))
            }
          </ul>
          <ul>
            {
              socialLinks.map(l => (
                <li key={l.href} className='hover:text-muted-foreground my-2'>
                  <Link target={'_blank'} href={l.href}>{l.name}</Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
      <div className='flex justify-between items-center max-md:mt-8'>
        <p className='text-muted-foreground text-sm'>&copy; {new Date().getFullYear()}, All rights reserved.</p>
        <div className='flex items-center gap-2'>
          <Link href={'https://github.com/xibhi'} target={'_blank'} className='p-2 rounded-full cursor-pointer'><FaGithub size={18} /></Link>
          <Link href={'https://x.com/xibhi'} target={'_blank'} className='p-2 rounded-full cursor-pointer'><FaXTwitter size={18} /></Link>
        </div>
      </div>
    </div>
  )
}

export default Footer
