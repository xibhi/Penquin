// Comprehensive docs search implementation (client-side only)

export interface SearchResult {
  title: string;
  url: string;
  content: string;
  slug: string;
  description?: string;
  itemTitle?: string;
  items?: Array<{ title: string; url?: string }>; // per-page content item titles
}

// Search through docs content with enhanced matching
export function searchDocs(query: string, docs: SearchResult[]): SearchResult[] {
  if (!query || query.trim().length < 2) {
    return docs; // Return all docs if query is too short
  }

  const searchTerm = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  for (const doc of docs) {
    const titleMatch = doc.title.toLowerCase().includes(searchTerm);
    const contentMatch = doc.content.toLowerCase().includes(searchTerm);
    const descriptionMatch = doc.description?.toLowerCase().includes(searchTerm) || false;
    const slugMatch = doc.slug.toLowerCase().includes(searchTerm);

    if (titleMatch || contentMatch || descriptionMatch || slugMatch) {
      // Add content snippet highlighting
      const snippet = getContentSnippet(doc.content, searchTerm);
      results.push({
        ...doc,
        content: snippet
      });
    }

    // Also index per-page item titles (if any)
    if (Array.isArray(doc.items) && doc.items.length > 0) {
      for (const item of doc.items) {
        const itemTitle = (item.title || '').toLowerCase();
        if (itemTitle && itemTitle.includes(searchTerm)) {
          const composedTitle = `${item.title} — ${doc.title}`;
          results.push({
            title: composedTitle,
            url: item.url || doc.url,
            slug: doc.slug,
            description: doc.description,
            content: getContentSnippet(doc.content, searchTerm),
          });
        }
      }
    }
  }

  // Sort by relevance (title matches first, then content matches)
  return results.sort((a, b) => {
    const aTitleMatch = a.title.toLowerCase().includes(searchTerm);
    const bTitleMatch = b.title.toLowerCase().includes(searchTerm);

    if (aTitleMatch && !bTitleMatch) return -1;
    if (!aTitleMatch && bTitleMatch) return 1;

    return 0;
  });
}

// Extract relevant content snippet around search term
function getContentSnippet(content: string, searchTerm: string): string {
  const lowerContent = content.toLowerCase();
  const lowerTerm = searchTerm.toLowerCase();

  const index = lowerContent.indexOf(lowerTerm);
  if (index === -1) {
    // If term not found, return first 200 characters
    return content.substring(0, 200) + (content.length > 200 ? '...' : '');
  }

  // Extract 100 characters before and after the match
  const start = Math.max(0, index - 100);
  const end = Math.min(content.length, index + searchTerm.length + 100);

  let snippet = content.substring(start, end);

  // Add ellipsis if we're not at the beginning/end
  if (start > 0) snippet = '...' + snippet;
  if (end < content.length) snippet = snippet + '...';

  return snippet;
}

// Static docs data for fallback with comprehensive content
export const staticDocsData: SearchResult[] = [
  {
    title: 'Introduction',
    url: '/docs',
    slug: '',
    content: 'Penquin bug hunting toolkit automation efficiency philosophy transformation consequences warnings repetitive automate simplify eliminate precision subdomains terminal tools chains triage bounties Netflix confidence dependency clean execution purists romanticize pain inefficiency authentic progress stagnation',
    description: 'Getting started with Penquin'
  },
  {
    title: 'Arsenal',
    url: '/docs/arsenal',
    slug: 'arsenal',
    content: 'Bug hunting tools arsenal security testing comprehensive collection automated command generation SQLmap FFuF Nuclei methodologies browser extensions vulnerability types reconnaissance subdomain enumeration port scanning web application testing',
    description: 'Essential bug hunting tools',
    items: [
      { title: 'Advanced Techniques' },
      { title: 'FFUF Request File Method' },
      { title: 'Shodan Dorks' },
      { title: 'Content Type Filtering' },
      { title: 'JavaScript Analysis' },
      { title: 'Parameter Discovery' },
      { title: 'WordPress Scanning' },
      { title: 'Network Scanning' },
      { title: 'CORS Testing' },
      { title: 'LFI Testing' },
      { title: 'XSS Testing' },
      { title: 'Sensitive Data Discovery' }
    ]
  },
  {
    title: 'Reconnaissance',
    url: '/docs/reconnaissance',
    slug: 'reconnaissance',
    content: 'Reconnaissance tools subdomain enumeration OSINT information gathering passive active reconnaissance DNS enumeration certificate transparency shodan censys google dorking social media investigation email harvesting phone number lookup',
    description: 'Reconnaissance and information gathering'
  },
  {
    title: 'Methodology',
    url: '/docs/methodology',
    slug: 'methodology',
    content: 'Bug hunting methodology vulnerability assessment OWASP testing guide penetration testing methodology reconnaissance scanning enumeration exploitation post exploitation reporting web application security mobile security network security',
    description: 'Bug hunting methodologies'
  },
  {
    title: 'Extensions',
    url: '/docs/extensions',
    slug: 'extensions',
    content: 'Browser extensions security testing tools Chrome Firefox Safari Burp Suite OWASP ZAP Wappalyzer BuiltWith Shodan HackerOne Bugcrowd security headers CSP XSS CSRF SQL injection',
    description: 'Essential browser extensions'
  },
  {
    title: 'Writeups',
    url: '/docs/writeups',
    slug: 'writeups',
    content: 'Bug bounty writeups vulnerability reports real world discoveries XSS SQL injection CSRF authentication bypass authorization privilege escalation business logic flaws race conditions SSRF XXE',
    description: 'Collection of bug hunting writeups'
  },
  {
    title: 'Twitter',
    url: '/docs/twitter',
    slug: 'twitter',
    content: 'Twitter security researchers hackers to follow cybersecurity professionals bug bounty hunters penetration testers security analysts incident responders threat hunters malware researchers reverse engineers',
    description: 'Security researchers on Twitter'
  },
  {
    title: 'Medium',
    url: '/docs/medium',
    slug: 'medium',
    content: 'Medium security articles bug bounty writeups cybersecurity blogs penetration testing guides vulnerability research malware analysis reverse engineering incident response threat hunting security awareness',
    description: 'Security articles on Medium'
  },
  {
    title: 'YouTube Channels',
    url: '/docs/youtube-channels',
    slug: 'youtube-channels',
    content: 'YouTube security channels cybersecurity education penetration testing tutorials bug bounty hunting malware analysis reverse engineering ethical hacking cybersecurity awareness security training',
    description: 'Security-focused YouTube channels'
  },
  {
    title: 'YouTube',
    url: '/docs/youtube',
    slug: 'youtube',
    content: 'YouTube security videos cybersecurity tutorials penetration testing walkthroughs bug bounty hunting guides malware analysis reverse engineering ethical hacking cybersecurity awareness security training',
    description: 'Security videos on YouTube'
  },
  {
    title: 'Discord',
    url: '/docs/discord',
    slug: 'discord',
    content: 'Discord security communities bug bounty servers cybersecurity groups penetration testing communities ethical hacking servers malware analysis reverse engineering incident response threat hunting',
    description: 'Security Discord communities'
  },
  {
    title: 'Security GitBooks',
    url: '/docs/security-gitbooks',
    slug: 'security-gitbooks',
    content: 'Security GitBooks documentation guides cybersecurity knowledge base penetration testing methodologies vulnerability research malware analysis reverse engineering incident response threat hunting security awareness',
    description: 'Security documentation and guides'
  },
  {
    title: 'Common Job Roles',
    url: '/docs/common-job-roles',
    slug: 'common-job-roles',
    content: 'Cybersecurity job roles careers security positions blue team red team security analyst SOC analyst incident response network security administrator security engineer security architect penetration tester ethical hacker vulnerability analyst red team operator threat hunter senior penetration tester offensive security engineer',
    description: 'Common cybersecurity job roles'
  },
  {
    title: 'Cyber Security Types',
    url: '/docs/cyber-security-types',
    slug: 'cyber-security-types',
    content: 'Types of cybersecurity threats vulnerabilities attacks malware ransomware phishing social engineering DDoS SQL injection XSS CSRF authentication bypass authorization privilege escalation business logic flaws network security web application security endpoint security mobile security cloud security IoT security OPSEC InfoSec application security IAM cryptography incident response penetration testing red team blue team digital forensics GRC',
    description: 'Different types of cybersecurity',
    items: [
      { title: 'Network Security' },
      { title: 'Web Application Security' },
      { title: 'Endpoint Security' },
      { title: 'Mobile Security (Android/iOS)' },
      { title: 'Cloud Security' },
      { title: 'IoT Security' },
      { title: 'Operational Security (OPSEC)' },
      { title: 'Information Security (InfoSec)' },
      { title: 'Application Security' },
      { title: 'Identity and Access Management (IAM)' },
      { title: 'Cryptography' },
      { title: 'Incident Response' },
      { title: 'Penetration Testing (Red Teaming)' },
      { title: 'Blue Teaming' },
      { title: 'Digital Forensics' },
      { title: 'Governance, Risk, and Compliance (GRC)' }
    ]
  },
  {
    title: 'Get Started with Infosec',
    url: '/docs/get-started-with-infosec',
    slug: 'get-started-with-infosec',
    content: 'Getting started information security cybersecurity beginner guide roadmap Linux command line filesystem programming C++ Java Python HTML CSS SQL languages scripting bash powershell platforms JavaTpoint W3Schools GeeksforGeeks Tutorialspoint HackerRank Programiz CTF TryHackMe HackTheBox HTB PicoCTF RootMe VulnHub PentesterLab APIsec University Pwned Labs PortSwigger OverTheWire Trailhead certifications CompTIA A+ Security+ Network+ Linux+ Pentest+ CySa+ CASP+ EC-COUNCIL CEH INE eJPT eWPTX topics reverse shell bind shell roadmap TCM reverse engineering binary exploitation MySQL SQL BurpSuite tools maltego BurpSuite Metasploit Aircrack-ng JohnTheRipper SQLMap netcat hashcat kismet wifite dirbuster nikto sublister nmap FFUF Katana BinWalk Masscan Hydra Hashid Crunch snort ltrace subfinder rustscan HTTPX ZAP FeroxBuster Steghide which whois find locate',
    description: 'Beginner guide to information security',
    items: [
      { title: 'The Most Practical Cyber Security Roadmap | Notion' },
      // Learn Linux - Command Line
      { title: 'The Cyber Mentor — Linux Command Line' },
      { title: 'freeCodeCamp.org — Linux Command Line' },
      { title: 'HackerSploit — Linux Command Line' },
      // Learn Linux - File System
      { title: 'NeuralNine — Linux File System' },
      { title: 'Edureka — Linux File System' },
      { title: 'NetworkChuck — Linux File System' },
      // Linux Resources
      { title: 'Linux Journey' },
      { title: 'Edureka CS Videos' },
      { title: 'Explain Shell' },
      // Programming - C++ key resources
      { title: 'C++ Example Programs' },
      { title: 'Top 50 Array Questions (C++)' },
      { title: 'Top 50 String Questions (C++)' },
      { title: 'C++ Practice (GeeksForGeeks)' },
      { title: 'Intro to String (C++)' },
      { title: 'Intro to Array (C++)' },
      // Programming - Java
      { title: 'Java Example Programs' },
      // Programming - Python
      { title: 'Python Example Programs' },
      { title: 'GeeksForGeeks Python Tutorial' },
      { title: 'Python Projects (Beginner to Advanced)' },
      // Web basics
      { title: 'LoveBabbar — HTML/CSS' },
      { title: 'CodeWithHarry — HTML/CSS' },
      { title: 'SuperSimpleDev — HTML/CSS' },
      { title: 'BroCode — HTML/CSS' },
      { title: 'BroCode — SQL' },
      { title: 'AapnaCollege — SQL' },
      // Languages required in CyberSec
      { title: 'Languages required in CyberSec — Web Development' },
      { title: 'Languages required in CyberSec — General Programming' },
      { title: 'Languages required in CyberSec — Scripting' },
      { title: 'Languages required in CyberSec — Configuration/Markup' },
      // Top Platforms
      { title: 'JavaTpoint' },
      { title: 'W3Schools' },
      { title: 'GeeksforGeeks' },
      { title: 'Tutorialspoint' },
      { title: 'HackerRank' },
      { title: 'Programiz' },
      // Intentionally Vulnerable / CTF
      { title: 'TryHackMe' },
      { title: 'THM All Free Labs List' },
      { title: 'HTB Academy' },
      { title: 'HTB Labs' },
      { title: 'PicoCTF' },
      { title: 'RootMe' },
      { title: 'VulnHub' },
      { title: 'PentesterLab' },
      { title: 'API Security — APIsec University' },
      { title: 'Pwned Labs' },
      { title: 'Hacking Hub' },
      { title: 'PortSwigger' },
      { title: 'Trailhead — Cybersecurity Career Path' },
      { title: 'OverTheWire' },
      { title: 'CompTIA Security+ Labs (101labs)' },
      { title: 'Exploit Education' },
      { title: 'HBH.sh' },
      // CS Certifications
      { title: 'CompTIA A+' },
      { title: 'CompTIA Security+' },
      { title: 'CompTIA Network+' },
      { title: 'CompTIA Linux+' },
      { title: 'CompTIA Pentest+' },
      { title: 'CompTIA CySa+' },
      { title: 'CompTIA CASP+' },
      { title: 'EC-COUNCIL CEH' },
      { title: 'INE eJPT' },
      { title: 'INE eWPTX' },
      // Topics related to CS
      { title: 'Topics related to CS' },
      { title: 'Reverse & bind shell' },
      { title: 'Cyber Security Roadmap by TCM 2023' },
      { title: 'TCE: Network Pentesting' },
      { title: 'Reverse Engineering' },
      { title: 'Binary Exploitation' },
      { title: 'MYSQL & SQL' },
      // Learn BurpSuite
      { title: 'Bitten Tech — BurpSuite' },
      { title: 'Ethical Sharmaji — BurpSuite' },
      { title: 'hackbin — BurpSuite' },
      { title: 'David Bombal — BurpSuite' },
      { title: 'PortSwigger1 — BurpSuite' },
      { title: 'PortSwigger2 — BurpSuite' },
      { title: 'Cyber World Hindi — BurpSuite' },
      { title: 'Cyberwings Security — BurpSuite' },
      { title: 'Technical MotaBhai — BurpSuite' },
      // Common CyberSec Tools (selection)
      { title: 'Common CyberSec Tools' },
      { title: 'Maltego' }, { title: 'BurpSuite' }, { title: 'Metasploit' }, { title: 'Aircrack-ng' }, { title: 'JohnTheRipper' },
      { title: 'SQLMap' }, { title: 'netcat' }, { title: 'hashcat' }, { title: 'kismet' }, { title: 'wifite' },
      { title: 'dirbuster' }, { title: 'nikto' }, { title: 'sublister' }, { title: 'nmap' }, { title: 'FFUF' },
      { title: 'Katana' }, { title: 'BinWalk' }, { title: 'Masscan' }, { title: 'Hydra' }, { title: 'Hashid' },
      { title: 'Crunch' }, { title: 'snort' }, { title: 'ltrace' }, { title: 'subfinder' }, { title: 'rustscan' },
      { title: 'HTTPX' }, { title: 'ZAP' }, { title: 'FeroxBuster' }, { title: 'Steghide' }, { title: 'which' }, { title: 'whois' }, { title: 'find' }, { title: 'locate' }
    ]
  },
  {
    title: 'Best Bug Bounty Platform',
    url: '/docs/best-bug-bounty-platform',
    slug: 'best-bug-bounty-platform',
    content: 'Bug bounty platforms HackerOne Bugcrowd Synack Cobalt Intigriti YesWeHack Detectify Bugcrowd vulnerability disclosure coordinated disclosure responsible disclosure bug bounty programs',
    description: 'Best bug bounty platforms'
  },
  {
    title: 'Best Infosec Writeups Website',
    url: '/docs/best-infosec-writeups-website',
    slug: 'best-infosec-writeups-website',
    content: 'Information security writeups vulnerability reports bug bounty writeups penetration testing reports security research articles vulnerability disclosure coordinated disclosure responsible disclosure',
    description: 'Best infosec writeup websites'
  },
  {
    title: 'Hacking Books',
    url: '/docs/hacking-books',
    slug: 'hacking-books',
    content: 'Hacking books cybersecurity literature security books penetration testing ethical hacking malware analysis reverse engineering incident response threat hunting security awareness cryptography network security',
    description: 'Recommended hacking and security books'
  },
  {
    title: 'CLI Commands',
    url: '/docs/cli-commands',
    slug: 'cli-commands',
    content: 'Command line interface commands terminal CLI Unix Linux Windows PowerShell pwd cd ls dir touch mkdir rmdir rm cp mv cat more less head tail nano vim grep find locate df du ps top kill shutdown reboot ifconfig ping ssh scp chmod chown tar gzip gunzip zip unzip wget curl passwd useradd userdel groupadd groupdel sudo su history date cal hostname who w man which alias export echo uptime free ln lspci lsusb lsmod mount umount crontab at chroot watch nc dd htop sed awk',
    description: 'Essential CLI commands',
    items: [
      // Highlight representative commands; the search covers content for all
      { title: 'pwd' }, { title: 'cd' }, { title: 'ls' }, { title: 'dir' }, { title: 'touch' }, { title: 'mkdir' }, { title: 'rmdir' }, { title: 'rm' }, { title: 'cp' }, { title: 'mv' }, { title: 'cat' }, { title: 'more' }, { title: 'less' }, { title: 'head' }, { title: 'tail' }, { title: 'nano' }, { title: 'vim' }, { title: 'grep' }, { title: 'find' }, { title: 'locate' }, { title: 'df' }, { title: 'du' }, { title: 'ps' }, { title: 'top' }, { title: 'kill' }, { title: 'shutdown' }, { title: 'reboot' }, { title: 'ifconfig' }, { title: 'ping' }, { title: 'ssh' }, { title: 'scp' }, { title: 'chmod' }, { title: 'chown' }, { title: 'tar' }, { title: 'gzip' }, { title: 'gunzip' }, { title: 'zip' }, { title: 'unzip' }, { title: 'wget' }, { title: 'curl' }, { title: 'passwd' }, { title: 'useradd' }, { title: 'userdel' }, { title: 'groupadd' }, { title: 'groupdel' }, { title: 'sudo' }, { title: 'su' }, { title: 'history' }, { title: 'date' }, { title: 'cal' }, { title: 'hostname' }, { title: 'who' }, { title: 'w' }, { title: 'man' }, { title: 'which' }, { title: 'alias' }, { title: 'export' }, { title: 'echo' }, { title: 'uptime' }, { title: 'free' }, { title: 'ln' }, { title: 'lspci' }, { title: 'lsusb' }, { title: 'lsmod' }, { title: 'mount' }, { title: 'umount' }, { title: 'crontab' }, { title: 'at' }, { title: 'chroot' }, { title: 'watch' }, { title: 'nc' }, { title: 'dd' }, { title: 'htop' }, { title: 'sed' }, { title: 'awk' }
    ]
  },
  {
    title: 'Learn WSL',
    url: '/docs/learn-wsl',
    slug: 'learn-wsl',
    content: 'Windows Subsystem for Linux WSL setup installation enable Windows features virtual machine platform install WSL restart PC Microsoft Store Linux distribution Ubuntu Kali Linux Debian Oracle Arch set up Linux distribution update WSL version information list installed distributions set default distribution update upgrade Linux distribution install Win-KeX configure Win-KeX start GUI window mode enhanced session mode seamless mode start Win-KeX server start Win-KeX client launch in Windows Terminal stop Win-KeX server check Win-KeX server status stop server kill processes set server password start stop Windows sound server manage WSLg unix socket display Win-KeX version display help use container IP address optimized for multiscreen sound support disable Windows OpenGL disable client reconnecting wait longer for desktop verbose output',
    description: 'Learn Windows Subsystem for Linux',
    items: [
      { title: '1.1 Enable Windows Features' },
      { title: '1.2 Install WSL' },
      { title: '1.3 Restart Your PC' },
      { title: '1.4 Install Applications from Microsoft Store' },
      { title: '1.5 Set Up the Linux Distribution' },
      { title: '1.6 Final Restart' },
      { title: '1.7 Installation Complete' },
      { title: '2.1 Update WSL' },
      { title: '2.2 WSL Version Information' },
      { title: '2.3 List Installed Distributions' },
      { title: '2.4 Set Default Distribution' },
      { title: '3.1 Update and Upgrade Linux Distribution' },
      { title: '3.2 Install Win-KeX' },
      { title: '3.3 Configure Win-KeX' },
      { title: '3.4 Start GUI' },
      { title: 'Modes' },
      { title: 'Commands' },
      { title: 'Optional Parameters' },
      { title: 'Examples' }
    ]
  },

  // YouTube Channels - detailed content
  {
    title: "Sankalpa Baral — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "Sankalpa Baral — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "Sankalpa Baral"
  },
  {
    title: "𝙇𝙤𝙨𝙩𝙨𝙚𝙘 — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "𝙇𝙤𝙨𝙩𝙨𝙚𝙘 — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "𝙇𝙤𝙨𝙩𝙨𝙚𝙘"
  },
  {
    title: "Virdoex — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "Virdoex — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "Virdoex"
  },
  {
    title: "Tech Ghoshal — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "Tech Ghoshal — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "Tech Ghoshal"
  },
  {
    title: "Poc hunter — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "Poc hunter — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "Poc hunter"
  },
  {
    title: "Bug Bounty POC — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "Bug Bounty POC — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "Bug Bounty POC"
  },
  {
    title: "CyberSkb45 — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "CyberSkb45 — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "CyberSkb45"
  },
  {
    title: "HackerShiv — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "HackerShiv — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "HackerShiv"
  },
  {
    title: "bugbountypocdisclosure — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "bugbountypocdisclosure — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "bugbountypocdisclosure"
  },
  {
    title: "Bug Bounty POC Videos — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "Bug Bounty POC Videos — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "Bug Bounty POC Videos"
  },
  {
    title: "Hacking Blocks — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "Hacking Blocks — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "Hacking Blocks"
  },
  {
    title: "abhishekmorla1 — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "abhishekmorla1 — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "abhishekmorla1"
  },
  {
    title: "Information & Tech — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "Information & Tech — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "Information & Tech"
  },
  {
    title: "Webcipher101 — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "Webcipher101 — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "Webcipher101"
  },
  {
    title: "Bug Sec — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "Bug Sec — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "Bug Sec"
  },
  {
    title: "Bug Hunter Aryan — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "Bug Hunter Aryan — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "Bug Hunter Aryan"
  },
  {
    title: "techie hunterz — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "techie hunterz — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "techie hunterz"
  },
  {
    title: "HACKERFUDDI — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "HACKERFUDDI — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "HACKERFUDDI"
  },
  {
    title: "THE BBH — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "THE BBH — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "THE BBH"
  },
  {
    title: "Sudhanshu Rajbhar — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "Sudhanshu Rajbhar — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "Sudhanshu Rajbhar"
  },
  {
    title: "Cyberx14 — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "Cyberx14 — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "Cyberx14"
  },
  {
    title: "Jiivahack — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "Jiivahack — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "Jiivahack"
  },
  {
    title: "sasec — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "sasec — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "sasec"
  },
  {
    title: "Tama — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "Tama — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "Tama"
  },
  {
    title: "Root Access Hacks — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "Root Access Hacks — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "Root Access Hacks"
  },
  {
    title: "CodePrefer — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "CodePrefer — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "CodePrefer"
  },
  {
    title: "HunterDep — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "HunterDep — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "HunterDep"
  },
  {
    title: "Ibnu Fachrizal — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "Ibnu Fachrizal — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "Ibnu Fachrizal"
  },
  {
    title: "Rootreboot — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "Rootreboot — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "Rootreboot"
  },
  {
    title: "CyberHacks — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "CyberHacks — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "CyberHacks"
  },
  {
    title: "mufazmi — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "mufazmi — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "mufazmi"
  },
  {
    title: "rashahacks — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "rashahacks — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "rashahacks"
  },
  {
    title: "The Cyberboy — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "The Cyberboy — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "The Cyberboy"
  },
  {
    title: "hacksys — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "hacksys — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "hacksys"
  },
  {
    title: "Elite Pwner — YouTube Channels",
    url: "/docs/youtube-channels",
    content: "Elite Pwner — YouTube channel for cybersecurity content and tutorials",
    slug: "youtube-channels",
    itemTitle: "Elite Pwner"
  },

  // Writeups - detailed content
  {
    title: "The Ultimate Guide to WAF Bypass Using SQLMap — Writeups",
    url: "/docs/writeups",
    content: "The Ultimate Guide to WAF Bypass Using SQLMap, Proxychains & Tamper Scripts — Mastering Advanced SQLMap Techniques with Proxychains and tamper scripts Against Cloudflare and ModSecurity",
    slug: "writeups",
    itemTitle: "The Ultimate Guide to WAF Bypass Using SQLMap"
  },
  {
    title: "How Hackers Exploit CVE-2025–29927 in Next.js Like a Pro — Writeups",
    url: "/docs/writeups",
    content: "How Hackers Exploit CVE-2025–29927 in Next.js Like a Pro — Step-by-Step mass hunting Authorization Bypass by Middleware in next.js: A Complete Exploit Walkthrough",
    slug: "writeups",
    itemTitle: "How Hackers Exploit CVE-2025–29927 in Next.js Like a Pro"
  },
  {
    title: "How Hackers Abuse XML-RPC to Launch Bruteforce and DDoS Attacks — Writeups",
    url: "/docs/writeups",
    content: "How Hackers Abuse XML-RPC to Launch Bruteforce and DDoS Attacks — From Recon to full Exploitation: The XML-RPC Attack Path",
    slug: "writeups",
    itemTitle: "How Hackers Abuse XML-RPC to Launch Bruteforce and DDoS Attacks"
  },
  {
    title: "How to Route Traffic from WSL to Burp Suite on Windows — Writeups",
    url: "/docs/writeups",
    content: "How to Route Traffic from WSL to Burp Suite on Windows: A Step-by-Step Guide — Learn how to properly configure WSL to route all traffic through Burp Suite for effective penetration testing",
    slug: "writeups",
    itemTitle: "How to Route Traffic from WSL to Burp Suite on Windows"
  },
  {
    title: "From Zero to Hero: Hunting High-Paying Open Redirect Bugs — Writeups",
    url: "/docs/writeups",
    content: "From Zero to Hero: Hunting High-Paying Open Redirect Bugs in Web Apps — Complete methodology for finding and exploiting open redirect vulnerabilities in modern web applications",
    slug: "writeups",
    itemTitle: "From Zero to Hero: Hunting High-Paying Open Redirect Bugs"
  },
  {
    title: "LostFuzzer: Passive URL Fuzzing & Nuclei DAST for Bug Hunters — Writeups",
    url: "/docs/writeups",
    content: "LostFuzzer: Passive URL Fuzzing & Nuclei DAST for Bug Hunters — An advanced tool for discovering hidden endpoints and vulnerabilities through passive fuzzing techniques",
    slug: "writeups",
    itemTitle: "LostFuzzer: Passive URL Fuzzing & Nuclei DAST for Bug Hunters"
  },
  {
    title: "S3 Bucket Recon: Finding Exposed AWS Buckets Like a Pro — Writeups",
    url: "/docs/writeups",
    content: "S3 Bucket Recon: Finding Exposed AWS Buckets Like a Pro — Techniques and methodologies for identifying misconfigured Amazon S3 buckets during security assessments",
    slug: "writeups",
    itemTitle: "S3 Bucket Recon: Finding Exposed AWS Buckets Like a Pro"
  },
  {
    title: "Best Browser Extensions for Bug Hunting and Cybersecurity — Writeups",
    url: "/docs/writeups",
    content: "Best Browser Extensions for Bug Hunting and Cybersecurity — A comprehensive guide to essential browser extensions that enhance your bug hunting workflow",
    slug: "writeups",
    itemTitle: "Best Browser Extensions for Bug Hunting and Cybersecurity"
  },
  {
    title: "FFUF Mastery: The Ultimate Web Fuzzing Guide — Writeups",
    url: "/docs/writeups",
    content: "FFUF Mastery: The Ultimate Web Fuzzing Guide — Master the powerful FFUF fuzzing tool for discovering hidden endpoints, parameters, and vulnerabilities",
    slug: "writeups",
    itemTitle: "FFUF Mastery: The Ultimate Web Fuzzing Guide"
  },
  {
    title: "My Private Nuclei Template Collection for Easy Bounties — Writeups",
    url: "/docs/writeups",
    content: "My Private Nuclei Template Collection for Easy Bounties — Custom Nuclei templates that have led to successful bug bounty reports and vulnerability discoveries",
    slug: "writeups",
    itemTitle: "My Private Nuclei Template Collection for Easy Bounties"
  },
  {
    title: "Unlock the Full Potential of the Wayback Machine for Bug Bounty — Writeups",
    url: "/docs/writeups",
    content: "Unlock the Full Potential of the Wayback Machine for Bug Bounty — Advanced techniques for leveraging Internet Archive's Wayback Machine in your bug hunting methodology",
    slug: "writeups",
    itemTitle: "Unlock the Full Potential of the Wayback Machine for Bug Bounty"
  },
  {
    title: "SQL Injection in Largest Electricity Board of Sri Lanka — Writeups",
    url: "/docs/writeups",
    content: "SQL Injection in Largest Electricity Board of Sri Lanka — A detailed case study of discovering and responsibly reporting a critical SQL Injection vulnerability",
    slug: "writeups",
    itemTitle: "SQL Injection in Largest Electricity Board of Sri Lanka"
  },
  {
    title: "PDF.js Arbitrary JavaScript Code Execution (CVE-2024-4367) — Writeups",
    url: "/docs/writeups",
    content: "PDF.js Arbitrary JavaScript Code Execution (CVE-2024-4367) — Analysis and exploitation guide for the critical code execution vulnerability in Mozilla's PDF.js library",
    slug: "writeups",
    itemTitle: "PDF.js Arbitrary JavaScript Code Execution (CVE-2024-4367)"
  },
  {
    title: "How to Find Origin IP of Any Website Behind a WAF — Writeups",
    url: "/docs/writeups",
    content: "How to Find Origin IP of Any Website Behind a WAF — Techniques for identifying the true origin IP address of servers protected by web application firewalls",
    slug: "writeups",
    itemTitle: "How to Find Origin IP of Any Website Behind a WAF"
  },
  {
    title: "Find XSS Vulnerabilities in Just 2 Minutes — Writeups",
    url: "/docs/writeups",
    content: "Find XSS Vulnerabilities in Just 2 Minutes — Rapid methodology for identifying Cross-Site Scripting vulnerabilities in web applications",
    slug: "writeups",
    itemTitle: "Find XSS Vulnerabilities in Just 2 Minutes"
  },
  {
    title: "How to Identify Sensitive Data in JavaScript Files: JSRecon — Writeups",
    url: "/docs/writeups",
    content: "How to Identify Sensitive Data in JavaScript Files: JSRecon — Techniques for discovering credentials, API keys, and other sensitive information in client-side JavaScript",
    slug: "writeups",
    itemTitle: "How to Identify Sensitive Data in JavaScript Files: JSRecon"
  },

  // Extensions - detailed content
  {
    title: "Greb — Extensions",
    url: "/docs/extensions",
    content: "Greb — Easily capture and manipulate form parameters, URL parameters, and form data",
    slug: "extensions",
    itemTitle: "Greb"
  },
  {
    title: "TruffleHog — Extensions",
    url: "/docs/extensions",
    content: "TruffleHog — Find hidden API keys and secrets in websites",
    slug: "extensions",
    itemTitle: "TruffleHog"
  },
  {
    title: "FoxyProxy — Extensions",
    url: "/docs/extensions",
    content: "FoxyProxy — Essential proxy management for Burp Suite and other MITM applications",
    slug: "extensions",
    itemTitle: "FoxyProxy"
  },
  {
    title: "Wappalyzer — Extensions",
    url: "/docs/extensions",
    content: "Wappalyzer — Identify technologies, CMS, and frameworks used by websites",
    slug: "extensions",
    itemTitle: "Wappalyzer"
  },
  {
    title: "Temp Mail — Extensions",
    url: "/docs/extensions",
    content: "Temp Mail — Quick access to temporary email services",
    slug: "extensions",
    itemTitle: "Temp Mail"
  },
  {
    title: "Hunter.io — Extensions",
    url: "/docs/extensions",
    content: "Hunter.io — Extract all email addresses from websites, useful for report submission",
    slug: "extensions",
    itemTitle: "Hunter.io"
  },
  {
    title: "HackTools — Extensions",
    url: "/docs/extensions",
    content: "HackTools — Collection of useful payloads and tools for penetration testing",
    slug: "extensions",
    itemTitle: "HackTools"
  },
  {
    title: "Cookie Editor — Extensions",
    url: "/docs/extensions",
    content: "Cookie Editor — Advanced cookie management with security flag detection",
    slug: "extensions",
    itemTitle: "Cookie Editor"
  },
  {
    title: "WebRTC Disable — Extensions",
    url: "/docs/extensions",
    content: "WebRTC Disable — Protect VPN IP from WebRTC leaks",
    slug: "extensions",
    itemTitle: "WebRTC Disable"
  },
  {
    title: "Link Gopher — Extensions",
    url: "/docs/extensions",
    content: "Link Gopher — Extract all domains and links from websites and Google results",
    slug: "extensions",
    itemTitle: "Link Gopher"
  },
  {
    title: "FindSomething — Extensions",
    url: "/docs/extensions",
    content: "FindSomething — Discover hidden parameters and secret keys",
    slug: "extensions",
    itemTitle: "FindSomething"
  },
  {
    title: "DotGit — Extensions",
    url: "/docs/extensions",
    content: "DotGit — Find exposed .git repositories for potential P1 information disclosure",
    slug: "extensions",
    itemTitle: "DotGit"
  },
  {
    title: "Open Multiple URLs — Extensions",
    url: "/docs/extensions",
    content: "Open Multiple URLs — Open multiple sites simultaneously",
    slug: "extensions",
    itemTitle: "Open Multiple URLs"
  },
  {
    title: "uBlock Origin — Extensions",
    url: "/docs/extensions",
    content: "uBlock Origin — Block ads and trackers for cleaner testing",
    slug: "extensions",
    itemTitle: "uBlock Origin"
  },
  {
    title: "Dark Reader — Extensions",
    url: "/docs/extensions",
    content: "Dark Reader — Dark mode for better night-time hunting",
    slug: "extensions",
    itemTitle: "Dark Reader"
  },
  {
    title: "User-Agent Switcher — Extensions",
    url: "/docs/extensions",
    content: "User-Agent Switcher — Test sites with different user-agent strings",
    slug: "extensions",
    itemTitle: "User-Agent Switcher"
  },
  {
    title: "Retire.js — Extensions",
    url: "/docs/extensions",
    content: "Retire.js — Identify vulnerable JavaScript libraries",
    slug: "extensions",
    itemTitle: "Retire.js"
  },
  {
    title: "Page Translator — Extensions",
    url: "/docs/extensions",
    content: "Page Translator — Translate websites to your preferred language",
    slug: "extensions",
    itemTitle: "Page Translator"
  },
  {
    title: "WaybackURLs — Extensions",
    url: "/docs/extensions",
    content: "WaybackURLs — Fetch URLs from Wayback Machine archive",
    slug: "extensions",
    itemTitle: "WaybackURLs"
  },
  {
    title: "Shodan — Extensions",
    url: "/docs/extensions",
    content: "Shodan — View hosting details, IP ownership, and open services for websites",
    slug: "extensions",
    itemTitle: "Shodan"
  },

  // Methodology - detailed content
  {
    title: "Advanced Recon Methodology — Methodology",
    url: "/docs/methodology",
    content: "Advanced Recon Methodology — Comprehensive reconnaissance methodology for bug hunting",
    slug: "methodology",
    itemTitle: "Advanced Recon Methodology"
  },
  {
    title: "Gather assets through API — Methodology",
    url: "/docs/methodology",
    content: "Gather assets through API — Methodology for gathering assets through API endpoints",
    slug: "methodology",
    itemTitle: "Gather assets through API"
  },
  {
    title: "SSTI Payloads — Methodology",
    url: "/docs/methodology",
    content: "SSTI Payloads — Server-Side Template Injection payloads and techniques",
    slug: "methodology",
    itemTitle: "SSTI Payloads"
  },
  {
    title: "CRLF Injection — Methodology",
    url: "/docs/methodology",
    content: "CRLF Injection — Carriage Return Line Feed injection payloads and techniques",
    slug: "methodology",
    itemTitle: "CRLF Injection"
  },
  {
    title: "SQL Injection Methodology — Methodology",
    url: "/docs/methodology",
    content: "SQL Injection Methodology — Comprehensive SQL injection testing methodology",
    slug: "methodology",
    itemTitle: "SQL Injection Methodology"
  },
  {
    title: "XSS WAF Bypass Methodology — Methodology",
    url: "/docs/methodology",
    content: "XSS WAF Bypass Methodology — Cross-Site Scripting WAF bypass techniques",
    slug: "methodology",
    itemTitle: "XSS WAF Bypass Methodology"
  },
  {
    title: "SQL Injection XOR WAF Bypass — Methodology",
    url: "/docs/methodology",
    content: "SQL Injection XOR WAF Bypass — SQL injection XOR-based WAF bypass techniques",
    slug: "methodology",
    itemTitle: "SQL Injection XOR WAF Bypass"
  },
  {
    title: "Advanced Google Dorks — Methodology",
    url: "/docs/methodology",
    content: "Advanced Google Dorks — Advanced Google hacking techniques and dorks",
    slug: "methodology",
    itemTitle: "Advanced Google Dorks"
  },

  // Reconnaissance - detailed content
  {
    title: "Subdomain Enumeration — Reconnaissance",
    url: "/docs/reconnaissance",
    content: "Subdomain Enumeration — Comprehensive subdomain discovery techniques using crt.sh, SecurityTrails, Shodan, and other tools",
    slug: "reconnaissance",
    itemTitle: "Subdomain Enumeration"
  },
  {
    title: "Secret Discovery — Reconnaissance",
    url: "/docs/reconnaissance",
    content: "Secret Discovery — Techniques for discovering secrets, API keys, and sensitive information using Wayback Machine and Google dorks",
    slug: "reconnaissance",
    itemTitle: "Secret Discovery"
  },
  {
    title: "Passive Reconnaissance — Reconnaissance",
    url: "/docs/reconnaissance",
    content: "Passive Reconnaissance — Passive information gathering techniques including WHOIS, DNS, SSL, and reverse IP lookups",
    slug: "reconnaissance",
    itemTitle: "Passive Reconnaissance"
  },
  {
    title: "S3 Bucket Enumeration — Reconnaissance",
    url: "/docs/reconnaissance",
    content: "S3 Bucket Enumeration — Techniques for discovering misconfigured AWS S3, Google Cloud Storage, and Azure Blob Storage buckets",
    slug: "reconnaissance",
    itemTitle: "S3 Bucket Enumeration"
  },
  {
    title: "Technology Detection — Reconnaissance",
    url: "/docs/reconnaissance",
    content: "Technology Detection — Tools and techniques for identifying technologies, CMS, and frameworks used by websites",
    slug: "reconnaissance",
    itemTitle: "Technology Detection"
  },
  {
    title: "Port Scanning — Reconnaissance",
    url: "/docs/reconnaissance",
    content: "Port Scanning — Port scanning techniques and tools for network reconnaissance",
    slug: "reconnaissance",
    itemTitle: "Port Scanning"
  },
  {
    title: "URL Collection — Reconnaissance",
    url: "/docs/reconnaissance",
    content: "URL Collection — Techniques for collecting URLs from various sources including Wayback Machine and urlscan.io",
    slug: "reconnaissance",
    itemTitle: "URL Collection"
  },
  {
    title: "CMS Dorking — Reconnaissance",
    url: "/docs/reconnaissance",
    content: "CMS Dorking — Google dorks and techniques for discovering CMS vulnerabilities and exposed files",
    slug: "reconnaissance",
    itemTitle: "CMS Dorking"
  },
  {
    title: "Directory Traversal — Reconnaissance",
    url: "/docs/reconnaissance",
    content: "Directory Traversal — Techniques for discovering directory listings, log files, and configuration files",
    slug: "reconnaissance",
    itemTitle: "Directory Traversal"
  },
  {
    title: "Vulnerability Search — Reconnaissance",
    url: "/docs/reconnaissance",
    content: "Vulnerability Search — Techniques for searching known vulnerabilities using Exploit-DB, NVD, and PacketStorm",
    slug: "reconnaissance",
    itemTitle: "Vulnerability Search"
  },
  {
    title: "Code & Document Search — Reconnaissance",
    url: "/docs/reconnaissance",
    content: "Code & Document Search — Techniques for discovering exposed code repositories, documents, and sensitive files",
    slug: "reconnaissance",
    itemTitle: "Code & Document Search"
  },
  {
    title: "API Endpoints — Reconnaissance",
    url: "/docs/reconnaissance",
    content: "API Endpoints — Techniques for discovering API documentation, Swagger/OpenAPI specs, and GraphQL endpoints",
    slug: "reconnaissance",
    itemTitle: "API Endpoints"
  },
  {
    title: "Cloud Assets — Reconnaissance",
    url: "/docs/reconnaissance",
    content: "Cloud Assets — Techniques for discovering cloud storage URLs and misconfigured cloud services",
    slug: "reconnaissance",
    itemTitle: "Cloud Assets"
  },
  {
    title: "Development Assets — Reconnaissance",
    url: "/docs/reconnaissance",
    content: "Development Assets — Techniques for discovering version control repositories, development tools, and staging environments",
    slug: "reconnaissance",
    itemTitle: "Development Assets"
  },

  // Arsenal - detailed content
  {
    title: "Basic Subdomain Discovery — Arsenal",
    url: "/docs/arsenal",
    content: "Basic Subdomain Discovery — Discovers subdomains using subfinder with recursive enumeration and saves results to a file",
    slug: "arsenal",
    itemTitle: "Basic Subdomain Discovery"
  },
  {
    title: "Live Subdomain Filtering — Arsenal",
    url: "/docs/arsenal",
    content: "Live Subdomain Filtering — Filters discovered subdomains using httpx and saves the alive ones to a file",
    slug: "arsenal",
    itemTitle: "Live Subdomain Filtering"
  },
  {
    title: "Subdomain Takeover Check — Arsenal",
    url: "/docs/arsenal",
    content: "Subdomain Takeover Check — Checks for subdomain takeover vulnerabilities using subzy",
    slug: "arsenal",
    itemTitle: "Subdomain Takeover Check"
  },
  {
    title: "Passive URL Collection — Arsenal",
    url: "/docs/arsenal",
    content: "Passive URL Collection — Collects URLs from various sources and saves them to a file",
    slug: "arsenal",
    itemTitle: "Passive URL Collection"
  },
  {
    title: "Advanced URL Fetching — Arsenal",
    url: "/docs/arsenal",
    content: "Advanced URL Fetching — Collects URLs from various sources using multiple techniques",
    slug: "arsenal",
    itemTitle: "Advanced URL Fetching"
  },
  {
    title: "GAU URL Collection — Arsenal",
    url: "/docs/arsenal",
    content: "GAU URL Collection — Collects URLs using GAU and saves them to a file",
    slug: "arsenal",
    itemTitle: "GAU URL Collection"
  },

  {
    title: "Sensitive File Detection — Arsenal",
    url: "/docs/arsenal",
    content: "Sensitive File Detection — Detects sensitive files on the web server",
    slug: "arsenal",
    itemTitle: "Sensitive File Detection"
  },
  {
    title: "Information Disclosure Dork — Arsenal",
    url: "/docs/arsenal",
    content: "Information Disclosure Dork — Searches for information disclosure vulnerabilities using a dork",
    slug: "arsenal",
    itemTitle: "Information Disclosure Dork"
  },
  {
    title: "Git Repository Detection — Arsenal",
    url: "/docs/arsenal",
    content: "Git Repository Detection — Detects Git repositories on the web server",
    slug: "arsenal",
    itemTitle: "Git Repository Detection"
  },
  {
    title: "Information Disclosure — Arsenal",
    url: "/docs/arsenal",
    content: "Information Disclosure — Searches for Information disclosure vulnerabilities",
    slug: "arsenal",
    itemTitle: "Information Disclosure"
  },
  {
    title: "S3 Buckets Finder — Arsenal",
    url: "/docs/arsenal",
    content: "S3 Buckets Finder — Finds S3 Buckets",
    slug: "arsenal",
    itemTitle: "S3 Buckets Finder"
  },
  {
    title: "API Keys Finder — Arsenal",
    url: "/docs/arsenal",
    content: "API Keys Finder — Finds API Keys in javascript files",
    slug: "arsenal",
    itemTitle: "API Keys Finder"
  },
  {
    title: "XSS Hunting Pipeline — Arsenal",
    url: "/docs/arsenal",
    content: "XSS Hunting Pipeline — Collects XSS vulnerabilities using various tools and saves them to a file",
    slug: "arsenal",
    itemTitle: "XSS Hunting Pipeline"
  },
  {
    title: "XSS with Dalfox — Arsenal",
    url: "/docs/arsenal",
    content: "XSS with Dalfox — Uses Dalfox to scan for XSS vulnerabilities",
    slug: "arsenal",
    itemTitle: "XSS with Dalfox"
  },
  {
    title: "Stored XSS Finder — Arsenal",
    url: "/docs/arsenal",
    content: "Stored XSS Finder — Finds potential stored XSS vulnerabilities by scanning forms",
    slug: "arsenal",
    itemTitle: "Stored XSS Finder"
  },
  {
    title: "DOM XSS Detection — Arsenal",
    url: "/docs/arsenal",
    content: "DOM XSS Detection — Detects potential DOM-based XSS vulnerabilities",
    slug: "arsenal",
    itemTitle: "DOM XSS Detection"
  },
  {
    title: "LFI Methodology — Arsenal",
    url: "/docs/arsenal",
    content: "LFI Methodology — Tests for Local File Inclusion (LFI) vulnerabilities using various methods",
    slug: "arsenal",
    itemTitle: "LFI Methodology"
  },
  {
    title: "Basic CORS Check — Arsenal",
    url: "/docs/arsenal",
    content: "Basic CORS Check — Checks the Cross-Origin Resource Sharing (CORS) policy of a website",
    slug: "arsenal",
    itemTitle: "Basic CORS Check"
  },
  {
    title: "CORScanner — Arsenal",
    url: "/docs/arsenal",
    content: "CORScanner — Fast CORS misconfiguration scanner that helps identify potential CORS vulnerabilities",
    slug: "arsenal",
    itemTitle: "CORScanner"
  },
  {
    title: "CORS Nuclei Scan — Arsenal",
    url: "/docs/arsenal",
    content: "CORS Nuclei Scan — Uses Nuclei to scan for CORS misconfigurations across multiple domains",
    slug: "arsenal",
    itemTitle: "CORS Nuclei Scan"
  },
  {
    title: "CORS Origin Reflection Test — Arsenal",
    url: "/docs/arsenal",
    content: "CORS Origin Reflection Test — Tests for origin reflection vulnerability in CORS configuration",
    slug: "arsenal",
    itemTitle: "CORS Origin Reflection Test"
  },
  {
    title: "Naabu Scan — Arsenal",
    url: "/docs/arsenal",
    content: "Naabu Scan — Scans for open ports and services using Naabu",
    slug: "arsenal",
    itemTitle: "Naabu Scan"
  },
  {
    title: "Nmap Full Scan — Arsenal",
    url: "/docs/arsenal",
    content: "Nmap Full Scan — Performs a full port scan using Nmap",
    slug: "arsenal",
    itemTitle: "Nmap Full Scan"
  },
  {
    title: "Masscan — Arsenal",
    url: "/docs/arsenal",
    content: "Masscan — Scans for open ports and services using Masscan",
    slug: "arsenal",
    itemTitle: "Masscan"
  },
  {
    title: "Aggressive WordPress Scan — Arsenal",
    url: "/docs/arsenal",
    content: "Aggressive WordPress Scan — Scans a WordPress website for vulnerabilities and saves the results to a file",
    slug: "arsenal",
    itemTitle: "Aggressive WordPress Scan"
  },
  {
    title: "Arjun Passive Discovery — Arsenal",
    url: "/docs/arsenal",
    content: "Arjun Passive Discovery — Discovers parameters passively using Arjun",
    slug: "arsenal",
    itemTitle: "Arjun Passive Discovery"
  },
  {
    title: "Arjun Wordlist Discovery — Arsenal",
    url: "/docs/arsenal",
    content: "Arjun Wordlist Discovery — Discovers parameters using a wordlist with Arjun",
    slug: "arsenal",
    itemTitle: "Arjun Wordlist Discovery"
  },
  {
    title: "JS File Hunting — Arsenal",
    url: "/docs/arsenal",
    content: "JS File Hunting — Collects JavaScript files from a website and analyzes them",
    slug: "arsenal",
    itemTitle: "JS File Hunting"
  },
  {
    title: "JS File Analysis — Arsenal",
    url: "/docs/arsenal",
    content: "JS File Analysis — Analyzes collected JavaScript files",
    slug: "arsenal",
    itemTitle: "JS File Analysis"
  },
  {
    title: "Content Type Check — Arsenal",
    url: "/docs/arsenal",
    content: "Content Type Check — Checks the content type of URLs",
    slug: "arsenal",
    itemTitle: "Content Type Check"
  },
  {
    title: "JavaScript Content Check — Arsenal",
    url: "/docs/arsenal",
    content: "JavaScript Content Check — Checks for JavaScript content in URLs",
    slug: "arsenal",
    itemTitle: "JavaScript Content Check"
  },
  {
    title: "SSL Certificate Search — Arsenal",
    url: "/docs/arsenal",
    content: "SSL Certificate Search — Searches for SSL certificates using Shodan",
    slug: "arsenal",
    itemTitle: "SSL Certificate Search"
  },
  {
    title: "LFI with Request File — Arsenal",
    url: "/docs/arsenal",
    content: "LFI with Request File — Uses FFUF to bruteforce LFI vulnerabilities using a request file",
    slug: "arsenal",
    itemTitle: "LFI with Request File"
  },
  {
    title: "XSS with Request File — Arsenal",
    url: "/docs/arsenal",
    content: "XSS with Request File — Uses FFUF to bruteforce XSS vulnerabilities using a request file",
    slug: "arsenal",
    itemTitle: "XSS with Request File"
  },
  {
    title: "XSS/SSRF Header Testing — Arsenal",
    url: "/docs/arsenal",
    content: "XSS/SSRF Header Testing — Tests for XSS and SSRF vulnerabilities using various methods",
    slug: "arsenal",
    itemTitle: "XSS/SSRF Header Testing"
  },

  // Android Bug Bounty - detailed content
  {
    title: "Video Tutorials — Android Bug Bounty",
    url: "/docs/video-tutorials",
    content: "Android Bug Bounty Video Tutorials — Curated collection of video tutorials for learning Android security and bug bounty hunting techniques.",
    slug: "video-tutorials",
    itemTitle: "Video Tutorials",
    items: [
      { title: "Mobile Pentesting by Intigriti" },
      { title: "Android Bug Bounty Playlist" },
      { title: "How to Hack Android Apps (Frida)" },
      { title: "How to Bypass SSL Pinning" },
      { title: "How to Root Android Emulator in 2 Minutes" },
      { title: "Intercepting Android App Traffic with BurpSuite" },
      { title: "Mobile Application Pentesting" },
      { title: "Finding Sensitive Data in Android Apps with Nerdwell" },
      { title: "Exploiting Android Deep Links and Exported Components" },
      { title: "Mobile App Pentesting by Hacking Simplified" },
      { title: "Android Security Testing" },
      { title: "Full Android Penetration Testing Course Playlist" },
      { title: "Android App Penetration Testing - OWASP Top 10" },
      { title: "Bypass Biometrics in Mobile Apps" },
      { title: "Intercept traffic with Objection and Burp" },
      { title: "Hacking and Pentesting Android Apps" },
      { title: "Hacking and Pentesting iOS Apps" },
      { title: "Android Application Pen-testing Course" }
    ]
  },
  {
    title: "YouTube Channels — Android Bug Bounty",
    url: "/docs/android-youtube-channels",
    content: "Android YouTube Channels — Top YouTube channels focused on Android security research, penetration testing, and bug bounty hunting.",
    slug: "android-youtube-channels",
    itemTitle: "YouTube Channels",
    items: [
      { title: "CorSecure" },
      { title: "B3nacSec" },
      { title: "LaurieWired" },
      { title: "AppSecHub" },
      { title: "Hacking Simplified" }
    ]
  },
  {
    title: "Best Bug Reports — Android Bug Bounty",
    url: "/docs/bestbugreports",
    content: "Best Bug Reports — A collection of the best public Android bug bounty reports for learning and inspiration.",
    slug: "bestbugreports",
    itemTitle: "Best Bug Reports",
    items: [
      { title: "Disclosure of all uploads via hardcoded api secret" },
      { title: "Android security checklist: WebView" },
      { title: "Account Takeover Via DeepLink" },
      { title: "Sensitive information disclosure" },
      { title: "Why dynamic code loading could be dangerous for your apps" },
      { title: "RCE in TinyCards for Android" },
      { title: "Persistent arbitrary code execution in Android's Google Play Core Library" },
      { title: "TikTok: three persistent arbitrary code executions" },
      { title: "Exploiting memory corruption vulnerabilities on Android" },
      { title: "Use cryptography in mobile apps the right way" },
      { title: "SQL Injection in Content Provider" },
      { title: "Another SQL Injection in Content Provider" },
      { title: "Steal user session" },
      { title: "Android security checklist: theft of arbitrary files" },
      { title: "How to exploit insecure WebResourceResponse configurations" },
      { title: "Vulnerable to local file steal, Javascript injection, Open redirect" },
      { title: "Token leakage due to stolen files via unprotected Activity" },
      { title: "Steal files due to exported services" },
      { title: "Steal files due to unprotected exported Activity" },
      { title: "Steal files due to insecure data storage" },
      { title: "Accidental $70k Google Pixel Lock Screen Bypass" },
      { title: "Golden techniques to bypass host validations" },
      { title: "Two-factor authentication bypass due to vuln endpoint" },
      { title: "Another endpoint Auth bypass" },
      { title: "Bypass PIN/Fingerprint lock" },
      { title: "Bypass lock protection" },
      { title: "Bypass of biometrics security functionality" },
      { title: "HTML Injection in BatterySaveArticleRenderer WebView" },
      { title: "XSS via SAMLAuthActivity" },
      { title: "XSS in ImageViewerActivity" },
      { title: "XSS via start ContentActivity" },
      { title: "XSS on Owncloud webview" },
      { title: "20 Security Issues Found in Xiaomi Devices" },
      { title: "Discovering vendor-specific vulnerabilities in Android" },
      { title: "Common mistakes when using permissions in Android" },
      { title: "Two weeks of securing Samsung devices (Part 1 & 2)" },
      { title: "Intent Spoofing" },
      { title: "Access of some not exported content providers" },
      { title: "Access protected components via intent" },
      { title: "Fragment injection" },
      { title: "Javascript injection" },
      { title: "Deeplink leads to CSRF in follow action" },
      { title: "Possible to intercept broadcasts about file uploads" },
      { title: "Vulnerable exported broadcast reciever" },
      { title: "View every network request response's information" },
      { title: "Content Provider Local File Inclusion" }
    ]
  },
  {
    title: "GitHub Repository — Android Bug Bounty",
    url: "/docs/github-repository",
    content: "GitHub Repository — Essential GitHub repositories containing tools, wordlists, and resources for Android bug bounty hunting.",
    slug: "github-repository",
    itemTitle: "GitHub Repository",
    items: [
      { title: "Learn Android Bug Bounty" },
      { title: "Frida Labs" },
      { title: "Objection Framework" },
      { title: "r0capture (Frida Capture Tool)" },
      { title: "Frida" },
      { title: "APK MITM" },
      { title: "BeVigil OSINT CLI" },
      { title: "APKiD" },
      { title: "Genymotion ARM Translation" },
      { title: "Drozer Agent" },
      { title: "Drozer Framework" },
      { title: "APKLeaks" },
      { title: "JADX Decompiler" },
      { title: "Android Pentesting Checklist (HackTricks)" },
      { title: "Mobile App Pentest Cheatsheet" },
      { title: "Android PentestBook" },
      { title: "All Things Android Security" },
      { title: "Android Reports & Resources" },
      { title: "Awesome Android Security" },
      { title: "Android Security Awesome" },
      { title: "Awesome Mobile CTF Resources" }
    ]
  },
  {
    title: "Blogs & Writeups — Android Bug Bounty",
    url: "/docs/blogs-and-writeups",
    content: "Blogs & Writeups — Curated list of high-quality blogs and writeups focused on Android security vulnerabilities and exploitation.",
    slug: "blogs-and-writeups",
    itemTitle: "Blogs & Writeups",
    items: [
      { title: "OWASP Mobile Top 10 2016" },
      { title: "Mindmap - Checklist for Android Bug Bounty" },
      { title: "OWASP Mobile Security Testing Guide" },
      { title: "Android Applications Reversing 101" },
      { title: "Detect secret leaks in Android apps" },
      { title: "Android Security Guidelines" },
      { title: "Attacking Broadcast Receivers" },
      { title: "Android WebView Vulnerabilities" },
      { title: "Android APK Recon Setup" },
      { title: "WebView addJavascriptInterface RCE" },
      { title: "Install PlayStore on Emulator" },
      { title: "Android Bug Bounty Tips" },
      { title: "Access to Protected Components" },
      { title: "Arbitrary Code Execution via third-party package contexts" },
      { title: "Interception of Implicit Intents" },
      { title: "Evernote Vulnerabilities - Universal XSS" },
      { title: "Gaining Access to Content Providers" },
      { title: "vaishalinagori112 on Medium" },
      { title: "prasadraj954 on Medium" },
      { title: "Sandeep Wawdane" },
      { title: "Oversecured Blog" },
      { title: "CorSecure Blog" },
      { title: "Frida Official Documentation" },
      { title: "SecurityBreached (Babayaga47)" },
      { title: "DeeSee's Android Security Resources" },
      { title: "Hacker101: Mobile Crash Course" },
      { title: "Mobisec Slides" },
      { title: "Bypassing Certificate Pinning" },
      { title: "Android Hacking Primer" },
      { title: "OWASP Mobile Top Ten 2023" },
      { title: "Android SMS Stealer" },
      { title: "Hacking SMS API via Static Analysis" },
      { title: "Getting Started in Android Pentesting" },
      { title: "Exploiting Insecure Firebase DB" },
      { title: "Finding Leaked AWS Creds in Android Apps" },
      { title: "SQLi in Content Providers" },
      { title: "8 Ways to Bypass SSL Pinning in iOS" },
      { title: "YesWeHack guide to Android Bug Bounty" },
      { title: "RootAVD(Root your android virtual device)" },
      { title: "Intent Abuse in Google Messages for Wear OS" },
      { title: "Android recon for Bug Bounty hunters" }
    ]
  },
  {
    title: "Conference Talks — Android Bug Bounty",
    url: "/docs/conference-talks",
    content: "Conference Talks — Best Android security and bug bounty conference talks from DEF CON, Black Hat, OWASP, and more.",
    slug: "conference-talks",
    itemTitle: "Conference Talks",
    items: [
      { title: "Pwning Android Apps at Scale" },
      { title: "Hacking Mobile Applications with Frida (David Coursey)" },
      { title: "Unlocking secrets of proprietary software using Frida" },
      { title: "Hacking Banking app" },
      { title: "Conference Talks by Laurie Kirk" }
    ]
  },
  {
    title: "Automated Scanners — Android Bug Bounty",
    url: "/docs/automated-scanners",
    content: "Automated Scanners — Collection of automated security scanners and static/dynamic analysis tools for Android applications.",
    slug: "automated-scanners",
    itemTitle: "Automated Scanners",
    items: [
      { title: "BeVigil" }
    ]
  },
  {
    title: "Intentionally Vulnerable Apps — Android Bug Bounty",
    url: "/docs/intentionally-vulnerable-apps",
    content: "Intentionally Vulnerable Apps — List of vulnerable Android applications for practicing security testing and exploitation techniques.",
    slug: "intentionally-vulnerable-apps",
    itemTitle: "Intentionally Vulnerable Apps",
    items: [
      { title: "Oversecured Vulnerable Android App (OVAA)" },
      { title: "Damn Vulnerable Bank" },
      { title: "InsecureShop" },
      { title: "Vuldroid" },
      { title: "InjuredAndroid" },
      { title: "Android-InsecureBankv2" },
      { title: "Damn Insecure and Vulnerable app (DIVA)" },
      { title: "OWASP-GoatDroid-Project" },
      { title: "Sieve (Password Manager)" },
      { title: "Mobile Hacking Lab" },
      { title: "Security Compass Android Labs" },
      { title: "Security Compass iPhone Labs" },
      { title: "OWASP iGoat (Android)" }
    ]
  },
  {
    title: "My Android Bug Bounty Lab Setup — Android Bug Bounty",
    url: "/docs/my-android-bug-bounty-lab-setup",
    content: "My Android Bug Bounty Lab Setup — Visual walkthrough and overview of a professional Android security research and bug bounty lab environment.",
    slug: "my-android-bug-bounty-lab-setup",
    itemTitle: "My Android Bug Bounty Lab Setup",
    items: [
      { title: "Lab Setup View 1" },
      { title: "Lab Setup View 2" },
      { title: "Lab Setup View 3" },
      { title: "Lab Setup View 4" },
      { title: "Lab Setup View 5" }
    ]
  },
  {
    title: "Security Tools for Android Pentesting — Android Bug Bounty",
    url: "/docs/security-tools-for-android-pentesting",
    content: "Security Tools for Android Pentesting — Comprehensive list of essential tools for Android penetration testing and security assessments.",
    slug: "security-tools-for-android-pentesting",
    itemTitle: "Security Tools",
    items: [
      { title: "APKTool" }, { title: "Jadx" }, { title: "MobSF" }, { title: "Androguard" },
      { title: "Bytecode Viewer" }, { title: "ClassyShark" }, { title: "QARK" }, { title: "Enjarify" },
      { title: "APKLeaks" }, { title: "Frida" }, { title: "Objection" }, { title: "Xposed / LSPosed" },
      { title: "Burp Suite" }, { title: "Drozer" }, { title: "Magisk" }, { title: "ADB" },
      { title: "Logcat" }, { title: "Pidcat" }, { title: "MatLog" }, { title: "XLog / Timber" },
      { title: "Logd" }, { title: "Syslog" }
    ]
  },
  {
    title: "PIDCAT for Android Bug Bounty Logging — Android Bug Bounty",
    url: "/docs/pidcat-bug-bounty-logging",
    content: "PIDCAT for Android Bug Bounty Logging — Efficient Android logcat wrapper for filtering logs by process ID, essential for focused application analysis.",
    slug: "pidcat-bug-bounty-logging",
    itemTitle: "PIDCAT Logging",
    items: [
      { title: "Why Use PIDCAT?" },
      { title: "adb logcat vs pidcat" },
      { title: "Cloning Repository" },
      { title: "Universal PATH Setup" },
      { title: "Example Commands" }
    ]
  },
  {
    title: "CLI Commands & Shortcuts — Android Bug Bounty",
    url: "/docs/cli-commands-and-shortcuts",
    content: "CLI Commands & Shortcuts — Ultimate cheatsheet for ADB, Frida, Objection, and Drozer commands used in Android bug bounty hunting.",
    slug: "cli-commands-and-shortcuts",
    itemTitle: "CLI Shortcuts",
    items: [
      { title: "Emulator Shortcuts" },
      { title: "ADB Basic Commands" },
      { title: "ADB File Transfer" },
      { title: "ADB Sideload & Install" },
      { title: "ADB Shell & Logic" },
      { title: "Frida Basic Usage" },
      { title: "Objection Cheatsheet" },
      { title: "Drozer Common Commands" }
    ]
  },
  {
    title: "Learn Drozer for Android Pentesting — Android Bug Bounty",
    url: "/docs/learn-drozer-for-android-pentesting",
    content: "Learn Drozer for Android Pentesting — Comprehensive guide and module list for using Drozer to assess Android application security.",
    slug: "learn-drozer-for-android-pentesting",
    itemTitle: "Learn Drozer",
    items: [
      { title: "Drozer Installation and Basic Usage" },
      { title: "Android Component Testing with Drozer" },
      { title: "Content Provider Exploitation" },
      { title: "Advanced Drozer Techniques" },
      { title: "Practical Drozer Exploits" },
      { title: "Drozer For Penetration Testing" }
    ]
  },
  {
    title: "Learn Frida for Android Pentesting — Android Bug Bounty",
    url: "/docs/learn-frida-for-android-pentesting",
    content: "Learn Frida for Android Pentesting — Introduction to dynamic instrumentation using Frida for Android application security testing.",
    slug: "learn-frida-for-android-pentesting",
    itemTitle: "Learn Frida",
    items: [
      { title: "Frida Playlist 1" },
      { title: "Frida Playlist 2" },
      { title: "Frida Playlist 3" },
      { title: "Frida Playlist 4" },
      { title: "Frida Tutorial - N2JtRXCofUU" },
      { title: "Frida Tutorial - R3ptGaFW1AU" },
      { title: "Frida Tutorial - 8PD6vRBgQrg" }
    ]
  },
  {
    title: "Bypassing Security Protections in APKs via Objection and Frida — Android Bug Bounty",
    url: "/docs/bypassing-security-protections-in-apks-via-objection-and-frida",
    content: "Bypassing Security Protections in APKs via Objection and Frida — Advanced techniques for bypassing SSL pinning, root detection, and other security controls.",
    slug: "bypassing-security-protections-in-apks-via-objection-and-frida",
    itemTitle: "Bypassing Protections",
    items: [
      { title: "SSL Pinning Bypass Analysis" },
      { title: "Root Detection Bypass Flow" }
    ]
  },

  // Custom entries
  {
    title: 'Krish',
    url: '/docs',
    slug: 'krish',
    content: 'Krish — custom entry indexed for search and highlighting within documentation.'
  },
  {
    title: 'Sibhi',
    url: '/docs',
    slug: 'sibhi',
    content: 'Sibhi — custom entry indexed for search and highlighting within documentation.'
  }
];
