'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ImLab } from "react-icons/im";
import { FaGithub } from "react-icons/fa";

interface Apps {
    name: string
    description?: string
    link?: string
    lab?: string
}

const apps: Apps[] = [
    {
        "name": "Oversecured Vulnerable Android App (OVAA)",
        "description": "A vulnerable app showing modern security bugs in Android apps",
        "link": "https://github.com/oversecured/ovaa"
    },
    {
        "name": "Damn Vulnerable Bank",
        "description": "Vulnerable Banking Application for Android",
        "link": "https://github.com/rewanth1997/Damn-Vulnerable-Bank"
    },
    {
        "name": "InsecureShop",
        "description": "Intentionally Vulnerable Android Application",
        "link": "https://github.com/optiv/InsecureShop"
    },
    {
        "name": "Vuldroid",
        "description": "Vulnerable Android Application made with security issues",
        "link": "https://github.com/jaiswalakshansh/Vuldroid"
    },
    {
        "name": "InjuredAndroid",
        "description": "A vulnerable Android application with ctf examples based on bug bounty findings",
        "link": "https://github.com/B3nac/InjuredAndroid"
    },
    {
        "name": "Android-InsecureBankv2",
        "description": "Vulnerable Android application for learning about Android insecurities",
        "link": "https://github.com/dineshshetty/Android-InsecureBankv2"
    },
    {
        "name": "Damn Insecure and Vulnerable app (DIVA)",
        "description": "Damn Insecure and vulnerable App for Android",
        "link": "https://github.com/payatu/diva-android"
    },
    {
        "name": "OWASP-GoatDroid-Project",
        "description": "Fully functional training environment for Android security",
        "link": "https://github.com/jackMannino/OWASP-GoatDroid-Project"
    },
    {
        "name": "Sieve",
        "description": "Password Manager app showcasing common vulnerabilities",
        "link": "https://github.com/mwrlabs/drozer/releases/download/2.3.4/sieve.apk"
    },
    {
        "name": "Mobile Hacking Lab",
        "description": "Mobile Hacking Lab",
        "lab": "https://www.mobilehackinglab.com/free-mobile-hacking-labs"
    },
    {
        "name": "Security Compass Android Labs",
        "description": "Security Compass Android Labs",
        "lab": "https://securitycompass.github.io/AndroidLabs/index.html"
    },
    {
        "name": "Security Compass iPhone Labs",
        "description": "Security Compass iPhone Labs",
        "lab": "https://securitycompass.github.io/iPhoneLabs/"
    },
    {
        "name": "OWASP iGoat (Android)",
        "description": "OWASP iGoat (Android)",
        "lab": "https://code.google.com/archive/p/owasp-igoat/"
    }
]

export function VulnerableApps() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {apps.map((app) => (
                    <motion.div
                        key={app.name}
                        className="projects h-full border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors flex flex-col"
                    >
                        <div className="space-y-1 flex-1 flex flex-col">
                            <div className="flex items-start justify-between">
                                <h3 className="text-lg font-semibold leading-tight">
                                    {app.name}
                                </h3>
                            </div>

                            <p className="text-sm text-muted-foreground leading-snug">
                                {app.description}
                            </p>

                            <div className="pt-2 mt-auto">
                                <div className='flex gap-2 h-max flex-row'>
                                    {
                                        app.link && (
                                            <Button variant={'outline'} size={'small'} asChild className='text-xs group/button border-border hover:bg-white hover:text-black no-underline transition-all duration-300 ease-in-out active:scale-95'>
                                                {(() => {
                                                    const isExternal = typeof app.link === 'string' && !app.link.startsWith('/');
                                                    return (
                                                        <Link href={app.link} target={isExternal ? '_blank' : undefined} rel="noopener noreferrer">
                                                            <FaGithub size={14} className='group-hover/button:-rotate-12 group-hover/button:scale-110 rotate-0 transition-transform duration-300 ease-out' />
                                                            <span className='ml-2'>GitHub</span>
                                                        </Link>
                                                    );
                                                })()}
                                            </Button>
                                        )
                                    }
                                    {
                                        app.lab && (
                                            <Button variant={'outline'} size={'small'} asChild className='text-xs group/button border-border hover:bg-white hover:text-black no-underline transition-all duration-300 ease-in-out active:scale-95'>
                                                {(() => {
                                                    const isExternal = typeof app.lab === 'string' && !app.lab.startsWith('/');
                                                    return (
                                                        <Link href={app.lab} target={isExternal ? '_blank' : undefined} rel="noopener noreferrer">
                                                            <ImLab size={14} className='group-hover/button:-rotate-12 group-hover/button:scale-110 rotate-0 transition-transform duration-300 ease-out' />
                                                            <span className='ml-2'>Lab</span>
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
