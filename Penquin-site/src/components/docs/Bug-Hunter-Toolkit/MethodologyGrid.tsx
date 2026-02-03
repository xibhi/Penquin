'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface Methodology {
  id: string
  title: string
  tags: string[]
  url: string
}

const methodologies: Methodology[] = [
  {
    id: "recon-methodology",
    title: "Advanced Recon Methodology",
    tags: ["methodology", "recon"],
    url: "#"
  },
  {
    id: "fetch-through-api",
    title: "Gather assets through API",
    tags: ["methodology", "recon", "api"],
    url: "#"
  },
  {
    id: "ssti-payloads",
    title: "SSTI Payloads",
    tags: ["payloads", "injection"],
    url: "#"
  },
  {
    id: "crlf-injection",
    title: "CRLF Injection",
    tags: ["payloads", "injection", "headers"],
    url: "#"
  },
  {
    id: "sqli-methodology",
    title: "SQL Injection Methodology",
    tags: ["methodology", "payloads", "sqli"],
    url: "#"
  },
  {
    id: "xss-waf-bypass",
    title: "XSS WAF Bypass Methodology",
    tags: ["xss", "bypass", "payloads"],
    url: "#"
  },
  {
    id: "sqli-xor-waf-bypass",
    title: "SQL Injection XOR WAF Bypass",
    tags: ["sqli", "xor", "payloads"],
    url: "#"
  },
  {
    id: "google-dorks",
    title: "Advanced Google Dorks",
    tags: ["google-hacking", "google-dork"],
    url: "#"
  }
]

export function MethodologyGrid() {
  const handleCardClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {methodologies.map((methodology) => (
          <motion.div
            key={methodology.id}
            className="projects border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors cursor-pointer"
            onClick={() => handleCardClick(methodology.url)}
          >
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {methodology.title}
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {methodology.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="inline-flex items-center gap-1 rounded border border-border bg-muted text-muted-foreground px-2 py-0.5 text-xs"
                  >
                    <i className="fas fa-hashtag"></i>
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="pt-2">
                <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors">
                  <i className="fas fa-terminal"></i>
                  View Methodology
                  <i className="fas fa-external-link-alt text-xs"></i>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}