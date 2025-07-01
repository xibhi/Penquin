import React from 'react'
import Terminal from './Terminal'

const Features = () => {
  return (
    <div className='md:max-w-4xl md:mx-auto mx-6 max-md:my-8 text-center'>
      <h3 className='text-3xl md:text-6xl font-sans tracking-tight font-bold'>
        Simpler Than Copy-Paste
      </h3>
      <p className='text-sm md:text-base my-1 text-muted-foreground'>No more endless file searching. Vynk delivers the perfect code snippets right to your fingertips.</p>
      <div className='flex flex-col gap-4 md:my-12 my-6'>
        <div className='flex flex-col md:flex-row gap-4 md:gap-8 md:text-left min-h-[18rem] justify-center items-center'>
          <div className='md:p-8 space-y-2'>
            <h2 className='font-sans font-bold tracking-tight text-3xl'>Initialize Vynk</h2>
            <p className='text-muted-foreground text-sm'>Set up Vynk in your project with a single command and get your configuration ready.</p>
          </div>
          <Terminal command={'npx vynk init'} />
        </div>
        <div className='flex flex-col-reverse md:flex-row gap-4 md:gap-8 md:text-left min-h-[18rem] justify-center items-center'>
          <Terminal command={'npx vynk add {compName}'} />
          <div className='md:p-8 space-y-2'>
            <h2 className='font-sans font-bold tracking-tight text-4xl'>Add Components</h2>
            <p className='text-muted-foreground text-sm'>Instantly integrate pre-built components, blocks, and code snippets into your project.</p>
          </div>
        </div>
        <div className='md:min-h-[18rem] min-h-[10rem] flex flex-col justify-center items-center'>
          <h1 className='font-sans font-bold tracking-tight text-3xl md:text-5xl'>Ready to Build Something Amazing?</h1>
          <p className='text-muted-foreground'>Start shipping your projects faster than ever before.</p>
        </div>
      </div>
    </div>
  )
}

export default Features