'use client'

import * as React from 'react'
import { useAnimate, stagger, motion } from 'motion/react'
import { cn } from '@/lib/utils';

interface TextAnimationProps {
  text: string,
  className?: string,
  delay?: number,
  duration?: number,
  startDelay?: number,
  staggerChildren?: number,
  by?: 'words' | 'chars' | 'lines' | 'none',
  blur?: boolean,
  fade?: boolean,
  ease?: 'easeInOut' | 'easeIn' | 'easeOut',
  direction?: 'top' | 'bottom' | 'right' | 'left',
  animationDirection?: 'default' | 'reverse'
}

const TextAnimation = ({
  text,
  className,
  delay = 0,
  duration = 0.3,
  staggerChildren = 0.05,
  by = 'chars',
  blur = true,
  fade = true,
  ease = 'easeInOut',
  direction = 'bottom',
  animationDirection = 'default'
}: TextAnimationProps) => {
  const [scope, animate] = useAnimate();
  const [segments, setSegments] = React.useState<string[] | null>(null);

  React.useEffect(() => {
    let segments: string[] = [];

    switch (by) {
      case 'words':
        segments = text.split(' ');
        break;
      case 'lines':
        segments = text.split('\n');
        break;
      case 'none':
        segments = [text];
        break;
      default:
        segments = text.split('');
        break;
    }

    setSegments(segments);
  }, [by, text]);

  // Animation = start -> end
  const start = React.useMemo(() => (
    {
      opacity: fade ? 0 : 1,
      y: direction === 'bottom' ? 20 : direction === 'top' ? -20 : 0,
      x: direction === 'right' ? 20 : direction === 'left' ? -20 : 0,
      filter: blur ? 'blur(10px)' : 'none',
    }
  ), [fade, direction, blur]);

  // Animation = end -> start
  const end = React.useMemo(() => (
    {
      opacity: 1,
      y: 0,
      x: 0,
      filter: 'blur(0px)'
    }
  ), [])

  React.useEffect(() => {
    if (segments) {
      const startAnimation = () => {
        animate(
          'span',
          animationDirection === 'default' ? end : start,
          {
            duration: duration,
            ease: ease,
            delay: stagger(staggerChildren),
          }
        )
      }

      setTimeout(startAnimation, delay * 1000);
    }
  }, [segments, delay, animate, animationDirection, duration, ease, start, end, staggerChildren])

  if (!segments) return null;

  return (
    <div
      ref={scope}
      className={cn(
        'max-w-4xl mx-auto font-bold text-4xl whitespace-pre-wrap',
        className
      )}
    >
      {
        segments.map((segment, idx) => (
          <motion.span
            initial={animationDirection === 'default' ? start : end}
            // custom styles for different values of by to display the spaces
            className={cn(
              'inline-block',
              by === 'lines' ? 'block' : 'inline-block whitespace-pre',
              by === 'words' && 'mx-1',
            )}
            key={idx}
          >
            {segment}
          </motion.span>
        ))
      }
    </div>
  )
}

export { TextAnimation }