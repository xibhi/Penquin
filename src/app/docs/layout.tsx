'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import FileTree from '@/components/docs/FileTree';
import { MotionConfig, motion } from 'framer-motion';

export default function Layout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <MotionConfig>
      <div className='min-h-screen flex'>
        {/* Mobile Hamburger Menu */}
        <button
          onClick={toggleSidebar}
          className='fixed top-5 left-4 z-50 lg:hidden p-2 rounded-md bg-background border border-border shadow-lg hover:bg-accent transition-colors'
          aria-label='Toggle sidebar'
        >
          <svg
            className='w-6 h-6 text-foreground'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            {sidebarOpen ? (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            ) : (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            )}
          </svg>
        </button>

        {/* Mobile Back Button - Only show when sidebar is open */}
        {sidebarOpen && (
          <button
            onClick={toggleSidebar}
            className='fixed top-5 right-4 z-50 lg:hidden p-2 rounded-md bg-background border border-border shadow-lg hover:bg-accent transition-colors'
            aria-label='Close sidebar and go back'
          >
            <svg
              className='w-6 h-6 text-foreground'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10 19l-7-7m0 0l7-7m-7 7h18'
              />
            </svg>
          </button>
        )}

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className='fixed inset-0 bg-black/50 backdrop-blur-[1px] z-40 lg:hidden'
            onClick={toggleSidebar}
          />
        )}

        {/* Mobile Sidebar (animated) */}
        <motion.div
          initial={{ x: -320 }}
          animate={{ x: sidebarOpen ? 0 : -320 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-72 bg-background border-r border-border overflow-y-auto z-50 text-xs lg:hidden"
        >
          <div className='p-2 pt-4'>
            <div className='flex items-center justify-between mb-3'>
              <button
                onClick={toggleSidebar}
                className='p-1 rounded-md hover:bg-accent transition-colors'
                aria-label='Close sidebar'
              >
                <svg
                  className='w-5 h-5 text-foreground'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <FileTree />
          </div>
        </motion.div>

        {/* Desktop Sidebar (static) */}
        <div
          className="hidden lg:block fixed left-0 top-20 h-[calc(100vh-5rem)] w-72 bg-background border-r border-border overflow-y-auto z-40 text-xs"
        >
          <div className='p-2 pt-4'>
            <FileTree />
          </div>
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className='min-h-screen w-full lg:ml-72 text-xl'
        >
          <div className='max-w-4xl mx-auto px-4 py-4 sm:px-6 pt-2 lg:pt-4'>
            {children}
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  );
}