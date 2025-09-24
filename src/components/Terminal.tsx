"use client"
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import React, { useEffect, useRef, useState } from 'react';

const Terminal = ({ command }: { command: string }) => {
  const [copied, setCopied] = useState(false);
  const leaveTimeoutRef = useRef<number | null>(null);
  const autoResetTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (leaveTimeoutRef.current) window.clearTimeout(leaveTimeoutRef.current);
      if (autoResetTimeoutRef.current) window.clearTimeout(autoResetTimeoutRef.current);
    };
  }, []);

  return (
    <div className="mt-4 w-full h-max rounded-lg shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]">
      <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="text-gray-400 text-sm ml-4">Terminal</div>
          </div>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(command);
              setCopied(true);
              if (autoResetTimeoutRef.current) window.clearTimeout(autoResetTimeoutRef.current);
              autoResetTimeoutRef.current = window.setTimeout(() => setCopied(false), 2500);
            }}
            onMouseEnter={() => {
              if (leaveTimeoutRef.current) {
                window.clearTimeout(leaveTimeoutRef.current);
                leaveTimeoutRef.current = null;
              }
            }}
            onMouseLeave={() => {
              if (leaveTimeoutRef.current) window.clearTimeout(leaveTimeoutRef.current);
              leaveTimeoutRef.current = window.setTimeout(() => setCopied(false), 1000);
            }}
            className="relative text-xs px-2 py-1 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-200 transition-colors"
            aria-label="Copy command"
            title="Copy command"
          >
            <span className={`transition-opacity duration-300 ${copied ? 'opacity-0' : 'opacity-100'}`}>Copy</span>
            <span className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${copied ? 'opacity-100' : 'opacity-0'}`}>Copied</span>
          </button>
        </div>

        {/* Terminal Body */}
        <div className="bg-zinc-900 text-green-400 px-4 font-mono text-sm overflow-x-auto">
          {/* Current Command Line */}
          <div className="flex items-center">
            <span className="text-blue-400">user@terminal</span>
            <span className="text-white">:</span>
            <span className="text-purple-400">~</span>
            <span className="text-white">$ </span>
            <span className='mx-1'>
              <CodeBlock keepBackground className='border-none'>
                <Pre className='font-mono pl-1 pr-16 text-left whitespace-pre min-w-max'>
                  {command}
                </Pre>
              </CodeBlock>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;