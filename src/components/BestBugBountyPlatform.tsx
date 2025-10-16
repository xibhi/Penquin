'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface PlatformRow {
  idx: number
  name: string
}

const platforms: PlatformRow[] = [
  { idx: 1, name: 'HackerOne' },
  { idx: 2, name: 'BugCrowd' },
  { idx: 3, name: 'Open Bug Bounty' },
  { idx: 4, name: 'Intigriti' },
  { idx: 5, name: 'Detectify' },
  { idx: 6, name: 'Synack' },
  { idx: 7, name: 'Cobalt' },
  { idx: 8, name: 'Zerocopter' },
  { idx: 9, name: 'YesWeHack' },
  { idx: 10, name: 'KackenProof' },
  { idx: 11, name: 'Vulnerability Lab' },
  { idx: 12, name: 'AntiHack' },
  { idx: 13, name: 'FireBounty' },
  { idx: 14, name: 'BugBounty.jp' },
  { idx: 15, name: 'CyberArmy ID' },
  { idx: 16, name: 'Safe Hats' },
  { idx: 17, name: 'Red Storm' },
  { idx: 18, name: 'Yogosha' },
  { idx: 19, name: 'bugbase' },
]

export function BestBugBountyPlatform() {
  return (
    <div className="space-y-6">
        <div className="divide-y divide-border">
          {platforms.map((row) => (
            <motion.div
            key={row.name}
              className="grid grid-cols-12 items-start hover:bg-accent/40 transition-colors"
            >
              <div className="col-span-2 px-4 py-3 text-sm">{row.idx}</div>
              <div className="col-span-10 px-4 py-3 text-sm font-medium">{row.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    
  )
}


