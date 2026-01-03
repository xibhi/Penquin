'use client'

import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { Button } from '@/components/ui/button'

interface Report {
    title: string
    speaker: string
    link: string
}

// Data reconstructed from provided HTML, preserving exact order
const reports: Report[] = [
    {
        "title": "Pwning Android Apps at Scale",
        "speaker": "-",
        "link": "https://www.youtube.com/watch?v=24MwHjqMjRk"
    },
    {
        "title": "Hacking Mobile Applications with Frida",
        "speaker": "David Coursey",
        "link": "https://www.youtube.com/watch?v=xwyXgykedzk"
    },
    {
        "title": "Unlocking secrets of proprietary software using Frida",
        "speaker": "-",
        "link": "https://www.youtube.com/watch?v=QC2jQI7GLus&list=PLn4fSTVui_Gwrvhlc7HtHwg3kvZo5b4xV&index=1"
    },
    {
        "title": "Hacking Banking app",
        "speaker": "-",
        "link": "https://www.youtube.com/watch?v=iMNs8YAy6pk&list=PLn4fSTVui_Gwrvhlc7HtHwg3kvZo5b4xV&index=4"
    },
    {
        "title": "Conference Talks by Laurie Kirk",
        "speaker": "Laurie Kirk",
        "link": "https://www.youtube.com/playlist?list=PLn_It163He30yWraeRxdKfEFlLANJnlDE"
    }
]

export function ConferenceTalks() {
    return (
        <div className="space-y-4">
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 bg-muted/50 rounded-t-lg border-b border-border text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <div className="col-span-4">Title</div>
                <div className="col-span-4">Speaker</div>
                <div className="col-span-4 text-right">Link</div>
            </div>
            <div className="divide-y divide-border border rounded-lg overflow-hidden">
                {reports.map((report, idx) => (
                    <div
                        key={`${report.title}-${idx}`}
                        className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center p-4 hover:bg-accent/40 transition-colors bg-card"
                    >
                        <div className="md:col-span-4">
                            <span className="inline-flex items-center rounded-lg px-2 py-1 text-xs font-medium ring-1 ring-inset ring-primary/20 bg-primary/5 text-primary">
                                {report.title || 'General'}
                            </span>
                        </div>

                        <div className="md:col-span-7">
                            <h4 className="text-sm font-medium leading-tight text-foreground">
                                {report.speaker}
                            </h4>
                        </div>

                        {/* Link - Desktop: col-span-4 */}
                        <div className="md:col-span-1 flex justify-end">
                            <Button variant="hidden" size="icon" asChild className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                                <a href={report.link} target="_blank" rel="noopener noreferrer" title="View Report">
                                    <FaExternalLinkAlt className="h-3.5 w-3.5" />
                                </a>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


