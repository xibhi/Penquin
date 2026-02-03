'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FaYoutube } from "react-icons/fa";

interface Tutorials {
    name: string
    description: string
    yt?: string
}

const tutorials: Tutorials[] = [
    {
        "name": "Mobile Pentesting by Intigriti",
        "description": "Mobile penetration testing playlist",
        "yt": "https://www.youtube.com/playlist?list=PLmqenIp2RQcjBWzwMZQbIkbuVDmkYi_KF"
    },
    {
        "name": "Android Bug Bounty Playlist",
        "description": "Android bug bounty hunting tutorials",
        "yt": "https://www.youtube.com/playlist?list=PL1f72Oxv5SylOECx9M34pLZlNa7YkJJ14"
    },
    {
        "name": "How to Hack Android Apps (Frida)",
        "description": "Tutorial on hacking Android apps using Frida",
        "yt": "https://www.youtube.com/watch?v=mr64si_-YwI"
    },
    {
        "name": "How to Bypass SSL Pinning",
        "description": "Guide to bypassing SSL pinning in mobile apps",
        "yt": "https://www.youtube.com/watch?v=vjCF_O6aZIg"
    },
    {
        "name": "How to Root Android Emulator in 2 Minutes",
        "description": "Quick guide to rooting Android emulator",
        "yt": "https://www.youtube.com/watch?v=OLgmPxTHLuY"
    },
    {
        "name": "Intercepting Android App Traffic with BurpSuite",
        "description": "Tutorial on intercepting Android traffic",
        "yt": "https://www.youtube.com/watch?v=xp8ufidc514"
    },
    {
        "name": "Mobile Application Pentesting",
        "description": "Mobile application penetration testing playlist",
        "yt": "https://www.youtube.com/playlist?list=PLxlnw7Sfbtf9pBNKKQPJTSyI8KNHvgoMJ"
    },
    {
        "name": "Finding Sensitive Data in Android Apps with Nerdwell",
        "description": "Guide to finding sensitive data in Android apps",
        "yt": "https://www.youtube.com/watch?v=D_-mHBkfThI"
    },
    {
        "name": "Exploiting Android Deep Links and Exported Components",
        "description": "Tutorial on exploiting Android vulnerabilities",
        "yt": "https://www.youtube.com/watch?v=lg1sN8njSYs"
    },
    {
        "name": "Mobile App Pentesting by Hacking Simplified",
        "description": "Mobile app pentesting playlist",
        "yt": "https://www.youtube.com/playlist?list=PLGJe0xGh7cH2lszCZ7qwsqouEK23XCMGp"
    },
    {
        "name": "Android Security Testing",
        "description": "Android security testing guide",
        "yt": "https://www.youtube.com/watch?v=6-M_7O3A8AI"
    },
    {
        "name": "Full Android Penetration Testing Course Playlist",
        "description": "Complete Android pentesting course",
        "yt": "https://www.youtube.com/playlist?list=PLwk2o8vr7P8EyIA27vaxCXUUaGHRZj49t"
    },
    {
        "name": "Android App Penetration Testing - OWASP Top 10",
        "description": "OWASP Top 10 for Android apps",
        "yt": "https://www.youtube.com/playlist?list=PLdGbzQX3gR8JJkl2J4VmBckqhLhA_mfNY"
    },
    {
        "name": "Bypass Biometrics in Mobile Apps",
        "description": "Guide to bypassing biometric authentication",
        "yt": "https://www.youtube.com/watch?v=zIaKX3zgNF8"
    },
    {
        "name": "Intercept traffic with Objection and Burp",
        "description": "Traffic interception using Objection and Burp",
        "yt": "https://www.youtube.com/watch?v=Ft3H-3J67UE"
    },
    {
        "name": "Hacking and Pentesting Android Apps",
        "description": "Android app hacking and pentesting playlist",
        "yt": "https://www.youtube.com/playlist?list=PL5eTpNI3Q8oUbw9vozVYatATMKKsDtnoJ"
    },
    {
        "name": "Hacking and Pentesting iOS Apps",
        "description": "iOS app hacking and pentesting playlist",
        "yt": "https://www.youtube.com/playlist?list=PL5eTpNI3Q8oVedOucH_DAdd6SP6wc-KSD"
    },
    {
        "name": "Android Application Pen-testing Course",
        "description": "Android application penetration testing course",
        "yt": "https://www.youtube.com/playlist?list=PL4S940IsHJYWhhYOpBk6Y-U9nTQq2omae"
    }
]

export function VideoTutorials() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutorials.map((tutorial) => (
                    <motion.div
                        key={tutorial.name}
                        className="projects h-full border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors flex flex-col"
                    >
                        <div className="space-y-1 flex-1 flex flex-col">
                            <div className="flex items-start justify-between">
                                <h3 className="text-lg font-semibold leading-tight">
                                    {tutorial.name}
                                </h3>
                            </div>

                            <p className="text-sm text-muted-foreground leading-snug">
                                {tutorial.description}
                            </p>

                            <div className="pt-2 mt-auto">
                                <div className='flex gap-2 h-max flex-row'>
                                    {
                                        tutorial.yt && (
                                            <Button variant={'outline'} size={'small'} asChild className='text-xs group/button border-border hover:bg-white hover:text-black no-underline transition-all duration-300 ease-in-out active:scale-95'>
                                                {(() => {
                                                    const isExternal = typeof tutorial.yt === 'string' && !tutorial.yt.startsWith('/');
                                                    return (
                                                        <Link href={tutorial.yt} target={isExternal ? '_blank' : undefined} rel="noopener noreferrer">
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
