'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface RoleGroup {
  title: string
  level: 'Junior' | 'Senior'
  roles: string[]
}

const groups: RoleGroup[] = [
  {
    title: 'Blue Teaming Roles',
    level: 'Junior',
    roles: [
      'Security Analyst',
      'Security Operations Center (SOC) Analyst',
      'Incident Response Analyst',
      'Network Security Administrator',
    ],
  },
  {
    title: 'Blue Teaming Roles',
    level: 'Senior',
    roles: [
      'Security Engineer',
      'Incident Response Manager',
      'Security Architect',
      'SOC Manager',
    ],
  },
  {
    title: 'Red Teaming Roles',
    level: 'Junior',
    roles: [
      'Penetration Tester',
      'Red Team Operator',
      'Vulnerability Analyst',
      'Ethical Hacker',
    ],
  },
  {
    title: 'Red Teaming Roles',
    level: 'Senior',
    roles: [
      'Senior Penetration Tester',
      'Red Team Lead',
      'Offensive Security Engineer',
      'Threat Hunter',
    ],
  },
]

export function CommonJobRoles() {
  return (
    <div className="space-y-8">
      {groups.map((group, groupIdx) => (
        <div key={`${group.title}-${group.level}`} className="space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.35, delay: groupIdx * 0.05, ease: 'easeOut' }}
            className="text-3xl font-semibold"
          >
            {group.title}
          </motion.h2>

          <motion.h3
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.3, delay: groupIdx * 0.05 + 0.05, ease: 'easeOut' }}
            className="text-2xl font-semibold text-muted-foreground"
          >
            {group.level} Level
          </motion.h3>

          <ol className="space-y-2 list-decimal pl-5">
            {group.roles.map((role, idx) => (
              <motion.li
                key={`${group.title}-${group.level}-${role}`}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.25, delay: idx * 0.04, ease: 'easeOut' }}
              >
                {role}
              </motion.li>
            ))}
          </ol>
        </div>
      ))}

    </div>
  )
}


