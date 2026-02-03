'use client'

import React from 'react'

const CopyButton = ({ code, onCopied }: { code: string; onCopied?: () => void }) => {
    const onCopy = async () => {
        try {
            await navigator.clipboard.writeText(code)
            if (onCopied) onCopied()
        } catch { }
    }
    return (
        <button
            type="button"
            onClick={onCopy}
            className="inline-flex items-center gap-2 px-2 py-1 text-[10px] font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded border-0 focus:outline-none focus:ring-0 transition-colors"
        >
            Copy
        </button>
    )
}

const CommandTable = ({ title, commands, onCopied }: { title: string; commands: { command: string; desc: string }[]; onCopied: () => void }) => (
    <div className="space-y-4">
        <h3 className="text-2xl font-semibold border-b border-border pb-2">{title}</h3>
        <div className="overflow-x-auto border border-border rounded-lg">
            <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-accent/50 text-accent-foreground font-semibold">
                    <tr>
                        <th className="px-4 py-3 border-r border-border w-2/3">Command</th>
                        <th className="px-4 py-3">Description</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {commands.map((cmd, idx) => (
                        <tr key={idx} className="hover:bg-accent/30 transition-colors">
                            <td className="px-4 py-3 font-mono text-xs border-r border-border group relative">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="break-all">{cmd.command}</span>
                                    <CopyButton code={cmd.command} onCopied={onCopied} />
                                </div>
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">{cmd.desc}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
)

export function CliShortcuts() {
    const [toast, setToast] = React.useState<string | null>(null)
    const toastTimerRef = React.useRef<number | null>(null)

    const handleCopied = () => {
        setToast('Copied to clipboard')
        if (toastTimerRef.current) {
            window.clearTimeout(toastTimerRef.current)
        }
        toastTimerRef.current = window.setTimeout(() => setToast(null), 1600)
    }

    const sections = [
        {
            title: "Emulator Commands",
            commands: [
                { command: "emulator -list-avds", desc: "List available Android Virtual Devices" },
                { command: "emulator -avd New-Pixel_4 -writable-system -no-snapshot", desc: "Start emulator with writable system" },
                { command: "emulator -avd Pixel_3a_Root -writable-system -no-snapshot -port 5560", desc: "Start emulator on specific port" }
            ]
        },
        {
            title: "MOBSF",
            commands: [
                { command: "docker run -it --rm -p 8000:8000 -p 1337:1337 -e MOBSF_ANALYZER_IDENTIFIER=emulator-5554 opensecurity/mobile-security-framework-mobsf:latest", desc: "Start MOBSF container" }
            ]
        },
        {
            title: "ADB Commands",
            commands: [
                { command: "adb shell pm list packages -3", desc: "List 3rd party packages" },
                { command: "adb shell getprop ro.product.cpu.abi", desc: "Get device CPU architecture" },
                { command: "adb push frida-server /data/local/tmp/", desc: "Push file to device" },
                { command: "adb -s emulator-5560 push C:\\Users\\HP\\Downloads\\frida-server /data/local/tmp", desc: "Push to specific emulator" },
                { command: "adb shell \"chmod +x /data/local/tmp/frida-server\"", desc: "Make frida-server executable" },
                { command: "adb shell \"/data/local/tmp/frida-server &\"", desc: "Start frida-server in background" }
            ]
        },
        {
            title: "Frida Commands",
            commands: [
                { command: "frida-ps -Uia", desc: "List running apps on USB device" },
                { command: "frida -U -f com.target.app --no-pause -l ssl-pinning-bypass.js", desc: "Inject script into app" },
                { command: "frida --codeshare dzonerzy/fridantiroot -f <package-name> -U", desc: "Use anti-root detection script" },
                { command: "frida --codeshare masbog/frida-android-unpinning-ssl -f <package-name> -U", desc: "Use SSL unpinning script" }
            ]
        },
        {
            title: "Objection Commands",
            commands: [
                { command: "objection-connect", desc: "Connect to device" },
                { command: "objection-patch <my.apk>", desc: "Patch APK for objection" },
                { command: "objection -g <package name> explore", desc: "Explore app with objection" },
                { command: "android root disable", desc: "Disable root detection" },
                { command: "android sslpinning disable", desc: "Disable SSL pinning" },
                { command: "android hooking watch class <package-name>.UserMainActivity", desc: "Watch class methods" },
                { command: "android hooking list classes", desc: "List all classes" }
            ]
        },
        {
            title: "Drozer Commands",
            commands: [
                { command: "help", desc: "Show help menu with commands" },
                { command: "list", desc: "List all available modules" },
                { command: "run <module>", desc: "Run a specific module" },
                { command: "run app.package.list", desc: "List installed packages" },
                { command: "run app.package.attacksurface -a <package>", desc: "Show attack surface (exported components)" },
                { command: "run app.package.info -a <package>", desc: "Show detailed info about a package" },
                { command: "run app.activity.info -a <package>", desc: "List activities of an app" },
                { command: "run app.provider.info -a <package>", desc: "List content providers" },
                { command: "run app.service.info -a <package>", desc: "List services" },
                { command: "run app.broadcast.info -a <package>", desc: "List broadcast receivers" },
                { command: "run app.activity.start -a <package> -n <activity>", desc: "Start a specific activity" },
                { command: "run scanner.provider.injection -a <package>", desc: "Check for SQL injection in content providers" },
                { command: "run scanner.provider.access -a <package>", desc: "Check for content provider access issues" },
                { command: "run scanner.misc.debuggable -a <package>", desc: "Check if app is debuggable" },
                { command: "run scanner.misc.exportedcomponents -a <package>", desc: "Check for exported components" },
                { command: "run scanner.permissions.findleaks -a <package>", desc: "Find permission leaks" },
                { command: "run exploit.reinvokeactivity -a <package> -n <activity>", desc: "Exploit activity re-invocation" },
                { command: "run exploit.debug", desc: "Exploit debugging features" },
                { command: "run exploit.serial -a <package>", desc: "Check for serial number leaks" },
                { command: "run shell", desc: "Get a shell on the device" },
                { command: "run shell pm list packages", desc: "List all packages via shell" },
                { command: "run shell dumpsys package <package>", desc: "Get package dump information" },
                { command: "run file.list -p /path/", desc: "List files in a directory" },
                { command: "run file.download -p <path>", desc: "Download file from device" },
                { command: "run app.package.dump -a <package>", desc: "Dump manifest & app details" },
                { command: "run scanner.activity.launcher -a <package>", desc: "Check for launcher activities" },
                { command: "run scanner.broadcast.receiver -a <package>", desc: "Scan for vulnerable broadcast receivers" },
                { command: "run scanner.service.exported -a <package>", desc: "Detect exported services" },
                { command: "run scanner.file.find -f <filename>", desc: "Find files matching filename" },
                { command: "run scanner.file.find -p <path>", desc: "Search files recursively under path" },
                { command: "run scanner.intent.receiver -a <package>", desc: "Test intent receivers for possible hijacking" },
                { command: "run scanner.intent.sender -a <package>", desc: "Test sending intents to apps" },
                { command: "run exploit.activity.intent -a <package> -n <activity>", desc: "Exploit vulnerable activity intents" },
                { command: "run exploit.provider.injection -a <package>", desc: "Exploit content provider SQL injection" },
                { command: "run exploit.provider.insert -a <package>", desc: "Insert malicious data into content provider" },
                { command: "run exploit.provider.delete -a <package>", desc: "Delete data via content provider" },
                { command: "run exploit.provider.update -a <package>", desc: "Update data via content provider" },
                { command: "run exploit.provider.query -a <package>", desc: "Query data via content provider" },
                { command: "run scanner.credentials.find", desc: "Find exposed credentials on device" },
                { command: "run scanner.storage.find", desc: "Find sensitive files in storage" },
                { command: "run scanner.intent.injection", desc: "Detect intent injection vulnerabilities" },
                { command: "run exploit.sharedprefs.read -a <package> -p <path>", desc: "Read shared preferences file" },
                { command: "run exploit.sharedprefs.write -a <package> -p <path> -k <key> -v <value>", desc: "Modify shared preferences" },
                { command: "run scanner.webview.loadurl", desc: "Test if app loads arbitrary URLs in WebView" },
                { command: "run scanner.webview.javascript", desc: "Detect vulnerable WebView JavaScript interfaces" },
                { command: "run exploit.ssl.trustmanager", desc: "Test SSL trust manager bypass" },
                { command: "run scanner.permission.injection", desc: "Check for permission escalation opportunities" },
                { command: "run exploit.permission.escalation", desc: "Try permission escalation" },
                { command: "run scanner.database.leak -a <package>", desc: "Detect database leaks" },
                { command: "run scanner.crypto.insecure -a <package>", desc: "Detect insecure crypto usage" },
                { command: "run scanner.network.manifest", desc: "Check for insecure network configurations in manifest" },
                { command: "run scanner.misc.nativecode", desc: "Check for native code usage that may be vulnerable" },
                { command: "run scanner.misc.screenshots", desc: "Detect if app allows screenshots" },
                { command: "run exploit.binding.command", desc: "Try to execute system commands via exported bindings" }
            ]
        }
    ]

    return (
        <div className="space-y-12 pb-12">
            {toast && (
                <div className="fixed top-4 right-4 z-50 border border-border bg-card rounded-md shadow-md px-4 py-2 text-sm animate-in fade-in slide-in-from-top-4">
                    {toast}
                </div>
            )}

            {sections.map((section, idx) => (
                <CommandTable key={idx} title={section.title} commands={section.commands} onCopied={handleCopied} />
            ))}
        </div>
    )
}
