import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from './ui/Btn'
import { TagItem, Tags } from '@/components/Tags'
import Link from 'next/link'
import { IconBrandFramerMotion, IconBrandNextjs, IconBrandTailwind, IconBrandReact, IconBrandGithub } from '@tabler/icons-react'
import Badge from './Badge'
import { motion } from 'motion/react'

const Hero = () => {
  const variant = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.96,
      filter: 'blur(10px)',
      transition: {
        duration: 0.3
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.2
          }
        }
      }}
      className='p-8 relative w-full mask-y-from-70% mask-y-to-100% md:min-h-[95vh] flex flex-col pt-20 md:pt-30 items-center'
    >
      <div
        className={cn(
          'absolute inset-0 -z-50',
          '[background-size:40px_40px]',
          '[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]',
          'dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]',
        )}
      />
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black' />
      <motion.div variants={variant}>
        <Badge />
      </motion.div>
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black' />
      <motion.h1 variants={variant} className='bg-clip-text text-transparent text-center py-2 relative z-20 font-bold font-sans tracking-tight text-4xl md:text-[5.5rem]/22 bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-neutral-700 dark:to-white'>
        Cut the Clutter.<br />Command. Exploit. Repeat.
      </motion.h1>
      <motion.p variants={variant} className='mx-auto max-w-xl text-center text-muted-foreground md:text-base text-sm'>
        Supercharge your bug bounty workflow: pre-built commands, optimized workflows, and expert-curated resources — hack smarter, not harder.
      </motion.p>
      <motion.div variants={variant} className='mx-auto w-max flex gap-2 mt-8'>
        <Button asChild className='w-max mx-auto'>
          <Link href={'https://github.com/xibhi/penquin'} className='flex items-center gap-2'>
            <IconBrandGithub size={20} />
            View on GitHub
          </Link>
        </Button>
      </motion.div>
      <motion.div variants={variant} className='mx-auto my-8 w-max'>
        <Tags overlap={true}>
          {
            techs.map(t => (
              <TagItem item={t} key={t.name} />
            ))
          }
        </Tags>
      </motion.div>
    </motion.div>
  )
}

const techs = [
  {
    name: 'Next.js',
    logo: <IconBrandNextjs size={32} />
  },
  {
    name: 'React',
    logo: <IconBrandReact size={32} />
  },
  {
    name: 'Tailwind CSS',
    logo: <IconBrandTailwind size={32} />
  },
  {
    name: 'Motion',
    logo: <IconBrandFramerMotion size={32} />
  }
]

export default Hero