'use client'

import React, { useState, useCallback } from 'react'

export const ReconnaissanceTools = () => {
  const [domain, setDomain] = useState('example.com')
  const [notification, setNotification] = useState('')
  const [showNotification, setShowNotification] = useState(false)

  const showNotificationMessage = useCallback((message: string) => {
    setNotification(message)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }, [])

  const validateDomain = useCallback((domain: string) => {
    if (!domain) {
      showNotificationMessage('Please enter a domain')
      return false
    }
    const pattern = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
    if (!pattern.test(domain)) {
      showNotificationMessage('Please enter a valid domain')
      return false
    }
    return true
  }, [showNotificationMessage])

  const sanitizeDomain = (domain: string): string => {
    return domain.replace(/^https?:\/\//, '').replace(/\/$/, '')
  }

  const executeToolSearch = useCallback((url: string, toolName: string) => {
    if (!validateDomain(domain)) return

    try {
      const sanitizedDomain = sanitizeDomain(domain)
      const finalUrl = url.replace(/example\.com/g, sanitizedDomain)
      window.open(finalUrl, '_blank')
    } catch {
      showNotificationMessage(`Failed to execute ${toolName}`)
    }
  }, [domain, validateDomain, showNotificationMessage])

  const executeGoogleDork = useCallback((query: string) => {
    if (!validateDomain(domain)) return

    try {
      const sanitizedDomain = sanitizeDomain(domain)
      const finalQuery = query.replace(/example\.com/g, sanitizedDomain)
      window.open(`https://www.google.com/search?q=${encodeURIComponent(finalQuery)}`, '_blank')
    } catch {
      showNotificationMessage('Failed to execute search')
    }
  }, [domain, validateDomain, showNotificationMessage])

  const ToolCard = ({ title, icon, children }: {
    title: string
    icon: string
    children: React.ReactNode
  }) => (
    <div className="projects border border-border rounded-lg p-4 bg-card hover:bg-accent/5 transition-all duration-300 h-[400px] flex flex-col">
      <div className="flex items-center gap-2 mb-4 text-lg font-semibold text-primary">
        <i className={icon}></i>
        {title}
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 pr-2">
        {children}
      </div>
    </div>
  )

  const ToolButton = ({ onClick, children, status = "Active" }: {
    onClick: () => void
    children: React.ReactNode
    status?: string
  }) => (
    <button
      onClick={onClick}
      className="w-full text-left p-3 bg-muted hover:bg-accent/20 border border-border rounded-md transition-all duration-200 hover:translate-x-1 hover:border-primary/50 flex justify-between items-center group"
    >
      <span className="text-sm">{children}</span>
      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        {status}
      </span>
    </button>
  )

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex gap-2 max-w-md mx-auto mb-4">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter domain to recon..."
            className="flex-1 px-3 py-2 border border-border rounded-md bg-background"
          />
        </div>
      </div>

      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg z-50">
          {notification}
        </div>
      )}

      {/* Tools Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Subdomain Enumeration */}
        <ToolCard title="Subdomain Enumeration" icon="fas fa-sitemap">
          <ToolButton onClick={() => executeToolSearch('https://crt.sh/?q=%.example.com', 'crt.sh')}>
            crt.sh
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://dorki.attaxa.com/search?q=site:example.com', 'dorki.attaxa.com')}>
            dorki.attaxa.com
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://securitytrails.com/list/apex_domain/example.com', 'SecurityTrails')}>
            SecurityTrails
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://www.vedbex.com/subdomain-finder/example.com', 'vedbex.com')}>
            vedbex.com
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://viewdns.info/reverseip/?host=example.com&t=1', 'viewdns.info')}>
            viewdns.info
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://google.com/search?q=site:*.example.com', '*.google')}>
            *.google
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://search.censys.io/search?resource=hosts&sort=RELEVANCE&per_page=25&virtual_hosts=EXCLUDE&q=example.com', 'search.censys.io')}>
            search.censys.io
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://www.shodan.io/search?query=example.com', 'shodan.io')}>
            shodan.io
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://www.bing.com/search?q=domain:example.com', 'Bing')}>
            Bing
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://web.archive.org/cdx/search/cdx?url=*.example.com/*&collapse=urlkey&output=text&fl=original', 'web-archive secret')}>
            web-archive secret
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://www.virustotal.com/gui/domain/example.com/relations', 'VirusTotal')}>
            VirusTotal
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://dnsdumpster.com/?target=example.com', 'DNSdumpster')}>
            DNSdumpster
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://hackertarget.com/subdomain-finder/?domain=example.com', 'HackerTarget')}>
            HackerTarget
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://sitereport.netcraft.com/?url=example.com', 'Netcraft')}>
            Netcraft
          </ToolButton>
        </ToolCard>

        {/* Secret Discovery */}
        <ToolCard title="Secret Discovery" icon="fas fa-key">
          <ToolButton onClick={() => executeToolSearch('https://web.archive.org/cdx/search/cdx?url=*.example.com/*&collapse=urlkey&output=text&fl=original&filter=original:.*\\.(xls|xml|xlsx|json|pdf|sql|doc|docx|pptx|txt|git|zip|tar\\.gz|tgz|bak|7z|rar|log|cache|secret|db|backup|yml|gz|config|csv|yaml|md|md5|exe|dll|bin|ini|bat|sh|tar|deb|rpm|iso|img|env|apk|msi|dmg|tmp|crt|pem|key|pub|asc)$', 'web.archive.org Sensitive Files')}>
            web.archive.org (Sensitive Files)
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://web.archive.org/cdx/search/cdx?url=*.example.com/*&collapse=urlkey&output=text&fl=original', 'web.archive.org All URLs')}>
            web.archive.org (All URLs)
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://otx.alienvault.com/api/v1/indicators/hostname/example.com/url_list?limit=500&page=1', 'AlienVault OTX URL List')}>
            AlienVault OTX URL List
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://web.archive.org/cdx/search/cdx?url=*.example.com/*&collapse=urlkey&output=text&fl=original&filter=original:.*\\.js$', 'JS FILES')}>
            JS FILES
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://gist.github.com/search?q=example.com+apikey&type=gists', 'GitHub Gists API Keys')}>
            GitHub Gists API Keys
          </ToolButton>
          <ToolButton onClick={() => executeGoogleDork('site:example.com (password OR secret OR credential OR token OR apikey OR api_key OR client_secret) ext:env OR ext:yml OR ext:yaml OR ext:txt OR ext:log')}>
            Config Secrets
          </ToolButton>
          <ToolButton onClick={() => executeGoogleDork('site:example.com inurl:jenkins OR inurl:.git OR inurl:.env OR inurl:id_rsa OR inurl:id_dsa')}>
            Development Secrets
          </ToolButton>
          <ToolButton onClick={() => executeGoogleDork('site:example.com (authorization:Bearer OR authorization:Basic OR authorization:AWS) ext:log OR ext:txt OR ext:env')}>
            Authorization Tokens
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://web.archive.org/cdx/search/cdx?url=*.example.com/*&collapse=urlkey&output=text&fl=original&filter=original:.*\\.env$', '.ENV')}>
            .ENV
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://www.shodan.io/search?query=Ssl.cert.subject.CN:%22example.com%22+200', 'SSL Certificate CN Search')}>
            SSL Certificate CN Search
          </ToolButton>
        </ToolCard>

        {/* Passive Reconnaissance */}
        <ToolCard title="Passive Reconnaissance" icon="fas fa-search">
          <ToolButton onClick={() => executeToolSearch('https://whois.domaintools.com/example.com', 'WHOIS Lookup')}>
            WHOIS Lookup
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://dnsdumpster.com/?q=example.com', 'DNS Information')}>
            DNS Information
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://www.ssllabs.com/ssltest/analyze.html?d=example.com', 'SSL Certificate Info')}>
            SSL Certificate Info
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://viewdns.info/reverseip/?host=example.com&t=1', 'Reverse IP Lookup')}>
            Reverse IP Lookup
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://bgp.he.net/search?search%5Bsearch%5D=example.com&commit=Search', 'ASN Lookup')}>
            ASN Lookup
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://example.com/robots.txt', 'Robots.txt Analysis')}>
            Robots.txt Analysis
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://www.virustotal.com/gui/domain/example.com/urls', 'VirusTotal URLs')}>
            VirusTotal URLs
          </ToolButton>
        </ToolCard>

        {/* S3 Bucket Enumeration */}
        <ToolCard title="S3 Bucket Enumeration" icon="fas fa-cloud">
          <ToolButton onClick={() => executeGoogleDork('site:s3.amazonaws.com example.com')}>
            AWS S3 Buckets
          </ToolButton>
          <ToolButton onClick={() => executeGoogleDork('site:storage.googleapis.com example.com')}>
            Google Cloud Storage
          </ToolButton>
          <ToolButton onClick={() => executeGoogleDork('site:blob.core.windows.net example.com')}>
            Azure Blob Storage
          </ToolButton>
        </ToolCard>

        {/* Technology Detection */}
        <ToolCard title="Technology Detection" icon="fas fa-code">
          <ToolButton onClick={() => executeToolSearch('https://builtwith.com/example.com', 'builtwith.com')}>
            builtwith.com
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://webtechsurvey.com/website/example.com', 'webtechsurvey.com')}>
            webtechsurvey.com
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://w3techs.com/sites/info/example.com', 'w3techs.com')}>
            w3techs.com
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://whatcms.org/?s=example.com', 'whatcms.org')}>
            whatcms.org
          </ToolButton>
        </ToolCard>

        {/* Port Scanning */}
        <ToolCard title="Port Scanning" icon="fas fa-network-wired">
          <ToolButton onClick={() => executeToolSearch('https://viewdns.info/portscan/?host=example.com', 'viewdns.info')}>
            viewdns.info
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://dnschecker.org/port-scanner.php?query=example.com&ptype=server', 'dnschecker.org')}>
            dnschecker.org
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://web-check.xyz/check/example.com', 'web-check.xyz')}>
            web-check.xyz
          </ToolButton>
        </ToolCard>

        {/* URL Collection */}
        <ToolCard title="URL Collection" icon="fas fa-link">
          <ToolButton onClick={() => executeToolSearch('https://web.archive.org/cdx/search/cdx?url=*.example.com/*&output=txt&collapse=urlkey&fl=original&page=/', 'web.archive.org')}>
            web.archive.org
          </ToolButton>
          <ToolButton onClick={() => executeToolSearch('https://urlscan.io/api/v1/search/?q=example.com&size=10000', 'urlscan.io')}>
            urlscan.io
          </ToolButton>
        </ToolCard>

        {/* CMS Dorking */}
        <ToolCard title="CMS Dorking" icon="fas fa-wordpress">
          <ToolButton onClick={() => executeGoogleDork('site:example.com inurl:(wp-content/plugins OR wp-admin) ext:php')}>
            WP Juicy Extensions
          </ToolButton>
          <ToolButton onClick={() => executeGoogleDork('site:example.com filetype:sql intext:wp_users phpmyadmin')}>
            WP Users
          </ToolButton>
        </ToolCard>

        {/* Directory Traversal */}
        <ToolCard title="Directory Traversal" icon="fas fa-folder-open">
          <ToolButton onClick={() => executeGoogleDork('site:example.com intitle:index.of')}>
            Directory Listing
          </ToolButton>
          <ToolButton onClick={() => executeGoogleDork('site:example.com filetype:log')}>
            Log Files
          </ToolButton>
          <ToolButton onClick={() => executeGoogleDork('site:example.com filetype:conf OR filetype:config')}>
            Config Files
          </ToolButton>
        </ToolCard>

        {/* Vulnerability Search */}
        <ToolCard title="Vulnerability Search" icon="fas fa-bug">
          <ToolButton onClick={() => executeGoogleDork('site:exploit-db.com example.com')}>
            Exploit-DB
          </ToolButton>
          <ToolButton onClick={() => executeGoogleDork('site:nvd.nist.gov example.com')}>
            NVD Database
          </ToolButton>
          <ToolButton onClick={() => executeGoogleDork('site:packetstormsecurity.com example.com')}>
            PacketStorm
          </ToolButton>
        </ToolCard>

        {/* Code & Document Search */}
        <ToolCard title="Code & Document Search" icon="fas fa-file-code">
          <ToolButton onClick={() => executeGoogleDork('site:pastebin.com example.com')}>
            Pastebin Entries
          </ToolButton>
          <ToolButton onClick={() => executeGoogleDork('site:example.com ext:(doc OR docx OR odt OR pdf OR rtf OR sxw OR psw OR ppt OR pptx OR pps OR csv)')}>
            Documents
          </ToolButton>
          <ToolButton onClick={() => executeGoogleDork('site:(github.com OR gitlab.com) example.com')}>
            GitHub/GitLab Code
          </ToolButton>
        </ToolCard>

        {/* API Endpoints */}
        <ToolCard title="API Endpoints" icon="fas fa-code">
          <ToolButton onClick={() => executeGoogleDork('site:example.com (inurl:api OR inurl:apis OR inurl:graphql OR inurl:swagger OR inurl:v1 OR inurl:v2 OR inurl:v3) (filetype:json OR filetype:yaml OR filetype:xml)')}>
            API Documentation
          </ToolButton>
          <ToolButton onClick={() => executeGoogleDork('site:example.com inurl:(swagger-ui OR swagger.json OR api-docs OR openapi.json)')}>
            Swagger/OpenAPI
          </ToolButton>
          <ToolButton onClick={() => executeGoogleDork('site:example.com inurl:(graphql OR graphiql OR hasura)')}>
            GraphQL Endpoints
          </ToolButton>
        </ToolCard>

        {/* Cloud Assets */}
        <ToolCard title="Cloud Assets" icon="fas fa-cloud">
          <ToolButton onClick={() => executeGoogleDork('site:s3.amazonaws.com example.com')}>
            AWS S3 Buckets
          </ToolButton>
          <ToolButton onClick={() => executeGoogleDork('site:storage.googleapis.com example.com')}>
            Google Cloud Storage
          </ToolButton>
          <ToolButton onClick={() => executeGoogleDork('site:azurewebsites.net example.com')}>
            Azure Websites
          </ToolButton>
          <ToolButton onClick={() => executeGoogleDork('site:example.com (inurl:amazonaws.com OR inurl:digitaloceanspaces.com OR inurl:blob.core.windows.net)')}>
            Cloud Storage URLs
          </ToolButton>
        </ToolCard>

        {/* Development Assets */}
        <ToolCard title="Development Assets" icon="fas fa-code">
          <ToolButton onClick={() => executeGoogleDork('site:example.com inurl:(.git OR .svn OR .hg OR .bzr)')}>
            Version Control
          </ToolButton>
          <ToolButton onClick={() => executeGoogleDork('site:example.com inurl:(jenkins OR gitlab OR bitbucket OR jira OR confluence)')}>
            Dev Tools
          </ToolButton>
          <ToolButton onClick={() => executeGoogleDork('site:example.com ext:(php OR py OR rb OR java OR js OR ts OR go OR sh OR pl OR asp OR aspx) inurl:(test OR dev OR staging)')}>
            Dev Scripts
          </ToolButton>
        </ToolCard>
      </div>

    </div>
  )
}

export default ReconnaissanceTools