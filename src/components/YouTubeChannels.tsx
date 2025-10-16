'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface Channel {
  name: string
  url: string
  site?: string
}

const channels: Channel[] = [
  { name: 'Sankalpa Baral', url: 'https://www.youtube.com/@SankalpaBaral1337/videos' },
  { name: '𝙇𝙤𝙨𝙩𝙨𝙚𝙘', url: 'https://www.youtube.com/@lostsecc' },
  { name: 'Virdoex', url: 'https://www.youtube.com/@Virdoex/videos' },
  { name: 'Tech Ghoshal', url: 'https://www.youtube.com/@techghoshal/videos' },
  { name: 'Poc hunter', url: 'https://www.youtube.com/@bugbountypoc395/videos' },
  { name: 'Bug Bounty POC', url: 'https://www.youtube.com/@BugHuntingPoc' },
  { name: 'CyberSkb45', url: 'https://www.youtube.com/@CyberSkb45/videos', site: 'www.youtube.com' },
  { name: 'HackerShiv', url: 'https://www.youtube.com/@HackerShiv/videos', site: 'www.youtube.com' },
  { name: 'bugbountypocdisclosure', url: 'https://www.youtube.com/@bugbountypocdisclosure/videos', site: 'www.youtube.com' },
  { name: 'Bug Bounty POC Videos', url: 'https://www.youtube.com/@BugBountyPocVideos/videos' },
  { name: 'Hacking Blocks', url: 'https://www.youtube.com/@HackingBlocks/videos' },
  { name: 'abhishekmorla1', url: 'https://www.youtube.com/@abhishekmorla1/videos', site: 'www.youtube.com' },
  { name: 'Information & Tech', url: 'https://www.youtube.com/@bugbounty101/videos' },
  { name: 'Webcipher101', url: 'https://www.youtube.com/@webcipher101/videos' },
  { name: 'Bug Sec', url: 'https://www.youtube.com/@bugsec0x01/videos' },
  { name: 'Bug Hunter Aryan', url: 'https://www.youtube.com/@bughunteraryan/videos' },
  { name: 'techie hunterz', url: 'https://www.youtube.com/@techiehunter08/videos' },
  { name: 'HACKERFUDDI', url: 'https://www.youtube.com/@HACKERFUDDI/videos', site: 'www.youtube.com' },
  { name: 'THE BBH', url: 'https://www.youtube.com/@THEBBH/videos' },
  { name: 'Sudhanshu Rajbhar', url: 'https://www.youtube.com/@sudhanshurajbhar9635/videos' },
  { name: 'Cyberx14', url: 'https://www.youtube.com/@cyberx14/videos' },
  { name: 'Jiivahack', url: 'https://www.youtube.com/@Jiivahack/videos', site: 'www.youtube.com' },
  { name: 'sasec', url: 'https://www.youtube.com/@0xROI/videos' },
  { name: 'Tama', url: 'https://www.youtube.com/@Security07/videos' },
  { name: 'Root Access Hacks', url: 'https://www.youtube.com/@cangetrootacccess/videos' },
  { name: 'CodePrefer', url: 'https://www.youtube.com/@codeprefer9108/videos' },
  { name: 'HunterDep', url: 'https://www.youtube.com/@HunterDep/videos' },
  { name: 'Ibnu Fachrizal', url: 'https://www.youtube.com/@ibnufachrizal/videos' },
  { name: 'Rootreboot', url: 'https://www.youtube.com/@RootReboot/videos' },
  { name: 'CyberHacks', url: 'https://www.youtube.com/@CyberHacks200/videos' },
  { name: 'mufazmi', url: 'https://www.youtube.com/@mufazmi/videos' },
  { name: 'rashahacks', url: 'https://www.youtube.com/@rashahacks/videos' },
  { name: 'Sudhanshu Rajbhar', url: 'https://www.youtube.com/@sudhanshurajbhar9635' },
  { name: 'The Cyberboy', url: 'https://www.youtube.com/@the_cyb3rb0y' },
  { name: 'techie hunterz', url: 'https://www.youtube.com/@techiehunter08' },
  { name: 'rashahacks', url: 'https://www.youtube.com/@rashahacks' },
  { name: 'Poc hunter', url: 'https://www.youtube.com/@bugbountypoc395' },
  { name: 'mufazmi', url: 'https://www.youtube.com/@mufazmi' },
  { name: 'Information & Tech', url: 'https://www.youtube.com/@bugbounty101' },
  { name: 'hacksys', url: 'https://www.youtube.com/@hacksys' },
  { name: 'Elite Pwner', url: 'https://www.youtube.com/@elit3pwnerr' },
  { name: 'Bug Sec', url: 'https://www.youtube.com/@bugsec0x01' },
  { name: 'Bug Hunter Aryan', url: 'https://www.youtube.com/@bughunteraryan' },
]

export function YouTubeChannels() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {channels.map((channel) => (
          <motion.div
            key={channel.name}
            className="projects h-full border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors flex flex-col"
          >
            <div className="space-y-2 flex-1 flex flex-col">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold leading-tight">{channel.name}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <i className="fab fa-youtube"></i>
                  <span>YouTube</span>
                </div>
              </div>

              <div className="pt-2 mt-auto">
                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors no-underline border-0 focus:outline-none focus:ring-0"
                >
                  <i className="fab fa-youtube"></i>
                  Visit Channel
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


