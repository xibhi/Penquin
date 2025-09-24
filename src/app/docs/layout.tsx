'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import FileTree from '@/components/FileTree';

export default function Layout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className='min-h-screen flex'>
      {/* Mobile Hamburger Menu */}
      <button
        onClick={toggleSidebar}
        className='fixed top-4 left-4 z-50 lg:hidden p-2 rounded-md bg-background border border-border shadow-lg hover:bg-accent transition-colors'
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
          className='fixed top-4 right-4 z-50 lg:hidden p-2 rounded-md bg-background border border-border shadow-lg hover:bg-accent transition-colors'
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
          className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden'
          onClick={toggleSidebar}
        />
      )}

      {/* FileTree Sidebar */}
      <div className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-72 bg-background border border-border rounded-lg mx-4 my-4 overflow-y-auto z-40 transition-transform duration-300 ease-in-out text-xs ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`} style={{ fontFamily: "'Cabinet Grotesk Medium', sans-serif" }}>
        <div className='p-2 pt-4'>
          <div className='flex items-center justify-between mb-3'>
            <button
              onClick={toggleSidebar}
              className='lg:hidden p-1 rounded-md hover:bg-accent transition-colors'
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
      </div>
      
      {/* Main Content */}
      <div className='min-h-screen w-full lg:ml-80 text-xl' style={{ fontFamily: "'Cabinet Grotesk Medium', sans-serif" }}>
        <div className='max-w-4xl mx-auto px-4 py-4 sm:px-6 pt-16 lg:pt-4'>
          {children}
        </div>
      </div>
    </div>
  );
}


