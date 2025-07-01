import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='max-w-8xl mx-auto'>
      <DocsLayout 
        tree={source.pageTree} 
        {...baseOptions} 
        sidebar={{ 
          collapsible: false, 
          className: 'h-[calc(100vh-4rem)] top-16' 
        }} 
      >
        <div className='flex max-w-screen'>
          {children}
        </div>
      </DocsLayout>
    </div>
  );
}