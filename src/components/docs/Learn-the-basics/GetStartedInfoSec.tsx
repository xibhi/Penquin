'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const codeBlock = (lines: string[]) => (
  <pre className="relative overflow-auto border border-tint-subtle bg-tint-subtle theme-muted:bg-tint-base p-2 rounded-md shadow-xs">
    <code className="inline-grid min-w-full [count-reset:line] print:whitespace-pre-wrap">
      {lines.map((line) => (
        <span key={line} className="highlight-line">
          <span className="highlight-line-content">{line}</span>
        </span>
      ))}
    </code>
  </pre>
)

export function GetStartedInfoSec() {
  return (
    <div className="space-y-8">
      {/* Notion Roadmap link */}
      <div className="space-y-2">
        <p className="text-base">This Page is shifted here:</p>
        <motion.a
          className="group flex flex-row justify-between items-center gap-4 ring-1 ring-tint-subtle rounded-2xl px-5 py-3 transition-shadow hover:ring-primary-hover no-underline"
          href="https://whimsical-poultry-9ad.notion.site/The-Most-Practical-Cyber-Security-Roadmap-133b841caed9806c9b8be6e59a8236a2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            alt="Notion"
            src="https://www.notion.so/front-static/logo-ios.png"
            width={20}
            height={20}
            className="w-5 h-5 block"
          />
          <span className="flex flex-col flex-1">
            <span className="text-base transition-colors group-hover:text-primary">The Most Practical Cyber Security Roadmap | Notion</span>
            <span className="text-xs text-muted-foreground">whimsical-poultry-9ad on Notion</span>
          </span>
          <i className="fas fa-chevron-right text-muted-foreground group-hover:text-primary text-xs"></i>
        </motion.a>
      </div>

      {/* Learn Linux */}
      <section className="space-y-3">
        <motion.h3 className="text-2xl font-semibold">Learn Linux</motion.h3>
        <p className="font-bold">Learn Linux Command Line:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'The Cyber Mentor', url: 'https://www.youtube.com/watch?v=U1w4T03B30I&list=LL&index=386' },
            { name: 'freeCodeCamp.org', url: 'https://www.youtube.com/watch?v=ZtqBQ68cfJc&list=LL&index=404' },
            { name: 'The Cyber Mentor', url: 'https://www.youtube.com/watch?v=rZsJieGi8os&list=LL&index=406' },
            { name: 'HackerSploit', url: 'https://www.youtube.com/playlist?list=PLBf0hzazHTGMh2fe2MFf3lCgk0rKmS2by' },
          ].map((item, index) => (
            <motion.div key={`linux-cmd-${index}`}  className="projects h-full border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors flex flex-col">
              <div className="space-y-2 flex-1 flex flex-col">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold leading-tight">{item.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><i className="fab fa-youtube"></i><span>YouTube</span></div>
                </div>
                <div className="pt-2 mt-auto">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors no-underline border-0 focus:outline-none focus:ring-0">
                    <i className="fab fa-youtube"></i>
                    Watch
                    <i className="fas fa-external-link-alt text-xs"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="font-bold mt-4">Learn Linux File System:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'NeuralNine', url: 'https://www.youtube.com/watch?v=BUnb1PKKMBA' },
            { name: 'Edureka', url: 'https://www.youtube.com/watch?v=ePN5igV9ZpY&list=LL&index=235' },
            { name: 'NetworkChuck', url: 'https://www.youtube.com/watch?v=A3G-3hp88mo&list=LL&index=399' },
          ].map((item, index) => (
            <motion.div key={`linux-fs-${index}`} className="projects h-full border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors flex flex-col">
              <div className="space-y-2 flex-1 flex flex-col">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold leading-tight">{item.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><i className="fab fa-youtube"></i><span>YouTube</span></div>
                </div>
                <div className="pt-2 mt-auto">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors no-underline border-0 focus:outline-none focus:ring-0">
                    <i className="fab fa-youtube"></i>
                    Watch
                    <i className="fas fa-external-link-alt text-xs"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="font-bold mt-4">Linux Learning/Helping Resources:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Linux Journey', url: 'https://linuxjourney.com/' },
            { name: 'Edureka CS Videos', url: 'https://www.youtube.com/watch?v=ePN5igV9ZpY&list=LL&index=235' },
            { name: 'Explain Shell', url: 'https://explainshell.com/#' },
          ].map((item, index) => (
            <motion.div key={`linux-help-${index}`} className="projects h-full border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors flex flex-col">
              <div className="space-y-2 flex-1 flex flex-col">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold leading-tight">{item.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><i className="fas fa-external-link-alt"></i><span>Resource</span></div>
                </div>
                <div className="pt-2 mt-auto">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors no-underline border-0 focus:outline-none focus:ring-0">
                    Visit
                    <i className="fas fa-external-link-alt text-xs"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Learn Programming Languages */}
      <section className="space-y-3">
        <motion.h3 className="text-2xl font-semibold">Learn Programming Languages</motion.h3>
        <div className="space-y-4">
          <div>
            <p className="font-bold">C++:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Example Programs', url: 'https://www.geeksforgeeks.org/c-programming-examples/?ref=shm' },
                { name: 'Top 50 Array Questions', url: 'https://www.geeksforgeeks.org/top-50-array-coding-problems-for-interviews/' },
                { name: 'Top 50 String Questions', url: 'https://www.geeksforgeeks.org/top-50-string-coding-problems-for-interviews/?ref=footer' },
                { name: 'Practice', url: 'https://practice.geeksforgeeks.org/explore?page=1&difficulty[]=-1&sortBy=submissions&utm_source=auth&utm_medium=profile&utm_campaign=empty-data' },
                { name: 'Intro to String', url: 'https://www.geeksforgeeks.org/complete-guide-to-string-data-structure/?ref=footer' },
                { name: 'Intro to Array', url: 'https://www.geeksforgeeks.org/complete-guide-to-arrays-data-structure/?ref=footer' },
              ].map((item, index) => (
                <motion.div key={`cpp-${index}`} className="projects h-full border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors flex flex-col">
                  <div className="space-y-2 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold leading-tight">{item.name}</h3>
                    <div className="pt-2 mt-auto">
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors no-underline border-0 focus:outline-none focus:ring-0">
                        Visit
                        <i className="fas fa-external-link-alt text-xs"></i>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-bold">Java:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Example Programs', url: 'https://www.geeksforgeeks.org/java-programming-examples/?ref=shm' },
              ].map((item, index) => (
                <motion.div key={`java-${index}`} className="projects h-full border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors flex flex-col">
                  <div className="space-y-2 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold leading-tight">{item.name}</h3>
                    <div className="pt-2 mt-auto">
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors no-underline border-0 focus:outline-none focus:ring-0">
                        Visit
                        <i className="fas fa-external-link-alt text-xs"></i>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-bold">Python:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Example Programs', url: 'https://www.geeksforgeeks.org/python-programming-examples/#simple' },
                { name: 'GeeksForGeeks Python Tutorial', url: 'https://www.geeksforgeeks.org/python-programming-language/learn-python-tutorial/' },
                { name: 'Projects', url: 'https://www.geeksforgeeks.org/python-projects-beginner-to-advanced/?ref=shm' },
              ].map((item, index) => (
                <motion.div key={`python-${index}`} className="projects h-full border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors flex flex-col">
                  <div className="space-y-2 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold leading-tight">{item.name}</h3>
                    <div className="pt-2 mt-auto">
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors no-underline border-0 focus:outline-none focus:ring-0">
                        Visit
                        <i className="fas fa-external-link-alt text-xs"></i>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-bold">HTML, CSS:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'LoveBabbar', url: 'https://www.youtube.com/watch?v=k7ELO356Npo&list=LL&index=6&t=6415s' },
                { name: 'CodeWithHarry', url: 'https://www.youtube.com/watch?v=BsDoLVMnmZs&list=LL&index=5&t=5s' },
                { name: 'SuperSimpleDev', url: 'https://www.youtube.com/watch?v=G3e-cpL7ofc&list=LL&index=4&t=4s' },
                { name: 'BroCode', url: 'https://www.youtube.com/watch?v=HGTJBPNC-Gw&list=LL&index=2&t=8s' },
                { name: 'BroCode (SQL)', url: 'https://www.youtube.com/watch?v=5OdVJbNCSso' },
                { name: 'AapnaCollege (SQL)', url: 'https://www.youtube.com/watch?v=hlGoQC332VM' },
              ].map((item, index) => (
                <motion.div key={`htmlcss-${index}`} className="projects h-full border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors flex flex-col">
                  <div className="space-y-2 flex-1 flex flex-col">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold leading-tight">{item.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground"><i className="fab fa-youtube"></i><span>YouTube</span></div>
                    </div>
                    <div className="pt-2 mt-auto">
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors no-underline border-0 focus:outline-none focus:ring-0">
                        <i className="fab fa-youtube"></i>
                        Watch
                        <i className="fas fa-external-link-alt text-xs"></i>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">Playlists</p>
          </div>
        </div>
      </section>

      {/* Languages required in CyberSec */}
      <section className="space-y-2">
        <motion.h4 className="text-xl font-semibold">Languages required in CyberSec</motion.h4>
        <h5 className="text-base font-semibold">Web Development:</h5>
        {codeBlock(['1. HTML','2. CSS','3. JavaScript (JS)','4. PHP','5. MySQL','6. TypeScript'])}
        <h5 className="text-base font-semibold">General Programming:</h5>
        {codeBlock(['1. C','2. C++','3. Java','4. Python','5. Rust','6. Go','7. C#'])}
        <h5 className="text-base font-semibold">Scripting:</h5>
        {codeBlock(['1. Bash','2. PowerShell','3. Ruby','4. Perl','5. Lua','6. Python','7. VBScript'])}
        <h5 className="text-base font-semibold">Configuration/Markup:</h5>
        {codeBlock(['1. YAML','2. JSON','3. XML','4. Markdown','5. TOML'])}
      </section>

      {/* Top Platforms */}
      <section className="space-y-3">
        <motion.h3 className="text-2xl font-semibold">Top Platforms to Learn any Programming Language</motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'JavaTpoint', url: 'https://www.javatpoint.com/' },
            { name: 'W3Schools', url: 'https://www.w3schools.com/' },
            { name: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/' },
            { name: 'Tutorialspoint', url: 'https://www.tutorialspoint.com/index.htm' },
            { name: 'HackerRank', url: 'https://www.hackerrank.com/' },
            { name: 'Programiz', url: 'https://www.programiz.com/' },
          ].map((item, index) => (
            <motion.div key={`platform-${index}`}  className="projects h-full border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors flex flex-col">
              <div className="space-y-2 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold leading-tight">{item.name}</h3>
                <div className="pt-2 mt-auto">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors no-underline border-0 focus:outline-none focus:ring-0">
                    Visit
                    <i className="fas fa-external-link-alt text-xs"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Intentionally Vulnerable / CTF */}
      <section className="space-y-3">
        <motion.h3 className="text-2xl font-semibold">Intentionally Vulnerable Applications to Practice or CTF Websites</motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'TryHackMe', url: 'https://tryhackme.com/' },
            { name: 'THM All Free Labs List', url: 'https://github.com/Raunaksplanet/THM-CTF-Time/tree/main' },
            { name: 'HTB Academy', url: 'https://academy.hackthebox.com/' },
            { name: 'HTB Labs', url: 'https://app.hackthebox.com/home' },
            { name: 'PicoCTF', url: 'https://picoctf.org/' },
            { name: 'RootMe', url: 'https://www.root-me.org/?page=news&lang=fr' },
            { name: 'VulnHub (OS Related)', url: 'https://www.vulnhub.com/' },
            { name: 'PentesterLab', url: 'https://www.pentesterlab.com/' },
            { name: 'API Security', url: 'https://www.apisecuniversity.com/#:~:text=APIsec%20University%20offers%20free%2C%20hands,courses%20dedicated%20to%20API%20Security.' },
            { name: 'Pwned Labs', url: 'https://pwnedlabs.io/' },
            { name: 'Hacking Hub', url: 'https://www.hackinghub.io/' },
            { name: 'PortSwigger (Web Related)', url: 'https://portswigger.net/' },
            { name: 'Trailhead', url: 'https://trailhead.salesforce.com/en/career-path/cybersecurity/' },
            { name: 'OverTheWire (Linux)', url: 'https://overthewire.org/wargames/' },
            { name: 'CompTIA Security+ Labs', url: 'https://www.101labs.net/comptia-security/' },
            { name: 'Exploit Education', url: 'https://exploit.education/' },
            { name: 'HackingHub', url: 'https://www.hackinghub.io' },
            { name: 'HBH.sh', url: 'https://hbh.sh/home' },
          ].map((item, index) => (
            <motion.div key={`ctf-${index}`} className="projects h-full border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors flex flex-col">
              <div className="space-y-2 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold leading-tight">{item.name}</h3>
                <div className="pt-2 mt-auto">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors no-underline border-0 focus:outline-none focus:ring-0">
                    Visit
                    <i className="fas fa-external-link-alt text-xs"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">Metasploitable (Linux)</p>
      </section>

      {/* CS Certifications */}
      <section className="space-y-2">
        <motion.h3 className="text-2xl font-semibold">CS Certifications</motion.h3>
        {codeBlock([
          '1. Comptia: A+, Security+, Network+, Linux+, Pentest+, CySa+, casp+, ITF+',
          '2. EC-COUNCIL: CEH',
          '3. Ine-Security: eJPT, eWPTX',
        ])}
      </section>

      {/* Topics related to CS */}
      <section className="space-y-3">
        <motion.h3 className="text-2xl font-semibold">Topics related to CS</motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Reverse & bind shell', url: 'https://medium.com/bugbountywriteup/reverse-shell-vs-bind-shell-d5a1e80b6a6c' },
            { name: 'Cyber Security Roadmap by TCM 2023', url: 'https://tcm-sec.com/so-you-want-to-be-a-hacker-2023-edition/' },
            { name: 'TCE: Network Pentesting', url: 'https://www.youtube.com/playlist?list=PL-DxAN1jsRa-zHjDOfbpi6OAVwpCkyRYn' },
            { name: 'Reverse Engineering', url: 'https://www.youtube.com/playlist?list=PL-DxAN1jsRa9151ezNuCbh7UkGS0bMPdw' },
            { name: 'Binary Exploitation', url: 'https://www.youtube.com/playlist?list=PL-DxAN1jsRa9151ezNuCbh7UkGS0bMPdw' },
            { name: 'MYSQL & SQL', url: 'https://www.youtube.com/watch?v=hlGoQC332VM&list=LL&index=9&t=2s' },
          ].map((item, index) => (
            <motion.div key={`topic-${index}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }} className="projects h-full border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors flex flex-col">
              <div className="space-y-2 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold leading-tight">{item.name}</h3>
                <div className="pt-2 mt-auto">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors no-underline border-0 focus:outline-none focus:ring-0">
                    Visit
                    <i className="fas fa-external-link-alt text-xs"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <motion.h3  className="text-2xl font-semibold">Learn BurpSuite</motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Bitten tech', url: 'https://www.youtube.com/playlist?list=PLkW9FMxqUvybgx3pI9x9HyU-_HcJJFWQY' },
            { name: 'Ethical Sharmaji', url: 'https://www.youtube.com/watch?v=mK3Hr6ktgNg&t=4118s' },
            { name: 'hackbin', url: 'https://www.youtube.com/watch?v=eKPpGLn9G3w&t=185s' },
            { name: 'David Bombal', url: 'https://www.youtube.com/watch?v=IWWYNDiwYOA' },
            { name: 'PortSwigger1', url: 'https://www.youtube.com/playlist?list=PLoX0sUafNGbEXtfr-f4n0g4AqzU-CDvcQ' },
            { name: 'PortSwigger2', url: 'https://www.youtube.com/playlist?list=PLSbrmTUy4daN1ep7pkBZw4PRRmx7F0EaS' },
            { name: 'Cyber World Hindi', url: 'https://www.youtube.com/playlist?list=PLSbrmTUy4daN1ep7pkBZw4PRRmx7F0EaS' },
            { name: 'Cyberwings Security', url: 'https://www.youtube.com/playlist?list=PLa2xctTiNSCjVzFfxTn_UKkd-sS34EQaF' },
            { name: 'Technical MotaBhai', url: 'https://www.youtube.com/playlist?list=PLBCWFgREB971jxEXKbiAZSNQZqIxH9L47' },
          ].map((item, index) => (
            <motion.div key={`topic-${index}`}  className="projects h-full border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors flex flex-col">
              <div className="space-y-2 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold leading-tight">{item.name}</h3>
                <div className="pt-2 mt-auto">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors no-underline border-0 focus:outline-none focus:ring-0">
                    Visit
                    <i className="fas fa-external-link-alt text-xs"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-2">
      <motion.h3  className="text-2xl font-semibold">Common CyberSec Tools</motion.h3>
        {codeBlock([
            '1. maltego, BurpSuite, Metasploit, Air-crack-ng, JohnTheRipper',
            '2. SQLMap, netcat, hashcat, kismet, wifite',
            '3. dirbuster, nikto, sublister, nmap, FFUF',
            '4. Katana, BinWalk, Masscan, Hydra, Hashid',
            '5. Crunch, snort, ltrace, subfinder, Rust Scan',
            '6. HTTTPX, Zap, FeroxBuster, Steghide, Which',
            '7. Wheris, find, locate',              
        ])}
      </section>
    </div>
  )
}