'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FaExternalLinkAlt } from 'react-icons/fa'

interface BlogsAndWriteups {
    title: string
    description: string
    link: string
}

const blogsAndWriteups: BlogsAndWriteups[] = [
    {
        "title": "OWASP Mobile Top 10 2016",
        "description": "Top mobile security risks",
        "link": "https://www.owasp.org/index.php/Mobile_Top_10_2016-Top_10"
    },
    {
        "title": "Mindmap",
        "description": "A comprehensive Checklist for Android Bug Bounty",
        "link": "https://xmind.app/m/GkgaYH/"
    },
    {
        "title": "OWASP Mobile Security Testing Guide",
        "description": "Comprehensive testing guide",
        "link": "https://github.com/OWASP/owasp-mstg"
    },
    {
        "title": "Android Applications Reversing 101",
        "description": "Beginner's guide to Android reversing",
        "link": "https://www.evilsocket.net/2017/04/27/Android-Applications-Reversing-101/"
    },
    {
        "title": "Detect secret leaks in Android apps",
        "description": "Online detection tool",
        "link": "https://android.fallible.co/"
    },
    {
        "title": "Android Security Guidelines",
        "description": "Box's security guidelines",
        "link": "https://developer.box.com/docs/android-security-guidelines"
    },
    {
        "title": "Attacking Broadcast Receivers",
        "description": "Android security part 18",
        "link": "https://manifestsecurity.com/android-application-security-part-18/"
    },
    {
        "title": "Android WebView Vulnerabilities",
        "description": "Common WebView issues",
        "link": "https://pentestlab.blog/2017/02/12/android-webview-vulnerabilities/"
    },
    {
        "title": "Android APK Recon Setup",
        "description": "Setup and tips for recon",
        "link": "https://b3nac.com/posts/2017-11-10-Setup-and-tips-for-Android-APK-recon.html"
    },
    {
        "title": "WebView addJavascriptInterface RCE",
        "description": "Remote code execution via WebView",
        "link": "https://labs.mwrinfosecurity.com/blog/webview-addjavascriptinterface-remote-code-execution/"
    },
    {
        "title": "Install PlayStore on Emulator",
        "description": "Guide for emulator setup",
        "link": "https://medium.com/@dai_shi/installing-google-play-services-on-an-android-studio-emulator-fffceb2c28a1"
    },
    {
        "title": "Android Bug Bounty Tips",
        "description": "Targeting mobile apps",
        "link": "https://medium.com/bugbountyhunting/bug-bounty-hunting-tips-2-target-their-mobile-apps-android-edition-f88a9f383fcc"
    },
    {
        "title": "Access to Protected Components",
        "description": "Oversecured blog post",
        "link": "https://blog.oversecured.com/Android-Access-to-app-protected-components/"
    },
    {
        "title": "Arbitrary Code Execution",
        "description": "Via third-party package contexts",
        "link": "https://blog.oversecured.com/Android-arbitrary-code-execution-via-third-party-package-contexts/"
    },
    {
        "title": "Interception of Implicit Intents",
        "description": "Android security issue",
        "link": "https://blog.oversecured.com/Interception-of-Android-implicit-intents/"
    },
    {
        "title": "Evernote Vulnerabilities",
        "description": "Universal XSS and cookie theft",
        "link": "https://blog.oversecured.com/Evernote-Universal-XSS-theft-of-all-cookies-from-all-sites-and-more/"
    },
    {
        "title": "Gaining Access to Content Providers",
        "description": "Android security issue",
        "link": "https://blog.oversecured.com/Gaining-access-to-arbitrary-Content-Providers/"
    },
    {
        "title": "@vaishalinagori112 on Medium",
        "description": "",
        "link": "https://medium.com/@vaishalinagori112"
    },
    {
        "title": "@prasadraj954 on Medium",
        "description": "",
        "link": "https://medium.com/@prasadraj954"
    },
    {
        "title": "B3nac’s Android Reports and Resources",
        "description": "",
        "link": "https://github.com/B3nac/Android-Reports-and-Resources"
    },
    {
        "title": "Sandeep Wawdane",
        "description": "",
        "link": "https://thecybersandeep.medium.com/"
    },
    {
        "title": "Oversecured Blog",
        "description": "",
        "link": "https://blog.oversecured.com/"
    },
    {
        "title": "CorSecure Blog",
        "description": "",
        "link": "https://corsecure.blog/"
    },
    {
        "title": "Frida Official Documentation",
        "description": "",
        "link": "https://frida.re/docs/"
    },
    {
        "title": "SecurityBreached (Babayaga47)",
        "description": "",
        "link": "https://blog.securitybreached.org/author/babayaga47/"
    },
    {
        "title": "DeeSee's Android Security Resources",
        "description": "",
        "link": "https://blog.deesee.xyz/android/security/2020/01/13/android-application-hacking-resources.html"
    },
    {
        "title": "Hacker101: Mobile Crash Course",
        "description": "",
        "link": "https://www.hacker101.com/sessions/mobile_crash_course.html"
    },
    {
        "title": "Mobisec Slides",
        "description": "",
        "link": "https://mobisec.reyammer.io/slides"
    },
    {
        "title": "Bypassing Certificate Pinning (vavkamil)",
        "description": "",
        "link": "https://vavkamil.cz/2019/09/15/how-to-bypass-android-certificate-pinning-and-intercept-ssl-traffic/"
    },
    {
        "title": "Android Hacking Primer",
        "description": "",
        "link": "https://medium.com/swlh/an-android-hacking-primer-3390fef4e6a0"
    },
    {
        "title": "OWASP Mobile Top Ten 2023 – fi5t",
        "description": "",
        "link": "https://fi5t.xyz/posts/owasp-mobile-top-ten-2023/"
    },
    {
        "title": "Android SMS Stealer – Max Kersten",
        "description": "",
        "link": "https://maxkersten.nl/binary-analysis-course/malware-analysis/android-sms-stealer/"
    },
    {
        "title": "Hacking SMS API via Static Analysis – Security Breached",
        "description": "",
        "link": "https://blog.securitybreached.org/2020/02/19/hacking-sms-api-service-provider-of-a-company-android-app-static-security-analysis-bug-bounty-poc/"
    },
    {
        "title": "Bug Bounty Hunting Tips (Mobile Apps – Android Edition)",
        "description": "",
        "link": "https://freedium.cfd/https://medium.com/bugbountyhunting/bug-bounty-hunting-tips-2-target-their-mobile-apps-android-edition-f88a9f383fcc"
    },
    {
        "title": "Getting Started in Android Pentesting",
        "description": "",
        "link": "https://blog.securitybreached.org/2020/03/17/getting-started-in-android-apps-pentesting/"
    },
    {
        "title": "Exploiting Insecure Firebase DB",
        "description": "",
        "link": "https://blog.securitybreached.org/2020/02/04/exploiting-insecure-firebase-database-bugbounty/"
    },
    {
        "title": "Finding Leaked AWS Creds in Android Apps",
        "description": "",
        "link": "https://blog.securitybreached.org/2024/06/28/finding-hidden-threats-how-i-found-leaked-aws-credentials-in-an-android-app-api-using-dast/"
    },
    {
        "title": "200+ Bounty Payouts: SQLi in Content Providers",
        "description": "",
        "link": "https://infosecwriteups.com/200-bug-bounty-payouts-exploiting-content-providers-with-sql-injection-abd287179b61"
    },
    {
        "title": "8 Ways to Bypass SSL Pinning in iOS",
        "description": "",
        "link": "https://medium.com/@vaishalinagori112/8-different-ways-to-bypass-ssl-pinning-in-ios-applications-427dfcbe8bf7"
    },
    {
        "title": "YesWeHack guide to Android Bug Bounty",
        "description": "",
        "link": "https://www.yeswehack.com/learn-bug-bounty/android-lab-mobile-hacking-tools"
    },
    {
        "title": "RootAVD(Root your android virtual device)",
        "description": "",
        "link": "https://gitlab.com/newbit/rootAVD"
    },
    {
        "title": "Intent Abuse in Google Messages for Wear OS",
        "description": "",
        "link": "https://towerofhanoi.it/writeups/cve-2025-12080/"
    },
    {
        "title": "Android recon for Bug Bounty hunters: A complete guide from APK extraction to mapping attack surfaces",
        "description": "",
        "link": "https://www.yeswehack.com/learn-bug-bounty/android-recon-bug-bounty-guide"
    }
]

export function AndroidBlogsWriteups() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogsAndWriteups.map((blog) => (
                    <motion.div
                        key={blog.title}
                        className="projects h-full border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors flex flex-col"
                    >
                        <div className="space-y-1 flex-1 flex flex-col">
                            <div className="flex items-start justify-between">
                                <h3 className="text-lg font-semibold leading-tight">
                                    {blog.title}
                                </h3>
                            </div>

                            <p className="text-sm text-muted-foreground leading-snug">
                                {blog.description}
                            </p>

                            <div className="pt-2 mt-auto">
                                <div className='flex gap-2 h-max flex-row'>
                                    {
                                        blog.link && (
                                            <Button variant={'outline'} size={'small'} asChild className='text-xs group/button border-border hover:bg-white hover:text-black no-underline transition-all duration-300 ease-in-out active:scale-95'>
                                                {(() => {
                                                    const isExternal = typeof blog.link === 'string' && !blog.link.startsWith('/');
                                                    return (
                                                        <Link href={blog.link} target={isExternal ? '_blank' : undefined} rel="noopener noreferrer">
                                                            <FaExternalLinkAlt size={14} className='group-hover/button:-rotate-12 group-hover/button:scale-110 rotate-0 transition-transform duration-300 ease-out' />
                                                            <span className='ml-2'>Read</span>
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
