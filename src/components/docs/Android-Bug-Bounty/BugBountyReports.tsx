'use client'

import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { Button } from '@/components/ui/button'

interface Report {
    category: string
    title: string
    link: string
    notes: string
}

// Data reconstructed from provided HTML, preserving exact order
const reports: Report[] = [
    {
        "category": "credentials",
        "title": "Disclosure of all uploads via hardcoded api secret",
        "link": "https://hackerone.com/reports/351555",
        "notes": "-"
    },
    {
        "category": "WebView",
        "title": "Android security checklist: WebView",
        "link": "https://blog.oversecured.com/Android-security-checklist-webview/",
        "notes": "-"
    },
    {
        "category": "Insecure deeplinks",
        "title": "Account Takeover Via DeepLink",
        "link": "https://hackerone.com/reports/855618",
        "notes": "-"
    },
    {
        "category": "Sensitive Info",
        "title": "Sensitive information disclosure",
        "link": "https://hackerone.com/reports/401793",
        "notes": "-"
    },
    {
        "category": "RCE/ACE",
        "title": "Why dynamic code loading could be dangerous for your apps: a Google example",
        "link": "https://blog.oversecured.com/Why-dynamic-code-loading-could-be-dangerous-for-your-apps-a-Google-example/",
        "notes": "-"
    },
    {
        "category": "RCE/ACE",
        "title": "RCE in TinyCards for Android",
        "link": "https://hackerone.com/reports/281605",
        "notes": "TinyCards made this report private"
    },
    {
        "category": "RCE/ACE",
        "title": "Persistent arbitrary code execution in Android's Google Play Core Library",
        "link": "https://hackerone.com/reports/971386",
        "notes": "Details, explanation and the PoC"
    },
    {
        "category": "RCE/ACE",
        "title": "CVE-2020-8913: Persistent arbitrary code execution in Google Play Core library",
        "link": "https://blog.oversecured.com/Oversecured-automatically-discovers-persistent-code-execution-in-the-Google-Play-Core-Library/",
        "notes": "CVE-2020-8913"
    },
    {
        "category": "RCE/ACE",
        "title": "TikTok: three persistent arbitrary code executions and one theft of arbitrary files",
        "link": "https://blog.oversecured.com/Oversecured-detects-dangerous-vulnerabilities-in-the-TikTok-Android-app/",
        "notes": "Oversecured detects dangerous vulnerabilities in TikTok"
    },
    {
        "category": "Memory corruption",
        "title": "Exploiting memory corruption vulnerabilities on Android",
        "link": "https://blog.oversecured.com/Exploiting-memory-corruption-vulnerabilities-on-Android/",
        "notes": "Includes PayPal example"
    },
    {
        "category": "Cryptography",
        "title": "Use cryptography in mobile apps the right way",
        "link": "https://blog.oversecured.com/Use-cryptography-in-mobile-apps-the-right-way/",
        "notes": "-"
    },
    {
        "category": "SQL Injection",
        "title": "SQL Injection in Content Provider",
        "link": "https://hackerone.com/reports/291764",
        "notes": "-"
    },
    {
        "category": "SQL Injection",
        "title": "Another SQL Injection in Content Provider",
        "link": "https://hackerone.com/reports/1650264",
        "notes": "-"
    },
    {
        "category": "Session theft",
        "title": "Steal user session",
        "link": "https://hackerone.com/reports/328486",
        "notes": "-"
    },
    {
        "category": "Steal files",
        "title": "Android security checklist: theft of arbitrary files",
        "link": "https://blog.oversecured.com/Android-security-checklist-theft-of-arbitrary-files/",
        "notes": "-"
    },
    {
        "category": "Steal files",
        "title": "How to exploit insecure WebResourceResponse configurations",
        "link": "https://blog.oversecured.com/Android-Exploring-vulnerabilities-in-WebResourceResponse",
        "notes": "Includes Amazon apps example"
    },
    {
        "category": "Steal files",
        "title": "Vulnerable to local file steal, Javascript injection, Open redirect",
        "link": "https://hackerone.com/reports/499348",
        "notes": "-"
    },
    {
        "category": "Steal files",
        "title": "Token leakage due to stolen files via unprotected Activity",
        "link": "https://hackerone.com/reports/288955",
        "notes": "-"
    },
    {
        "category": "Steal files",
        "title": "Steal files due to exported services",
        "link": "https://hackerone.com/reports/258460",
        "notes": "-"
    },
    {
        "category": "Steal files",
        "title": "Steal files due to unprotected exported Activity",
        "link": "https://hackerone.com/reports/161710",
        "notes": "-"
    },
    {
        "category": "Steal files",
        "title": "Steal files due to insecure data storage",
        "link": "https://hackerone.com/reports/44727",
        "notes": "-"
    },
    {
        "category": "Steal files",
        "title": "Insecure local data storage, makes it easy to steal files",
        "link": "https://hackerone.com/reports/57918",
        "notes": "-"
    },
    {
        "category": "Bypasses",
        "title": "Accidental $70k Google Pixel Lock Screen Bypass",
        "link": "https://bugs.xdavidhu.me/google/2022/11/10/accidental-70k-google-pixel-lock-screen-bypass/",
        "notes": "-"
    },
    {
        "category": "Bypasses",
        "title": "Golden techniques to bypass host validations",
        "link": "https://hackerone.com/reports/431002",
        "notes": "-"
    },
    {
        "category": "Bypasses",
        "title": "Two-factor authentication bypass due to vuln endpoint",
        "link": "https://hackerone.com/reports/202425",
        "notes": "-"
    },
    {
        "category": "Bypasses",
        "title": "Another endpoint Auth bypass",
        "link": "https://hackerone.com/reports/205000",
        "notes": "-"
    },
    {
        "category": "Bypasses",
        "title": "Bypass PIN/Fingerprint lock",
        "link": "https://hackerone.com/reports/331489",
        "notes": "-"
    },
    {
        "category": "Bypasses",
        "title": "Bypass lock protection",
        "link": "https://hackerone.com/reports/490946",
        "notes": "-"
    },
    {
        "category": "Bypasses",
        "title": "Bypass of biometrics security functionality",
        "link": "https://hackerone.com/reports/637194",
        "notes": "-"
    },
    {
        "category": "XSS",
        "title": "HTML Injection in BatterySaveArticleRenderer WebView",
        "link": "https://hackerone.com/reports/176065",
        "notes": "-"
    },
    {
        "category": "XSS",
        "title": "XSS via SAMLAuthActivity",
        "link": "https://hackerone.com/reports/283058",
        "notes": "-"
    },
    {
        "category": "XSS",
        "title": "XSS in ImageViewerActivity",
        "link": "https://hackerone.com/reports/283063",
        "notes": "-"
    },
    {
        "category": "XSS",
        "title": "XSS via start ContentActivity",
        "link": "https://hackerone.com/reports/189793",
        "notes": "-"
    },
    {
        "category": "XSS",
        "title": "XSS on Owncloud webview",
        "link": "https://hackerone.com/reports/87835",
        "notes": "-"
    },
    {
        "category": "Privilege Escalation",
        "title": "20 Security Issues Found in Xiaomi Devices",
        "link": "https://blog.oversecured.com/20-Security-Issues-Found-in-Xiaomi-Devices/",
        "notes": "-"
    },
    {
        "category": "Privilege Escalation",
        "title": "Discovering vendor-specific vulnerabilities in Android",
        "link": "https://blog.oversecured.com/Discovering-vendor-specific-vulnerabilities-in-Android/",
        "notes": "-"
    },
    {
        "category": "Permissions",
        "title": "Common mistakes when using permissions in Android",
        "link": "https://blog.oversecured.com/Common-mistakes-when-using-permissions-in-Android/",
        "notes": "-"
    },
    {
        "category": "Privilege Escalation",
        "title": "Two weeks of securing Samsung devices: Part 2",
        "link": "https://blog.oversecured.com/Two-weeks-of-securing-Samsung-devices-Part-2/",
        "notes": "-"
    },
    {
        "category": "Privilege Escalation",
        "title": "Two weeks of securing Samsung devices: Part 1",
        "link": "https://blog.oversecured.com/Two-weeks-of-securing-Samsung-devices-Part-1/",
        "notes": "-"
    },
    {
        "category": "Intent Spoofing",
        "title": "Intent Spoofing",
        "link": "https://hackerone.com/reports/97295",
        "notes": "-"
    },
    {
        "category": "Content Provider",
        "title": "Access of some not exported content providers",
        "link": "https://hackerone.com/reports/272044",
        "notes": "-"
    },
    {
        "category": "Intent Spoofing",
        "title": "Access protected components via intent",
        "link": "https://hackerone.com/reports/200427",
        "notes": "-"
    },
    {
        "category": "Fragment Injection",
        "title": "Fragment injection",
        "link": "https://hackerone.com/reports/43988",
        "notes": "-"
    },
    {
        "category": "JS Injection",
        "title": "Javascript injection",
        "link": "https://hackerone.com/reports/54631",
        "notes": "-"
    },
    {
        "category": "CSRF",
        "title": "Deeplink leads to CSRF in follow action",
        "link": "https://hackerone.com/reports/583987",
        "notes": "-"
    },
    {
        "category": "Account Collision",
        "title": "overwrite account associated with email via android application",
        "link": "https://hackerone.com/reports/187714",
        "notes": "-"
    },
    {
        "category": "Broadcasts",
        "title": "Possible to intercept broadcasts about file uploads",
        "link": "https://hackerone.com/reports/167481",
        "notes": "-"
    },
    {
        "category": "Broadcasts",
        "title": "Vulnerable exported broadcast reciever",
        "link": "https://hackerone.com/reports/289000",
        "notes": "-"
    },
    {
        "category": "Info Disclosure",
        "title": "View every network request response's information",
        "link": "https://hackerone.com/reports/56002",
        "notes": "-"
    },
    {
        "category": "Content Provider",
        "title": "Content Provider Local File Inclusion",
        "link": "https://www.youtube.com/watch?v=34tNXsqYe9A&list=PLxyxUSarDsdB3MDNzb6Q7GOaBch8IWbOj&index=17",
        "notes": "-"
    }
]

export function BugBountyReports() {
    return (
        <div className="space-y-4">
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 bg-muted/50 rounded-t-lg border-b border-border text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <div className="col-span-2">Category</div>
                <div className="col-span-8">Report Title</div>
                <div className="col-span-2 text-right">Link</div>
            </div>
            <div className="divide-y divide-border border rounded-lg overflow-hidden">
                {reports.map((report, idx) => (
                    <div
                        key={`${report.category}-${report.title}-${idx}`}
                        className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center p-4 hover:bg-accent/40 transition-colors bg-card"
                    >
                        {/* Category - Desktop: col-span-2, Mobile: shows above title */}
                        <div className="md:col-span-2">
                            <span className="inline-flex items-center rounded-lg px-2 py-1 text-xs font-medium ring-1 ring-inset ring-primary/20 bg-primary/5 text-primary">
                                {report.category || 'General'}
                            </span>
                        </div>

                        {/* Title - Desktop: col-span-6 */}
                        <div className="md:col-span-8">
                            <h4 className="text-sm font-medium leading-tight text-foreground">
                                {report.title}
                            </h4>
                        </div>

                        {/* Link - Desktop: col-span-2 */}
                        <div className="md:col-span-2 flex justify-end">
                            <Button variant="hidden" size="icon" asChild className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                                <a href={report.link} target="_blank" rel="noopener noreferrer" title="View Report">
                                    <FaExternalLinkAlt className="h-3.5 w-3.5" />
                                </a>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


