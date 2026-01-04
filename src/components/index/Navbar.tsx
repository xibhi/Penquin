'use client'

import React from 'react'
import DarkModeToggle from '../DarkModeToggle'
import Image from 'next/image'
import Link from 'next/link'
import { FaGithub, FaXTwitter } from 'react-icons/fa6'
import { FaSearch } from "react-icons/fa";
import { usePathname } from 'next/navigation'
import { searchDocs, staticDocsData, type SearchResult } from '@/lib/docsSearch'

const Navbar = () => {
  const pathname = usePathname()
  const isDocs = pathname?.startsWith('/docs')
  const [showSearch, setShowSearch] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [query, setQuery] = React.useState('')
  const [results, setResults] = React.useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [allDocs, setAllDocs] = React.useState<SearchResult[]>(staticDocsData)

  const highlightMatch = React.useCallback((text: string, q: string) => {
    const queryText = q.trim()
    if (!text || !queryText || queryText.length < 2) return text
    try {
      const escaped = queryText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const regex = new RegExp(escaped, 'gi')
      const parts = text.split(regex)
      const matches = text.match(regex)
      if (!matches) return text
      const nodes: React.ReactNode[] = []
      for (let i = 0; i < parts.length; i++) {
        nodes.push(parts[i])
        if (i < parts.length - 1) {
          const m = matches[i]
          nodes.push(
            <mark key={`hl-${i}`} className="bg-yellow-300/40 text-foreground rounded px-0.5">
              {m}
            </mark>
          )
        }
      }
      return <>{nodes}</>
    } catch {
      return text
    }
  }, [])

  React.useEffect(() => {
    if (showSearch) inputRef.current?.focus()
  }, [showSearch])

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.key === 'k' || e.key === 'K') && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        setShowSearch((v) => !v)
      }
      if (e.key === 'Escape') setShowSearch(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Load public/r datasets and extend index with item-level entries
  React.useEffect(() => {
    let cancelled = false
    async function loadDatasets() {
      try {
        const endpoints = [
          { url: '/r/twitter.json', page: '/docs/twitter', title: 'Twitter' },
          { url: '/r/discord.json', page: '/docs/discord', title: 'Discord' },
          { url: '/r/youtube.json', page: '/docs/youtube', title: 'YouTube' },
          { url: '/r/medium.json', page: '/docs/medium', title: 'Medium' },
          { url: '/r/security-gitbooks.json', page: '/docs/security-gitbooks', title: 'Security GitBooks' },
        ] as const

        const fetched = await Promise.allSettled(
          endpoints.map(async (e) => {
            const res = await fetch(e.url, { cache: 'force-cache' })
            if (!res.ok) throw new Error('Failed to load ' + e.url)
            const data = await res.json()
            return { key: e, data }
          })
        )

        const extraItems: SearchResult[] = []
        for (const r of fetched) {
          if (r.status !== 'fulfilled') continue
          const { key, data } = r.value
          if (key.title === 'Twitter' && Array.isArray(data)) {
            for (const item of data) {
              const username = typeof item?.username === 'string' ? item.username : undefined
              const href = typeof item?.href === 'string' ? item.href : undefined
              if (!username) continue
              extraItems.push({
                title: `${username} — Twitter`,
                url: key.page,
                slug: key.page.replace('/docs/', ''),
                description: href,
                content: `${username} ${href ?? ''}`.trim(),
              })
            }
          } else if (key.title === 'YouTube' && Array.isArray(data)) {
            for (const item of data) {
              const username = typeof item?.username === 'string' ? item.username : undefined
              const href = typeof item?.href === 'string' ? item.href : undefined
              if (!username) continue
              extraItems.push({
                title: `${username} — YouTube`,
                url: key.page,
                slug: key.page.replace('/docs/', ''),
                description: href,
                content: `${username} ${href ?? ''}`.trim(),
              })
            }
          } else if (key.title === 'Medium' && Array.isArray(data)) {
            for (const item of data) {
              const username = typeof item?.username === 'string' ? item.username : undefined
              const href = typeof item?.href === 'string' ? item.href : undefined
              if (!username) continue
              extraItems.push({
                title: `${username} — Medium`,
                url: key.page,
                slug: key.page.replace('/docs/', ''),
                description: href,
                content: `${username} ${href ?? ''}`.trim(),
              })
            }
          } else if (key.title === 'Discord' && Array.isArray(data)) {
            for (const item of data) {
              const title = typeof item?.title === 'string' ? item.title : undefined
              const href = typeof item?.href === 'string' ? item.href : undefined
              if (!title) continue
              extraItems.push({
                title: `${title} — Discord`,
                url: key.page,
                slug: key.page.replace('/docs/', ''),
                description: href,
                content: `${title} ${href ?? ''}`.trim(),
              })
            }
          } else if (key.title === 'Security GitBooks' && Array.isArray(data)) {
            for (const item of data) {
              const title = typeof item?.title === 'string' ? item.title : undefined
              const href = typeof item?.href === 'string' ? item.href : undefined
              const label = typeof item?.label === 'string' ? item.label : undefined
              if (!title) continue
              extraItems.push({
                title: `${title} — Security GitBooks`,
                url: key.page,
                slug: key.page.replace('/docs/', ''),
                description: label || href,
                content: `${title} ${label ?? ''} ${href ?? ''}`.trim(),
              })
            }
          }
        }

        if (!cancelled && extraItems.length > 0) {
          setAllDocs((prev) => [...prev, ...extraItems])
        }
      } catch {
        // ignore
      }
    }
    loadDatasets()
    return () => { cancelled = true }
  }, [])

  React.useEffect(() => {
    let active = true
    const timeout = setTimeout(() => {
      if (!query || query.trim().length < 2) {
        setResults(allDocs) // Show all docs when query is empty or too short
        setIsLoading(false)
        return
      }

      setIsLoading(true)

      // Use client-side search with all docs content
      const searchResults = searchDocs(query, allDocs)

      if (active) {
        setResults(searchResults)
        setIsLoading(false)
      }
    }, 200)

    return () => {
      active = false
      clearTimeout(timeout)
    }
  }, [query, allDocs])

  return (
    <div className='h-16 w-full'>
      <div className='fixed w-full inset-x-0 bg-background border-b border-border top-0 z-50 flex justify-between items-center md:px-20 px-8 py-4'>
        <div className='flex items-center'>
          <Link href={'/'} className='flex items-center gap-2'>
            <Image
              src={'/Penquin.png'}
              height={30}
              width={30}
              alt='Penquin - Cyber Security Tool Logo'
              className='rounded-md invert dark:invert-0'
            />
            <h2 className='text-xl font-sans font-bold tracking-tight'>Penquin</h2>
          </Link>
          {isDocs && (
            <Link
              href={'/docs'}
              className='hidden lg:flex items-center gap-2 text-foreground no-underline absolute left-[18rem]'
            >
              <span className='text-xl font-sans font-bold tracking-tight'>Documentation</span>
            </Link>
          )}
        </div>
        <div className='flex items-center gap-2'>
          {isDocs && (
            <button
              type='button'
              aria-label='Search documentation'
              onClick={() => setShowSearch((v) => !v)}
              className='hidden sm:flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors'
            >
              <FaSearch className='h-3.5 w-3.5' />
              <span className='hidden md:inline'>Search documentation..</span>
              <kbd className='ml-2 hidden lg:inline-flex items-center justify-center rounded border bg-muted px-1.5 text-[10px] leading-none'>K</kbd>
            </button>
          )}
          <Link href={'https://github.com/xibhi/penquin'} target={'_blank'} className='p-2 rounded-full cursor-pointer'><FaGithub size={18} /></Link>
          <Link href={'https://x.com/PenquinTool'} target={'_blank'} className='p-2 rounded-full cursor-pointer'><FaXTwitter size={18} /></Link>
          <DarkModeToggle />
        </div>
      </div>
      {isDocs && showSearch && (
        <div className='fixed top-16 left-0 right-0 z-[60] flex justify-center px-4'>
          <div className='w-full max-w-2xl rounded-md border border-border bg-background shadow-lg'>
            <div className='p-3 flex items-center gap-2'>
              <FaSearch className='h-4 w-4 text-muted-foreground' />
              <input
                ref={inputRef}
                type='text'
                placeholder='Search docs (press Esc to close)'
                className='w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground'
                aria-label='Search docs'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                onClick={() => setShowSearch(false)}
                className='text-xs px-2 py-1 rounded border border-border text-muted-foreground hover:text-foreground'
              >
                Esc
              </button>
            </div>
            <div className='border-t border-border max-h-[60vh] overflow-auto'>
              {isLoading && (
                <div className='p-4 text-sm text-muted-foreground'>Searching through all docs content...</div>
              )}
              {!isLoading && query.trim().length >= 2 && results.length === 0 && (
                <div className='p-4 text-sm text-muted-foreground'>No results found for &quot;{query}&quot;. Try a different search term.</div>
              )}
              {!isLoading && results.length > 0 && (
                <div className='p-2 text-xs text-muted-foreground border-b border-border'>
                  {query.trim().length >= 2 ? `Found ${results.length} result${results.length === 1 ? '' : 's'} for &quot;{query}&quot;` : `Showing all ${results.length} docs pages`}
                </div>
              )}
              <ul className='divide-y divide-border'>
                {results.map((r, i) => (
                  <li key={`${r.url}-${i}`} className='group'>
                    <a href={`${r.url}${query.trim().length >= 2 ? `?q=${encodeURIComponent(query.trim())}` : ''}`} className='flex gap-3 items-start p-3 no-underline hover:bg-accent/40'>
                      <div className='mt-0.5 h-1.5 w-1.5 rounded-full bg-muted-foreground group-hover:bg-primary' />
                      <div className='flex-1'>
                        <div className='text-sm font-medium text-foreground group-hover:text-primary'>
                          {typeof r.title === 'string' ? highlightMatch(r.title, query) : r.title}
                        </div>
                        {r.description && (
                          <div className='text-xs text-muted-foreground line-clamp-1'>
                            {highlightMatch(r.description, query)}
                          </div>
                        )}
                        {r.content && query.trim().length >= 2 && (
                          <div className='text-xs text-muted-foreground line-clamp-2 mt-1'>
                            {highlightMatch(r.content, query)}
                          </div>
                        )}
                        <div className='text-[10px] text-muted-foreground mt-1'>{r.url}</div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar