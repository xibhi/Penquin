
'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface Extension {
  name: string
  description: string
  downloadLink: string
  store: string
}

const extensions: Extension[] = [
  {
    name: "Greb",
    description: "Easily capture and manipulate form parameters, URL parameters, and form data.",
    downloadLink: "https://github.com/1hehaq/greb.git",
    store: "Github"
  },
  {
    name: "TruffleHog",
    description: "Find hidden API keys and secrets in websites",
    downloadLink: "https://addons.mozilla.org/en-US/firefox/addon/trufflehog/",
    store: "Firefox Store"
  },
  {
    name: "FoxyProxy",
    description: "Essential proxy management for Burp Suite and other MITM applications",
    downloadLink: "https://addons.mozilla.org/en-US/firefox/addon/foxyproxy-standard/",
    store: "Firefox Store"
  },
  {
    name: "Wappalyzer",
    description: "Identify technologies, CMS, and frameworks used by websites",
    downloadLink: "https://addons.mozilla.org/en-US/firefox/addon/wappalyzer/",
    store: "Firefox Store"
  },
  {
    name: "Temp Mail",
    description: "Quick access to temporary email services",
    downloadLink: "https://addons.mozilla.org/en-US/firefox/addon/temp-mail/",
    store: "Firefox Store"
  },
  {
    name: "Hunter.io",
    description: "Extract all email addresses from websites, useful for report submission",
    downloadLink: "https://addons.mozilla.org/en-US/firefox/addon/hunterio/",
    store: "Firefox Store"
  },
  {
    name: "HackTools",
    description: "Collection of useful payloads and tools for penetration testing",
    downloadLink: "https://addons.mozilla.org/en-US/firefox/addon/hacktools/",
    store: "Firefox Store"
  },
  {
    name: "Cookie Editor",
    description: "Advanced cookie management with security flag detection",
    downloadLink: "https://addons.mozilla.org/en-US/firefox/addon/edit-cookie/",
    store: "Firefox Store"
  },
  {
    name: "WebRTC Disable",
    description: "Protect VPN IP from WebRTC leaks",
    downloadLink: "https://addons.mozilla.org/en-US/firefox/addon/happy-bonobo-disable-webrtc/",
    store: "Firefox Store"
  },
  {
    name: "Link Gopher",
    description: "Extract all domains and links from websites and Google results",
    downloadLink: "https://addons.mozilla.org/en-US/firefox/addon/link-gopher/",
    store: "Firefox Store"
  },
  {
    name: "FindSomething",
    description: "Discover hidden parameters and secret keys",
    downloadLink: "https://addons.mozilla.org/en-US/firefox/addon/findsomething/",
    store: "Firefox Store"
  },
  {
    name: "DotGit",
    description: "Find exposed .git repositories for potential P1 information disclosure",
    downloadLink: "https://addons.mozilla.org/en-US/firefox/addon/dotgit/",
    store: "Firefox Store"
  },
  {
    name: "Open Multiple URLs",
    description: "Open multiple sites simultaneously",
    downloadLink: "https://addons.mozilla.org/en-US/firefox/addon/open-multiple-urls/",
    store: "Firefox Store"
  },
  {
    name: "uBlock Origin",
    description: "Block ads and trackers for cleaner testing",
    downloadLink: "https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/",
    store: "Firefox Store"
  },
  {
    name: "Dark Reader",
    description: "Dark mode for better night-time hunting",
    downloadLink: "https://addons.mozilla.org/en-US/firefox/addon/darkreader/",
    store: "Firefox Store"
  },
  {
    name: "User-Agent Switcher",
    description: "Test sites with different user-agent strings",
    downloadLink: "https://addons.mozilla.org/en-US/firefox/addon/uaswitcher/",
    store: "Firefox Store"
  },
  {
    name: "Retire.js",
    description: "Identify vulnerable JavaScript libraries",
    downloadLink: "https://addons.mozilla.org/en-US/firefox/addon/retire-js/",
    store: "Firefox Store"
  },
  {
    name: "Page Translator",
    description: "Translate websites to your preferred language",
    downloadLink: "https://addons.mozilla.org/en-US/firefox/addon/traduzir-paginas-web/",
    store: "Firefox Store"
  },
  {
    name: "WaybackURLs",
    description: "Fetch URLs from Wayback Machine archive",
    downloadLink: "https://addons.mozilla.org/en-US/firefox/addon/waybackurl/",
    store: "Firefox Store"
  },
  {
    name: "Shodan",
    description: "View hosting details, IP ownership, and open services for websites",
    downloadLink: "https://addons.mozilla.org/es/firefox/addon/shodan-addon/",
    store: "Firefox Store"
  }
]

export function BrowserExtensions() {
  const getStoreIcon = (store: string) => {
    if (store.includes('Firefox')) return 'fab fa-firefox'
    if (store.includes('Github')) return 'fab fa-github'
    return 'fas fa-download'
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {extensions.map((extension, index) => (
          <motion.div
            key={extension.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              ease: "easeOut" 
            }}
            className="projects group relative overflow-hidden rounded-lg border border-border bg-background/50 backdrop-blur-sm p-6 hover:bg-background/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {extension.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <i className={getStoreIcon(extension.store)}></i>
                  <span>{extension.store}</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {extension.description}
              </p>
              
              <div className="pt-2">
                <a
                  href={extension.downloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors duration-200 group-hover:shadow-md"
                >
                  <i className={getStoreIcon(extension.store)}></i>
                  Get Extension
                  <i className="fas fa-external-link-alt text-xs"></i>
                </a>
              </div>
            </div>
            
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </motion.div>
        ))}
      </div>
      

    </div>
  )
}
