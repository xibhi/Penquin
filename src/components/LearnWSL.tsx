'use client'

import React from 'react'

//

const installSteps: { title: string; body?: string; code?: string[] }[] = [
  { title: '1.1 Enable Windows Features', body: 'Enable the following features in the Windows Feature app:\n- Windows Subsystem for Linux\n- Virtual Machine Platform' },
  { title: '1.2 Install WSL', body: 'Open CMD as an administrator and type:', code: ['wsl --install'] },
  { title: '1.3 Restart Your PC', body: 'Restart your computer to apply changes.' },
  { title: '1.4 Install Applications from Microsoft Store', body: 'Go to the Microsoft Store and install:\n- Windows Subsystem for Linux\n- Your preferred Linux Distribution (e.g., Ubuntu, Kali Linux, Debian, Oracle, Arch, etc.)' },
  { title: '1.5 Set Up the Linux Distribution', body: 'Open the Linux app and complete the installation process for your chosen Linux distribution.' },
  { title: '1.6 Final Restart', body: 'Restart your PC to finalize the setup.' },
  { title: '1.7 Installation Complete', body: 'Your WSL installation is now complete.' },
]

const extraWSL: { title: string; code: string[]; body?: string }[] = [
  { title: '2.1 Update WSL', body: 'To update the WSL version:', code: ['wsl --update'] },
  { title: '2.2 WSL Version Information', body: 'To get information about WSL, WSLg, and the kernel version:', code: ['wsl --version'] },
  { title: '2.3 List Installed Distributions', body: 'To get a list of all installed distributions:', code: ['wsl --list', 'wsl --all', 'wsl --running', 'wsl --quiet', 'wsl --verbose', 'wsl --online'] },
  { title: '2.4 Set Default Distribution', body: 'To set the default Linux distribution:', code: ['wsl --set-default <Distro>'] },
]

const wslgInstall: { title: string; body?: string; code?: string[] }[] = [
  { title: '3.1 Update and Upgrade Linux Distribution', body: 'Open your Linux distribution and run:', code: ['sudo apt update && sudo apt upgrade'] },
  { title: '3.2 Install Win-KeX', body: 'Install Win-KeX for GUI support:', code: ['sudo apt install kali-win-kex'] },
  { title: '3.3 Configure Win-KeX', body: 'Follow the prompts to fill in the required information.' },
  { title: '3.4 Start GUI', body: 'To start the GUI, type in the terminal:', code: ['kex'] },
]

const modes = [
  { label: 'Window Mode (default)', code: '' },
  { label: 'Enhanced Session Mode', code: '--esm', desc: 'Launch Win-KeX desktop in a dedicated window using Windows native RDP.' },
  { label: 'Seamless Mode', code: '--sl', desc: 'Integrate Win-KeX into the Windows desktop seamlessly.' },
  { label: 'Window Mode', code: '--win', desc: 'Launch Win-KeX desktop in a dedicated window.' },
]

const commands = [
  { label: 'Start Win-KeX server and client', code: '' },
  { label: 'Start Win-KeX server', code: '--start' },
  { label: 'Start Win-KeX client', code: '--start-client' },
  { label: 'Launch in Windows Terminal', code: '--wtstart' },
  { label: 'Stop Win-KeX server', code: '--stop' },
  { label: 'Check Win-KeX server status', code: '--status' },
  { label: 'Stop server and kill processes', code: '--kill' },
  { label: 'Set server password', code: '--passwd' },
  { label: 'Start/Stop Windows sound server', code: '--start-sound / --stop-sound' },
  { label: 'Manage WSLg unix socket', code: '--wslg-restore / --wslg-remove / --wslg-status' },
  { label: 'Display Win-KeX version', code: '--version' },
  { label: 'Display help', code: '--help' },
]

const optionalParams = [
  { label: 'Use container IP address', code: '--ip or -i' },
  { label: 'Optimized for multiscreen', code: '--multiscreen or -m' },
  { label: 'Sound support', code: '--sound or -s' },
  { label: 'Disable Windows OpenGL', code: '--nowgl or -n' },
  { label: 'Disable client reconnecting', code: '--norc or -r' },
  { label: 'Wait longer for desktop in SL mode', code: '--wait or -w' },
  { label: 'Verbose output', code: '--verbose' },
]

const examples = [
  { body: 'Start Win-KeX server in window mode and launch Win-KeX client with sound support:', code: ['kex -s'] },
  { body: 'Start Win-KeX in seamless mode and launch Win-KeX client with sound support:', code: ['kex --sl -s'] },
  { body: 'Start Win-KeX in Enhanced Session Mode with ARM workaround and launch Win-KeX client with sound support:', code: ['kex --esm -i -s'] },
  { body: 'Start Win-KeX server as root in window mode and launch Win-KeX client:', code: ['sudo kex'] },
]

const CopyCodeCard = ({ code, onCopied }: { code: string; onCopied?: () => void }) => {
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      if (onCopied) onCopied()
    } catch {}
  }
  return (
    <div
      className="projects h-full border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors flex items-start justify-between gap-3"
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

export function LearnWSL() {
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

      {/* Installation section */}
      {installSteps.map((step) => (
        <div key={step.title} className="space-y-2">
          <h4 className="text-xl font-semibold">
            {step.title}
          </h4>
          {step.body && (
            <p>
              {step.body}
            </p>
          )}
          {step.code && step.code.length > 0 && step.code.map((c) => (
            <CopyCodeCard key={c} code={c} onCopied={handleCopied} />
          ))}
        </div>
      ))}

      {/* Extra WSL */}
      <h3 className="text-2xl font-semibold">
        2. Extra WSL Commands to Get Started
      </h3>
      {extraWSL.map((s) => (
        <div key={s.title} className="space-y-2">
          <h4 className="text-xl font-semibold">
            {s.title}
          </h4>
          {s.body && <p>{s.body}</p>}
          {s.code && s.code.map((c) => (
            <CopyCodeCard key={c} code={c} onCopied={handleCopied} />
          ))}
        </div>
      ))}

      {/* WSLg Installation */}
      <h3 className="text-2xl font-semibold">
        3. WSLg Installation
      </h3>
      {wslgInstall.map((s) => (
        <div key={s.title} className="space-y-2">
          <h4 className="text-xl font-semibold">
            {s.title}
          </h4>
          {s.body && <p>{s.body}</p>}
          {s.code && s.code.map((c) => (
            <CopyCodeCard key={c} code={c} onCopied={handleCopied} />
          ))}
        </div>
      ))}

      {/* Additional Info on WSLg */}
      <h3 className="text-2xl font-semibold">
        4. Additional Info on WSLg
      </h3>
      <h4 className="text-xl font-semibold">
        Modes
      </h4>
      <ul className="space-y-2">
        {modes.map((m) => (
          <li key={m.label}>
            <span className="font-semibold">{m.label}</span>
            {m.code && (
              <span>
                : <code className="py-px px-1.5 ring-1 ring-inset ring-tint bg-tint rounded-sm text-[.875em]">{m.code}</code>
                {m.desc ? ` - ${m.desc}` : ''}
              </span>
            )}
          </li>
        ))}
      </ul>

      <h4 className="text-xl font-semibold">
        Commands
      </h4>
      <ul className="space-y-2">
        {commands.map((c) => (
          <li key={c.label}>
            <span className="font-semibold">{c.label}</span>
            {c.code && (
              <span>
                : <code className="py-px px-1.5 ring-1 ring-inset ring-tint bg-tint rounded-sm text-[.875em]">{c.code}</code>
              </span>
            )}
          </li>
        ))}
      </ul>

      <h4 className="text-xl font-semibold">
        Optional Parameters
      </h4>
      <ul className="space-y-2">
        {optionalParams.map((p) => (
          <li key={p.label}>
            <span className="font-semibold">{p.label}</span>: <code className="py-px px-1.5 ring-1 ring-inset ring-tint bg-tint rounded-sm text-[.875em]">{p.code}</code>
          </li>
        ))}
      </ul>

      <h4 className="text-xl font-semibold">
        Examples
      </h4>
      <ul className="space-y-3">
        {examples.map((e) => (
          <li key={e.body} className="space-y-2">
            <p>{e.body}</p>
            {e.code.map((c) => (
              <CopyCodeCard key={c} code={c} onCopied={handleCopied} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  )
}


