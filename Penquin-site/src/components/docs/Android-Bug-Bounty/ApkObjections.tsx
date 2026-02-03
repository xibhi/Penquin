'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FaYoutube } from "react-icons/fa";

interface Objection {
    title: string
    link: string
}

const objections: Objection[] = [
    {
        "title": "Learn Objection Basics",
        "link": "https://www.youtube.com/watch?v=Hu8m_XseXm4"
    },
    {
        "title": "Patching Applications Automatically using Objection",
        "link": "https://www.youtube.com/watch?v=Hu8m_XseXm4&t=51s"
    },
    {
        "title": "Pin Bypass via Objection",
        "link": "https://www.youtube.com/watch?v=1hJiMGjUnDw"
    },
    {
        "title": "Objection + Frida Demo",
        "link": "https://www.youtube.com/watch?v=S8Qt1dWfPjs"
    },
    {
        "title": "Advanced Bypass Techniques",
        "link": "https://www.youtube.com/watch?v=087Vsk5a9RY"
    },
    {
        "title": "Bypassing Multiple Defenses",
        "link": "https://www.youtube.com/watch?v=BQwyy338Zag"
    },
    {
        "title": "Root Detection Bypass",
        "link": "https://www.youtube.com/watch?v=DTaoT9Lgmug"
    },
    {
        "title": "Bypassing Android SSL Pinning using Frida | Objection and NOX Player",
        "link": "https://www.youtube.com/watch?v=9VnbNY1uf7c&list=PLn4fSTVui_Gwrvhlc7HtHwg3kvZo5b4xV&index=34"
    },
    {
        "title": "Quick and dirty Frida, with adb and objection",
        "link": "https://www.youtube.com/watch?v=sz0PjrV3ZsQ"
    },
    {
        "title": "Part 1: Fundamentals",
        "link": "https://www.youtube.com/watch?v=5-0KsD7saUg"
    },
    {
        "title": "Part 2: Intermediate",
        "link": "https://www.youtube.com/watch?v=6lRIR6EQUPI"
    },
    {
        "title": "Part 3: Advanced",
        "link": "https://www.youtube.com/watch?v=bJgR5PKv2t0"
    },
    {
        "title": "Objection Latest Version Issue with Frida",
        "link": "https://infosecwriteups.com/the-frida-objection-setup-guide-solving-version-hell-on-android-ios-timeless-guide-f55eb98459a0"
    },
    {
        "title": "BurpSuite for Android Pentesting Playlist",
        "link": "https://www.youtube.com/playlist?list=PLH5GW4W70qp86GdyQNLY37GcIF0nVksup"
    }
]

export function ApkObjections() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {objections.map((objection) => (
                    <motion.div
                        key={objection.title}
                        className="projects h-full border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors flex flex-col"
                    >
                        <div className="space-y-1 flex-1 flex flex-col">
                            <p className="text-lg leading-snug">
                                {objection.title}
                            </p>

                            <div className="pt-2 mt-auto">
                                <div className='flex gap-2 h-max flex-row'>
                                    {
                                        objection.link && (
                                            <Button variant={'outline'} size={'small'} asChild className='text-xs group/button border-border hover:bg-white hover:text-black no-underline transition-all duration-300 ease-in-out active:scale-95'>
                                                {(() => {
                                                    const isExternal = typeof objection.link === 'string' && !objection.link.startsWith('/');
                                                    return (
                                                        <Link href={objection.link} target={isExternal ? '_blank' : undefined} rel="noopener noreferrer">
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
