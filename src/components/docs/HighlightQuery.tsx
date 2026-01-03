'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'

interface HighlightQueryProps {
  rootSelector?: string
}

export default function HighlightQuery({ rootSelector = '#docs-content-root' }: HighlightQueryProps) {
  const searchParams = useSearchParams()

  React.useEffect(() => {
    const q = (searchParams.get('q') || '').trim()
    if (!q || q.length < 2) return

    const root = document.querySelector(rootSelector) as HTMLElement | null
    if (!root) return

    const skipTags = new Set(['CODE', 'PRE', 'KBD', 'SCRIPT', 'STYLE'])
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(escaped, 'gi')

    const unwrapExistingMarks = () => {
      const marks = root.querySelectorAll('mark')
      marks.forEach((m) => {
        const parent = m.parentNode
        if (!parent) return
        while (m.firstChild) parent.insertBefore(m.firstChild, m)
        parent.removeChild(m)
      })
    }

    const applyHighlight = () => {
      unwrapExistingMarks()

      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: (node: Node) => {
          const parent = node.parentElement
          if (!parent) return NodeFilter.FILTER_REJECT
          if (skipTags.has(parent.tagName)) return NodeFilter.FILTER_REJECT
          if (!node.nodeValue || !regex.test(node.nodeValue)) return NodeFilter.FILTER_SKIP
          regex.lastIndex = 0
          return NodeFilter.FILTER_ACCEPT
        }
      })

      const textNodes: Text[] = []
      let n = walker.nextNode()
      while (n) {
        textNodes.push(n as Text)
        n = walker.nextNode()
      }

      let firstMark: HTMLElement | null = null
      for (const textNode of textNodes) {
        const value = textNode.nodeValue || ''
        const parts = value.split(regex)
        const matches = value.match(regex)
        if (!matches) continue
        const frag = document.createDocumentFragment()
        for (let i = 0; i < parts.length; i++) {
          if (parts[i]) frag.appendChild(document.createTextNode(parts[i]))
          if (i < parts.length - 1) {
            const mark = document.createElement('mark')
            mark.textContent = matches[i] || ''
            mark.className = 'bg-yellow-300/40 text-foreground rounded px-0.5'
            if (!firstMark) firstMark = mark
            frag.appendChild(mark)
          }
        }
        const parent = textNode.parentNode
        if (parent) parent.replaceChild(frag, textNode)
      }

      if (firstMark) {
        firstMark.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }

    // Initial apply
    applyHighlight()

    // Observe async content (e.g., JSON-driven components) and re-apply highlighting
    const observer = new MutationObserver(() => {
      // Debounce via rAF
      requestAnimationFrame(() => applyHighlight())
    })
    observer.observe(root, { childList: true, subtree: true })

    // Stop observing after 5 seconds to avoid permanent overhead
    const stopTimer = window.setTimeout(() => observer.disconnect(), 5000)

    return () => {
      observer.disconnect()
      window.clearTimeout(stopTimer)
    }
  }, [searchParams, rootSelector])

  return null
}


