'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FaExternalLinkAlt } from 'react-icons/fa'

interface scanner {
    name: string
    description: string
    link: string
}

const scanner: scanner[] = [
    {
        "name": "BeVigil",
        "description": "OSINT-based mobile app security scanner",
        "link": "https://bevigil.com/osint-api"
    }
]

export function AutomatedScanners() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {scanner.map((scanner) => (
                    <motion.div
                        key={scanner.name}
                        className="projects h-full border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors flex flex-col"
                    >
                        <div className="space-y-1 flex-1 flex flex-col">
                            <p className="text-lg leading-snug">
                                {scanner.name}
                            </p>

                            <div className="pt-2 mt-auto">
                                <div className='flex gap-2 h-max flex-row'>
                                    {
                                        scanner.link && (
                                            <Button variant={'outline'} size={'small'} asChild className='text-xs group/button border-border hover:bg-white hover:text-black no-underline transition-all duration-300 ease-in-out active:scale-95'>
                                                {(() => {
                                                    const isExternal = typeof scanner.link === 'string' && !scanner.link.startsWith('/');
                                                    return (
                                                        <Link href={scanner.link} target={isExternal ? '_blank' : undefined} rel="noopener noreferrer">
                                                            <FaExternalLinkAlt size={14} className='group-hover/button:-rotate-12 group-hover/button:scale-110 rotate-0 transition-transform duration-300 ease-out' />
                                                            <span className='ml-2'>Watch Video</span>
                                                        </Link>
                                                    );
                                                })()}
                                            </Button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
