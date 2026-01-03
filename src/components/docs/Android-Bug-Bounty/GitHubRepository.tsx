'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FaGithub } from "react-icons/fa";

interface Repo {
    name: string
    url: string
}

const repos: Repo[] = [
    {
        "name": "Learn Android Bug Bounty",
        "url": "https://github.com/Raunaksplanet/Learn-android-bug-bounty"
    },
    {
        "name": "Frida Labs",
        "url": "https://github.com/DERE-ad2001/Frida-Labs"
    },
    {
        "name": "Objection Framework",
        "url": "https://github.com/sensepost/objection"
    },
    {
        "name": "r0capture (Frida Capture Tool)",
        "url": "https://github.com/r0ysue/r0capture"
    },
    {
        "name": "Frida",
        "url": "https://github.com/frida/frida"
    },
    {
        "name": "APK MITM",
        "url": "https://github.com/niklashigi/apk-mitm"
    },
    {
        "name": "BeVigil OSINT CLI",
        "url": "https://github.com/Bevigil/BeVigil-OSINT-CLI"
    },
    {
        "name": "APKiD",
        "url": "https://github.com/rednaga/APKiD"
    },
    {
        "name": "Genymotion ARM Translation",
        "url": "https://github.com/m9rco/Genymotion_ARM_Translation"
    },
    {
        "name": "Drozer Agent",
        "url": "https://github.com/ReversecLabs/drozer-agent"
    },
    {
        "name": "Drozer Framework",
        "url": "https://github.com/ReversecLabs/drozer"
    },
    {
        "name": "APKLeaks",
        "url": "https://github.com/dwisiswant0/apkleaks"
    },
    {
        "name": "JADX Decompiler",
        "url": "https://github.com/skylot/jadx"
    },

    {
        "name": "Android Pentesting Checklist (HackTricks)",
        "url": "https://book.hacktricks.wiki/en/mobile-pentesting/android-checklist.html"
    },
    {
        "name": "Mobile App Pentest Cheatsheet",
        "url": "https://github.com/tanprathan/MobileApp-Pentest-Cheatsheet"
    },
    {
        "name": "Android PentestBook",
        "url": "https://github.com/six2dez/pentest-book/blob/master/mobile/android.md"
    },

    {
        "name": "All Things Android Security",
        "url": "https://github.com/jdonsec/AllThingsAndroid"
    },
    {
        "name": "Android Reports & Resources",
        "url": "https://github.com/B3nac/Android-Reports-and-Resources"
    },
    {
        "name": "Awesome Android Security",
        "url": "https://github.com/saeidshirazi/awesome-android-security"
    },
    {
        "name": "Android Security Awesome",
        "url": "https://github.com/ashishb/android-security-awesome"
    },
    {
        "name": "Awesome Mobile CTF Resources",
        "url": "https://github.com/xtiankisutsa/awesome-mobile-CTF"
    }
]

export function GitHubRepository() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {repos.map((repo) => (
                    <motion.div
                        key={repo.name}
                        className="projects h-full border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors flex flex-col"
                    >
                        <div className="space-y-1 flex-1 flex flex-col">


                            <p className="text-lg leading-snug">
                                {repo.name}
                            </p>

                            <div className="pt-2 mt-auto">
                                <div className='flex gap-2 h-max flex-row'>
                                    {
                                        repo.url && (
                                            <Button variant={'outline'} size={'small'} asChild className='text-xs group/button border-border hover:bg-white hover:text-black no-underline transition-all duration-300 ease-in-out active:scale-95'>
                                                {(() => {
                                                    const isExternal = typeof repo.url === 'string' && !repo.url.startsWith('/');
                                                    return (
                                                        <Link href={repo.url} target={isExternal ? '_blank' : undefined} rel="noopener noreferrer">
                                                            <FaGithub size={14} className='group-hover/button:-rotate-12 group-hover/button:scale-110 rotate-0 transition-transform duration-300 ease-out' />
                                                            <span className='ml-2'>Github</span>
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
