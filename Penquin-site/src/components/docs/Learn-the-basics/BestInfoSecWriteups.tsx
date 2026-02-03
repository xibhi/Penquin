'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface WriteupRow {
  platform: string
  url: string
}

const writeups: WriteupRow[] = [
  { platform: "Weekly Infosec Writeups", url: "https://weekly.infosecwriteups.com/" },
  { platform: "Evan Connelly's Blog", url: "https://evanconnelly.github.io/" },
  { platform: "Embrace The Red Blog", url: "https://embracethered.com/blog/index.html" },
  { platform: "Bug Bounty Hunter Disclosed", url: "https://www.bugbountyhunter.com/disclosed/" },
  { platform: "Chybeta's Blog", url: "https://chybeta.github.io/" },
  { platform: "Infosec Writeups", url: "https://infosecwriteups.com/" },
  { platform: "Writeups.io", url: "https://writeups.io/" },
  { platform: "Pentester Land Writeups", url: "https://pentester.land/writeups/" },
  { platform: "Bug Bounty Hunting", url: "https://www.bugbountyhunting.com/" },
  { platform: "Byte Blogger Base", url: "https://bytebloggerbase.com/#Blogs" },
  { platform: "Medium", url: "https://medium.com/" },
  { platform: "Freedium", url: "https://freedium.cfd/" },
  { platform: "Zhero Web Sec", url: "https://zhero-web-sec.github.io/" },
  { platform: "Cybertix", url: "https://cybertix.in/blog/" },
  { platform: "0xpatrik", url: "https://0xpatrik.com/" },
  { platform: "Codean Labs", url: "https://codeanlabs.com/blog/" },
  { platform: "Twitter", url: "https://x.com/search?q=%23bugbountytips+&src=typed_query&f=live" },
  { platform: "Twitter 2", url: "https://x.com/disclosedh1" },
  { platform: "Intigriti", url: "https://blog.intigriti.com/" },
  { platform: "Shreyas Chavhan's Collection", url: "https://shreyaschavhan.notion.site/fffa53e43119815e8c7fef7bd9be6824?v=fffa53e431198122a88b000cf89bf37e" },
  { platform: "Supras.io", url: "https://supras.io/" },
  { platform: "KoalaSec Blog", url: "https://blog.koalasec.co/?source=top_nav_blog_home" },
  { platform: "Medusa0xf", url: "https://medusa0xf.medium.com/" },
  { platform: "Mizu", url: "https://mizu.re/" },
  { platform: "Hacker Writeups", url: "https://hacker-writeups.github.io/" },
]

export function BestInfoSecWriteups() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {writeups.map((row) => (
          <motion.div
            key={`${row.platform}-${row.url}`}
            className="projects h-full border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors flex flex-col"
          >
            <div className="space-y-2 flex-1 flex flex-col">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold leading-tight">{row.platform}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <i className="fas fa-book-open" />
                  <span>Writeups</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground break-words">
                {row.url.replace(/^https?:\/\//, '')}
              </p>
              <div className="pt-2 mt-auto">
                <a
                  href={row.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors no-underline border-0 focus:outline-none focus:ring-0"
                >
                  Visit
                  <i className="fas fa-external-link-alt text-xs"></i>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}


