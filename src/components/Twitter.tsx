'use client'

import React from 'react'

// Keep type explicit for clarity
export type TwitterRow = {
  index: number
  username: string
  href: string
}

async function fetchTwitterRows(): Promise<TwitterRow[]> {
  try {
    // In Next.js, files under public/ are served from the site root
    const res = await fetch('/r/twitter.json', { cache: 'no-store' })
    if (!res.ok) return []
    const data = (await res.json()) as TwitterRow[]
    // Basic validation and sort by index to ensure stable order
    return data
      .filter(r => typeof r.index === 'number' && typeof r.username === 'string' && typeof r.href === 'string')
      .sort((a, b) => a.index - b.index)
  } catch {
    return []
  }
}

export function Twitter() {
  const [rows, setRows] = React.useState<TwitterRow[] | null>(null)

  React.useEffect(() => {
    let cancelled = false
    fetchTwitterRows().then(r => {
      if (!cancelled) setRows(r)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const items = rows ?? []

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((row) => (
          <div
            key={row.index}
            className="projects h-full border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors flex flex-col"
          >
            <div className="space-y-2 flex-1 flex flex-col">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold leading-tight">
                  {row.username}
                </h3>
                <span className="text-xs text-muted-foreground">#{row.index}</span>
              </div>

              <p className="text-sm text-muted-foreground leading-snug">
                Curated security account to follow on X (Twitter).
              </p>

              <div className="pt-2 mt-auto">
                <a
                  href={row.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors no-underline border-0 focus:outline-none focus:ring-0"
                >
                  <i className="fab fa-twitter"></i>
                  Open Profile
                  <i className="fas fa-external-link-alt text-xs"></i>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Twitter



