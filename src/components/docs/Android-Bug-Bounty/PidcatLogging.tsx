'use client'

import React from 'react'
import Link from 'next/link'

const CopyCodeCard = ({ code, onCopied }: { code: string; onCopied?: () => void }) => {
    const onCopy = async () => {
        try {
            await navigator.clipboard.writeText(code)
            if (onCopied) onCopied()
        } catch { }
    }
    return (
        <div
            className="projects h-full border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors flex items-start justify-between gap-3 my-2"
        >
            <code className="text-sm font-mono break-all">{code}</code>
            <button
                type="button"
                onClick={onCopy}
                aria-label="Copy command"
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors no-underline border-0 focus:outline-none focus:ring-0"
            >
                Copy
            </button>
        </div>
    )
}

export function PidcatLogging() {
    const [toast, setToast] = React.useState<string | null>(null)
    const toastTimerRef = React.useRef<number | null>(null)

    const handleCopied = () => {
        setToast('Copied to clipboard')
        if (toastTimerRef.current) {
            window.clearTimeout(toastTimerRef.current)
        }
        toastTimerRef.current = window.setTimeout(() => setToast(null), 1600)
    }

    return (
        <div className="space-y-8">
            {toast && (
                <div
                    className="fixed top-4 right-4 z-50 border border-border bg-card rounded-md shadow-md px-4 py-2 text-sm"
                >
                    {toast}
                </div>
            )}

            <p>
                A focused <code className="py-px px-1.5 ring-1 ring-inset ring-tint bg-tint rounded-sm text-[.875em]">logcat</code> wrapper for Android security researchers and bug bounty hunters — helps filter logs from a specific app instead of the entire device, making vulnerability analysis faster and cleaner.
            </p>

            <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Why Use PIDCAT?</h3>

                <div className="space-y-4">
                    <h4 className="text-xl font-semibold">adb logcat (Default behavior)</h4>
                    <CopyCodeCard code="adb devices" onCopied={handleCopied} />
                    <CopyCodeCard code="adb -s <device-ip:port> logcat" onCopied={handleCopied} />
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Captures all logs from the device: system, apps, services.</li>
                        <li>Noisy and difficult to isolate logs for one app.</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-xl font-semibold">pidcat (Focused behavior)</h4>
                    <CopyCodeCard code="pidcat -s <device-ip:port> <package.name>" onCopied={handleCopied} />
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Captures logs only from a specific app using its PID (process ID).</li>
                        <li>Automatically updates PID if the app restarts.</li>
                        <li>Filters out irrelevant system logs.</li>
                    </ul>
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Installation</h3>

                <div className="space-y-4">
                    <h4 className="text-xl font-semibold">1. Clone the Repository</h4>
                    <CopyCodeCard code="git clone https://github.com/JakeWharton/pidcat.git" onCopied={handleCopied} />
                    <CopyCodeCard code="cd pidcat" onCopied={handleCopied} />
                </div>

                <div className="space-y-4">
                    <h4 className="text-xl font-semibold">2. Run Directly</h4>
                    <p className="font-semibold">On Linux/macOS:</p>
                    <CopyCodeCard code="./pidcat.py -s <device-ip:port> <package.name>" onCopied={handleCopied} />
                    <p className="font-semibold">On Windows:</p>
                    <CopyCodeCard code="python pidcat.py -s <device-ip:port> <package.name>" onCopied={handleCopied} />
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Make It Universal on Windows</h3>
                <p>To run <code className="py-px px-1.5 ring-1 ring-inset ring-tint bg-tint rounded-sm text-[.875em]">pidcat</code> from any directory:</p>

                <ol className="list-decimal pl-5 space-y-4">
                    <li>
                        Move <code className="py-px px-1.5 ring-1 ring-inset ring-tint bg-tint rounded-sm text-[.875em]">pidcat.py</code> to a folder like <code className="py-px px-1.5 ring-1 ring-inset ring-tint bg-tint rounded-sm text-[.875em]">C:\Tools\pidcat\</code>
                    </li>
                    <li>
                        Add that folder to the System PATH:
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Open Environment Variables</li>
                            <li>Edit the <code className="py-px px-1.5 ring-1 ring-inset ring-tint bg-tint rounded-sm text-[.875em]">Path</code> variable</li>
                            <li>Add: <code className="py-px px-1.5 ring-1 ring-inset ring-tint bg-tint rounded-sm text-[.875em]">C:\Tools\pidcat</code></li>
                        </ul>
                    </li>
                    <li>
                        (Optional) Create <code className="py-px px-1.5 ring-1 ring-inset ring-tint bg-tint rounded-sm text-[.875em]">pidcat.bat</code> in the same folder:
                        <CopyCodeCard code="@echo off&#10;python C:\Tools\pidcat\pidcat.py %*" onCopied={handleCopied} />
                    </li>
                </ol>

                <p>Now you can run:</p>
                <CopyCodeCard code="pidcat -s <device-ip:port> com.target.app" onCopied={handleCopied} />
            </div>

            <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Example Commands</h3>
                <div className="space-y-4">
                    <p className="font-semibold">For a remote device:</p>
                    <CopyCodeCard code="pidcat -s 192.168.0.101:5555 com.target.app" onCopied={handleCopied} />
                    <p className="font-semibold">For a USB device:</p>
                    <CopyCodeCard code="pidcat com.target.app" onCopied={handleCopied} />
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Original Repository</h3>
                <Link
                    href="https://github.com/JakeWharton/pidcat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                >
                    https://github.com/JakeWharton/pidcat
                </Link>
            </div>
        </div>
    )
}
