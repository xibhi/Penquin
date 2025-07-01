import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import React from 'react';

const Terminal = ({ command }: { command: string }) => {

  return (
    <div className="mt-4 w-full max-w-md mx-auto h-max rounded-lg shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]">
      <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-gray-400 text-sm ml-4">Terminal</div>
        </div>

        {/* Terminal Body */}
        <div className="bg-zinc-900 text-green-400 px-4 font-mono text-sm">
          {/* Current Command Line */}
          <div className="flex items-center">
            <span className="text-blue-400">user@terminal</span>
            <span className="text-white">:</span>
            <span className="text-purple-400">~</span>
            <span className="text-white">$ </span>
            <span className='mx-1'>
              <CodeBlock keepBackground className='border-none'>
                <Pre className='font-mono pl-1 pr-16 text-left'>
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