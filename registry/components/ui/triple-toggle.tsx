import * as React from 'react'

import { cn } from '@/lib/utils';

import { IconPointFilled } from '@tabler/icons-react';
import { motion } from 'motion/react'

const SLIDER_OFFSET = '12rem';
const SUB_SLIDER_OFFSET = '5.5rem';

const TripleToggle = ({
  options,
  toggleOptions,
  value,
  className
}: ToggleProps) => {
  const [doubleToggleOn, setDoubleToggleOn] = React.useState(
    options.grouped.subOptions.includes(value)
  );

  // Set the double toggle (subslider) to 'on' or 'off' according to the selected option
  React.useEffect(() => {
    setDoubleToggleOn(value !== options.main)
  }, [value, options.main])

  // If no option is selected from subtoggle, select the first option as default
  React.useEffect(() => {
    if (doubleToggleOn && !options.grouped.subOptions.includes(value))
      toggleOptions(options.grouped.subOptions[0]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doubleToggleOn])

  const optionsVariant = {
    on: {
      scale: 1,
      y: -12,
      width: '100%',
      transition: {
        duration: 0.2,
        type: 'tween',
        ease: 'easeInOut'
      }
    },
    off: {
      scale: 0.8,
      y: 0,
      width: 'max-content',
      transition: {
        duration: 0.2,
        type: 'tween',
        ease: 'easeInOut'
      }
    }
  }

  const sliderVariant = {
    on: {
      x: '12rem',
      transition: {
        duration: 0.3,
        type: 'tween',
        ease: 'easeInOut'
      }
    },
    off: {
      x: 0,
      transition: {
        duration: 0.3,
        type: 'tween',
        ease: 'easeInOut'
      }
    }
  }

  const titleVariant = {
    on: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.3,
        type: 'tween',
        ease: 'easeInOut'
      }
    },
    off: {
      opacity: 1,
      scale: 1,
      y: 7,
      transition: {
        duration: 0.3,
        type: 'tween',
        ease: 'easeInOut'
      }
    }
  }

  return (
    <motion.div
      initial={false}
      animate={doubleToggleOn ? 'on' : 'off'}
      className={cn(
        'p-1 bg-secondary rounded-full cursor-pointer w-max',
        className
      )}
    >
      <div className='h-12 w-[24rem] rounded-full flex relative'>
        {/* Slider */}
        <motion.div
          initial={{
            x: doubleToggleOn ? SLIDER_OFFSET : 0
          }}
          variants={sliderVariant}
          className='bg-primary h-full w-1/2 absolute rounded-full'
        />

        <div
          className={cn(
            'h-full w-1/2 rounded-full flex justify-center items-center relative transition-colors',
            doubleToggleOn ? 'text-primary' : 'text-primary-foreground'
          )}
          onClick={() => toggleOptions(options.main)}
        >
          {options.main}
        </div>
        <div
          className='h-full w-1/2 flex flex-col justify-center items-center'
          onClick={() => setDoubleToggleOn(true)}
        >
          <motion.div variants={titleVariant}>
            {options.grouped.title}
          </motion.div>

          <motion.div
            variants={optionsVariant}
            className={cn(
              'flex justify-between h-full w-full p-1',
              doubleToggleOn ? 'text-primary-foreground' : 'text-primary'
            )}
          >

            {/* Sub Slider */}
            {
              doubleToggleOn && (
                <motion.div
                  initial={{
                    x: 0,
                  }}
                  animate={{
                    x: value !== options.grouped.subOptions[1] ? 0 : SUB_SLIDER_OFFSET,
                  }}

                  transition={{
                    type: 'tween',
                    ease: 'easeInOut',
                    duration: 0.2
                  }}

                  className='bg-primary-foreground h-10 -top-1 w-1/2 absolute rounded-full -z-1'
                />
              )
            }

            <div
              onClick={() => toggleOptions(options.grouped.subOptions[0])}
              className={cn(
                'w-1/2 text-center h-full relative',
                'transition-colors duration-200',
                doubleToggleOn && (value === options.grouped.subOptions[0] ? 'text-primary' : 'text-primary-foreground'),
              )}
            >
              {options.grouped.subOptions[0]}
            </div>

            <IconPointFilled className={`my-auto transition-all duration-200 ${doubleToggleOn && 'opacity-0 scale-80'}`} size={12} />

            <div
              onClick={() => toggleOptions(options.grouped.subOptions[1])}
              className={cn(
                'w-1/2 text-center h-full',
                'transition-colors duration-200',
                doubleToggleOn && (value === options.grouped.subOptions[1] ? 'text-primary' : 'text-primary-foreground'),
              )}
            >
              {options.grouped.subOptions[1]}
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  )
}

export interface ToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  options: {
    main: string,
    grouped: {
      title: string,
      subOptions: [string, string]
    }
  }
  toggleOptions: (val: string) => void,
  value: string
}

export { TripleToggle }