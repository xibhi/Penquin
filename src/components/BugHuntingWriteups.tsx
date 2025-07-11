
'use client'

import React from 'react'

interface WriteupItem {
  title: string
  description: string
  url: string
  platform: string
  date: string
  readTime: string
  icon: string
}

const writeups: WriteupItem[] = [
  {
    title: "The Ultimate Guide to WAF Bypass Using SQLMap, Proxychains & Tamper Scripts",
    description: "Mastering Advanced SQLMap Techniques with Proxychains and tamper scripts Against Cloudflare and ModSecurity",
    url: "https://infosecwriteups.com/waf-bypass-masterclass-using-sqlmap-with-proxychains-and-tamper-scripts-against-cloudflare-9d46b36bae94?sk=cb8226b81080fbdcbfc6d165b608176e",
    platform: "InfoSec Writeups",
    date: "May 2024",
    readTime: "6 min read",
    icon: "fab fa-medium"
  },
  {
    title: "How Hackers Exploit CVE-2025–29927 in Next.js Like a Pro",
    description: "Step-by-Step mass hunting Authorization Bypass by Middleware in next.js: A Complete Exploit Walkthrough",
    url: "https://infosecwriteups.com/how-hackers-exploit-cve-2025-29927-in-next-js-like-a-pro-9997f48ed7ce?sk=e868408c235845190e109823e1086c92",
    platform: "InfoSec Writeups",
    date: "Apr 2024",
    readTime: "4 min read",
    icon: "fab fa-medium"
  },
  {
    title: "How Hackers Abuse XML-RPC to Launch Bruteforce and DDoS Attacks",
    description: "From Recon to full Exploitation: The XML-RPC Attack Path",
    url: "https://infosecwriteups.com/how-hackers-abuse-xml-rpc-to-launch-bruteforce-and-ddos-attacks-40be5b310960?sk=026eb8be7e3413bbe76f676715009ee2",
    platform: "InfoSec Writeups",
    date: "Mar 2024",
    readTime: "6 min read",
    icon: "fab fa-medium"
  },
  {
    title: "How to Route Traffic from WSL to Burp Suite on Windows: A Step-by-Step Guide",
    description: "Learn how to properly configure WSL to route all traffic through Burp Suite for effective penetration testing",
    url: "https://infosecwriteups.com/how-to-route-traffic-from-wsl-to-burp-suite-on-windows-a-step-by-step-guide-38d58f65b21a?sk=81d618b2a72b0fc3f6a1bfc60ee62460",
    platform: "InfoSec Writeups",
    date: "Apr 2024",
    readTime: "5 min read",
    icon: "fab fa-medium"
  },
  {
    title: "From Zero to Hero: Hunting High-Paying Open Redirect Bugs in Web Apps",
    description: "Complete methodology for finding and exploiting open redirect vulnerabilities in modern web applications",
    url: "https://infosecwriteups.com/from-zero-to-hero-hunting-high-paying-open-redirect-bugs-in-web-apps-fdb80286236e?sk=c273c6eab07cefa6df739bfb7be3ef67",
    platform: "InfoSec Writeups",
    date: "Mar 2024",
    readTime: "7 min read",
    icon: "fab fa-medium"
  },
  {
    title: "LostFuzzer: Passive URL Fuzzing & Nuclei DAST for Bug Hunters",
    description: "An advanced tool for discovering hidden endpoints and vulnerabilities through passive fuzzing techniques",
    url: "https://infosecwriteups.com/lostfuzzer-passive-url-fuzzing-nuclei-dast-for-bug-hunters-a33501b9563b?sk=aa2698f54ba6be98d9398bf0d3bfb65f",
    platform: "InfoSec Writeups",
    date: "Feb 2024",
    readTime: "5 min read",
    icon: "fab fa-medium"
  },
  {
    title: "S3 Bucket Recon: Finding Exposed AWS Buckets Like a Pro",
    description: "Techniques and methodologies for identifying misconfigured Amazon S3 buckets during security assessments",
    url: "https://infosecwriteups.com/s3-bucket-recon-finding-exposed-aws-buckets-like-a-pro-106be5ab9e1d?sk=6fd3c7ecb956a574561d8a625fed41cd",
    platform: "InfoSec Writeups",
    date: "Feb 2024",
    readTime: "6 min read",
    icon: "fab fa-medium"
  },
  {
    title: "Best Browser Extensions for Bug Hunting and Cybersecurity",
    description: "A comprehensive guide to essential browser extensions that enhance your bug hunting workflow",
    url: "https://infosecwriteups.com/best-browser-extensions-for-bug-hunting-and-cybersecurity-77faf6bd8188?sk=ba025ca3f8e8d37e56be90796fb5d1c6",
    platform: "InfoSec Writeups",
    date: "Jan 2024",
    readTime: "5 min read",
    icon: "fab fa-medium"
  },
  {
    title: "FFUF Mastery: The Ultimate Web Fuzzing Guide",
    description: "Master the powerful FFUF fuzzing tool for discovering hidden endpoints, parameters, and vulnerabilities",
    url: "https://osintteam.blog/ffuf-mastery-the-ultimate-web-fuzzing-guide-f7755c396b92?sk=4bf4d6b8f0bb8407483009f1120cf0c3",
    platform: "OSINT Team",
    date: "Mar 2024",
    readTime: "8 min read",
    icon: "fab fa-medium"
  },
  {
    title: "My Private Nuclei Template Collection for Easy Bounties",
    description: "Custom Nuclei templates that have led to successful bug bounty reports and vulnerability discoveries",
    url: "https://medium.com/meetcyber/my-private-nuclei-template-collection-for-easy-bounties-ba704073d065?sk=9bc9f77b52c5d4e95f4b8ff83b39645d",
    platform: "Medium",
    date: "Apr 2024",
    readTime: "6 min read",
    icon: "fab fa-medium"
  },
  {
    title: "Unlock the Full Potential of the Wayback Machine for Bug Bounty",
    description: "Advanced techniques for leveraging Internet Archive's Wayback Machine in your bug hunting methodology",
    url: "https://infosecwriteups.com/unlock-the-full-potential-of-the-wayback-machine-for-bug-bounty-8b6f57e2637d?sk=5a9884efd7c16dde4b08bd66d46ba7db",
    platform: "InfoSec Writeups",
    date: "Feb 2024",
    readTime: "4 min read",
    icon: "fab fa-medium"
  },
  {
    title: "SQL Injection in Largest Electricity Board of Sri Lanka",
    description: "A detailed case study of discovering and responsibly reporting a critical SQL Injection vulnerability",
    url: "https://infosecwriteups.com/sql-injection-in-largest-electricity-board-of-sri-lanka-1a55c12104bd?sk=f3b1f369151782d6854c41ba11027e78",
    platform: "InfoSec Writeups",
    date: "Jan 2024",
    readTime: "5 min read",
    icon: "fab fa-medium"
  },
  {
    title: "PDF.js Arbitrary JavaScript Code Execution (CVE-2024-4367)",
    description: "Analysis and exploitation guide for the critical code execution vulnerability in Mozilla's PDF.js library",
    url: "https://infosecwriteups.com/pdf-js-arbitrary-javascript-code-execution-cve-2024-4367-be4a64f877df?sk=19cadb705d4e9f5d738a62d4e52ba8ec",
    platform: "InfoSec Writeups",
    date: "Apr 2024",
    readTime: "7 min read",
    icon: "fab fa-medium"
  },
  {
    title: "How to Find Origin IP of Any Website Behind a WAF",
    description: "Techniques for identifying the true origin IP address of servers protected by web application firewalls",
    url: "https://infosecwriteups.com/how-to-find-origin-ip-of-any-website-behind-a-waf-c85095156ef7?sk=9e2f38a9cf34e4422f6281f5f8436f83",
    platform: "InfoSec Writeups",
    date: "Mar 2024",
    readTime: "5 min read",
    icon: "fab fa-medium"
  },
  {
    title: "Find XSS Vulnerabilities in Just 2 Minutes",
    description: "Rapid methodology for identifying Cross-Site Scripting vulnerabilities in web applications",
    url: "https://osintteam.blog/find-xss-vulnerabilities-in-just-2-minutes-d14b63d000b1?sk=8fadb5146a6220e9e760bf9a930425c6",
    platform: "OSINT Team",
    date: "Feb 2024",
    readTime: "4 min read",
    icon: "fab fa-medium"
  },
  {
    title: "How to Identify Sensitive Data in JavaScript Files: JSRecon",
    description: "Techniques for discovering credentials, API keys, and other sensitive information in client-side JavaScript",
    url: "https://osintteam.blog/how-to-identify-sensitive-data-in-javascript-files-jsrecon-306b8a2e6462?sk=074942180b91fd19f6e61f4e13815f5d",
    platform: "OSINT Team",
    date: "Jan 2024",
    readTime: "5 min read",
    icon: "fab fa-medium"
  }
]

const WriteupCard = ({ writeup }: { writeup: WriteupItem }) => {
  return (
    <div className="projects p-6 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors">
      <h3 className="text-lg font-semibold mb-2 line-clamp-2">
        {writeup.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
        {writeup.description}
      </p>
      <a
        href={writeup.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium mb-3"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 12h7l-3 3v-2H4v-2h13v-2l3 3z"/>
        </svg>
        Read on {writeup.platform}
      </a>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {writeup.date}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {writeup.readTime}
        </span>
      </div>
    </div>
  )
}

export const BugHuntingWriteups = () => {
  return (
    <div className="w-full">

      {/* Writeups Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {writeups.map((writeup, index) => (
          <WriteupCard key={index} writeup={writeup} />
        ))}
      </div>
      
    </div>
  )
}
