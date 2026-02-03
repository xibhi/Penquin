import React from 'react'
import { Button } from '../ui/Btn'
import { IconBrandGithub } from '@tabler/icons-react'
import Link from 'next/link'

const CTA = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-8 mx-auto mt-30 mb-12'>
      <div className='md:space-y-2'>
        <h2 className='font-sans tracking-tight text-3xl md:text-5xl font-bold mx-8 text-center'>
          Streamline Your Bug Bounty Workflow — Hack Smarter, Not Harder
        </h2>
      </div>
      <div className='flex gap-4'>
        <Button asChild className='w-max'>
          <Link href={'https://github.com/xibhi/penquin'} className='flex items-center gap-2'>
            <IconBrandGithub size={20} />
            View on GitHub
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default CTA
