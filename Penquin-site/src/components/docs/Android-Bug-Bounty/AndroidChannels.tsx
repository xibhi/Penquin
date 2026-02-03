'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FaYoutube } from "react-icons/fa";

interface Channels {
    name: string
    description: string
    yt?: string
}

const channels: Channels[] = [
    {
        "name": "CorSecure",
        "description": "Mobile security content creator",
        "yt": "https://www.youtube.com/@CorSecure/videos"
    },
    {
        "name": "B3nacSec",
        "description": "Mobile security content creator",
        "yt": "https://www.youtube.com/@B3nacSec/videos"
    },
    {
        "name": "LaurieWired",
        "description": "Mobile security content creator",
        "yt": "https://www.youtube.com/@lauriewired/videos"
    },
    {
        "name": "AppSecHub",
        "description": "Application security content creator",
        "yt": "https://www.youtube.com/@appsechub/videos"
    },
    {
        "name": "Hacking Simplified",
        "description": "Mobile security content creator",
        "yt": "https://www.youtube.com/@HackingSimplifiedAS/videos"
    }
]

export function AndroidChannels() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {channels.map((channel) => (
                    <motion.div
                        key={channel.name}
                        className="projects h-full border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors flex flex-col"
                    >
                        <div className="space-y-1 flex-1 flex flex-col">
                            <div className="flex items-start justify-between">
                                <h3 className="text-lg font-semibold leading-tight">
                                    {channel.name}
                                </h3>
                            </div>

                            <p className="text-sm text-muted-foreground leading-snug">
                                {channel.description}
                            </p>

                            <div className="pt-2 mt-auto">
                                <div className='flex gap-2 h-max flex-row'>
                                    {
                                        channel.yt && (
                                            <Button variant={'outline'} size={'small'} asChild className='text-xs group/button border-border hover:bg-white hover:text-black no-underline transition-all duration-300 ease-in-out active:scale-95'>
                                                {(() => {
                                                    const isExternal = typeof channel.yt === 'string' && !channel.yt.startsWith('/');
                                                    return (
                                                        <Link href={channel.yt} target={isExternal ? '_blank' : undefined} rel="noopener noreferrer">
                                                            <FaYoutube size={14} className='group-hover/button:-rotate-12 group-hover/button:scale-110 rotate-0 transition-transform duration-300 ease-out' />
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
