'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface SecurityType {
  category: string
  description: string
  roles: string
  beginner: string
}

const types: SecurityType[] = [
  {
    category: 'Network Security',
    description: 'Protects network infrastructure from intrusions and attacks.',
    roles: 'Network Security Engineer, SOC Analyst, Firewall Administrator',
    beginner: 'Yes – Start with basics of networking and firewalls',
  },
  {
    category: 'Web Application Security',
    description: 'Secures websites and web applications from vulnerabilities.',
    roles: 'Web App Pentester, Application Security Engineer, Bug Bounty Hunter',
    beginner: 'Yes – OWASP Top 10 is a good starting point',
  },
  {
    category: 'Endpoint Security',
    description: 'Protects individual devices (PCs, mobiles) from threats.',
    roles: 'Endpoint Security Analyst, IT Security Administrator',
    beginner: 'Yes – Easy to understand via antivirus, EDR tools',
  },
  {
    category: 'Mobile Security (Android/iOS)',
    description: 'Focuses on securing mobile apps and OS against malware and exploitation.',
    roles: 'Mobile Security Researcher, Android Pentester, iOS Security Analyst',
    beginner: 'Moderate – Better after basic pentesting',
  },
  {
    category: 'Cloud Security',
    description: 'Secures cloud platforms like AWS, Azure, and GCP.',
    roles: 'Cloud Security Engineer, Cloud Architect, DevSecOps Engineer',
    beginner: 'No – Requires cloud and networking background',
  },
  {
    category: 'IoT Security',
    description: 'Protects Internet of Things devices from remote attacks.',
    roles: 'IoT Security Analyst, Embedded Security Engineer',
    beginner: 'No – Needs hardware and embedded systems knowledge',
  },
  {
    category: 'Operational Security (OPSEC)',
    description: 'Manages processes and decisions around protecting sensitive data.',
    roles: 'OPSEC Analyst, Risk Management Specialist',
    beginner: 'Yes – Learn basic data handling and privacy',
  },
  {
    category: 'Information Security (InfoSec)',
    description: 'General protection of information assets from unauthorized access.',
    roles: 'InfoSec Analyst, Compliance Officer, ISO Auditor',
    beginner: 'Yes – A good entry point into cybersecurity',
  },
  {
    category: 'Application Security',
    description: 'Involves secure coding, code review, and protecting software during development.',
    roles: 'AppSec Engineer, Secure Code Reviewer, Software Security Consultant',
    beginner: 'No – Requires programming knowledge',
  },
  {
    category: 'Identity and Access Management (IAM)',
    description: 'Controls user access to systems and data.',
    roles: 'IAM Analyst, Identity Governance Engineer',
    beginner: 'Moderate – Learn access control models first',
  },
  {
    category: 'Cryptography',
    description: 'Uses encryption to protect data confidentiality and integrity.',
    roles: 'Cryptographer, Crypto Analyst, PKI Specialist',
    beginner: 'No – Needs strong math background',
  },
  {
    category: 'Incident Response',
    description: 'Detects and responds to security breaches and threats.',
    roles: 'Incident Responder, SOC Analyst, Digital Forensic Expert',
    beginner: 'Yes – Start in SOC roles',
  },
  {
    category: 'Penetration Testing (Red Teaming)',
    description: 'Simulates attacks to find weaknesses before attackers do.',
    roles: 'Penetration Tester, Red Team Operator, Ethical Hacker',
    beginner: 'Yes – With basic hacking knowledge',
  },
  {
    category: 'Blue Teaming',
    description: 'Defends systems and detects attacks in real time.',
    roles: 'Blue Team Analyst, Threat Hunter, SOC Analyst',
    beginner: 'Yes – Good for defense-focused beginners',
  },
  {
    category: 'Digital Forensics',
    description: 'Investigates cybercrimes by analyzing digital evidence.',
    roles: 'Forensic Analyst, Cybercrime Investigator',
    beginner: 'No – Requires forensic tools knowledge',
  },
  {
    category: 'Governance, Risk, and Compliance (GRC)',
    description: 'Ensures security practices comply with legal and regulatory standards.',
    roles: 'GRC Analyst, Compliance Manager, Risk Analyst',
    beginner: 'Yes – Suitable for non-technical entry',
  },
]

export function CyberSecurityTypes() {
  return (
    <div className="space-y-6">
        <div className="hidden sm:grid grid-cols-12 items-stretch">
          <div className="col-span-3 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Type of Cybersecurity</div>
          <div className="col-span-4 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Description</div>
          <div className="col-span-3 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Related Job Roles</div>
          <div className="col-span-2 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Suitable for Beginners</div>
        </div>

        <div className="divide-y divide-border">
          {types.map((t) => (
            <motion.div
              key={t.category}
              
              className="grid grid-cols-1 sm:grid-cols-12 items-start hover:bg-accent/40 transition-colors"
            >
              <div className="px-4 py-3 sm:col-span-3">
                <div className="sm:hidden text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Type</div>
                <div className="font-medium">{t.category}</div>
              </div>
              <div className="px-4 py-3 sm:col-span-4">
                <div className="sm:hidden text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Description</div>
                <div className="text-sm text-muted-foreground">{t.description}</div>
              </div>
              <div className="px-4 py-3 sm:col-span-3">
                <div className="sm:hidden text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Roles</div>
                <div className="text-sm text-muted-foreground">{t.roles}</div>
              </div>
              <div className="px-4 py-3 sm:col-span-2">
                <div className="sm:hidden text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Beginners</div>
                <div className="text-sm">{t.beginner}</div>
              </div>
            </motion.div>
          ))}
        </div>
     </div>
  )
}


