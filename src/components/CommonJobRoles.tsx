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
      {groups.map((group) => (
        <div key={`${group.title}-${group.level}`} className="space-y-3">
          <motion.h2
            className="text-3xl font-semibold"
          >
            {group.title}
          </motion.h2>

          <motion.h3
            
            className="text-2xl font-semibold text-muted-foreground"
          >
            {group.level} Level
          </motion.h3>

          <ol className="space-y-2 list-decimal pl-5">
          {group.roles.map((role) => (
              <motion.li
                key={`${group.title}-${group.level}-${role}`}
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


