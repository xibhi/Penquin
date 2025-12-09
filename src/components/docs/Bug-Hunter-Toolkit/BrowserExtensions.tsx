'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FaGithub, FaChrome, FaFirefox } from 'react-icons/fa6'

interface Extension {
  name: string
  description: string
  firefoxLink?: string
  firefoxLabel?: string
  githubLink?: string
  chromeLink?: string
}

const extensions: Extension[] = [
  {
    name: "Greb",
    description: "Easily capture and manipulate form parameters, URL parameters, and form data.",
    githubLink: "https://github.com/1hehaq/greb.git",
  },
  {
    name: "TruffleHog",
    description: "Find hidden API keys and secrets in websites",
    firefoxLink: "https://addons.mozilla.org/en-US/firefox/addon/trufflehog/",
    firefoxLabel: "Firefox Store",
    chromeLink: "https://chromewebstore.google.com/detail/trufflehog/bafhdnhjnlcdbjcdcnafhdcphhnfnhjc"
  },
  {
    name: "FoxyProxy",
    description: "Essential proxy management for Burp Suite and other MITM applications",
    firefoxLink: "https://addons.mozilla.org/en-US/firefox/addon/foxyproxy-standard/",
    firefoxLabel: "Firefox Store",
    chromeLink: "https://chromewebstore.google.com/detail/foxyproxy/gcknhkkoolaabfmlnjonogaaifnjlfnp"
  },
  {
    name: "Wappalyzer",
    description: "Identify technologies, CMS, and frameworks used by websites",
    firefoxLink: "https://addons.mozilla.org/en-US/firefox/addon/wappalyzer/",
    firefoxLabel: "Firefox Store",
    chromeLink: "https://chromewebstore.google.com/detail/wappalyzer-technology-pro/gppongmhjkpfnbhagpmjfkannfbllamg"
  },
  {
    name: "Temp Mail",
    description: "Quick access to temporary email services",
    firefoxLink: "https://addons.mozilla.org/en-US/firefox/addon/temp-mail/",
    firefoxLabel: "Firefox Store",
    chromeLink: "https://chromewebstore.google.com/detail/temp-mail-disposable-temp/inojafojbhdpnehkhhfjalgjjobnhomj"
  },
  {
    name: "Hunter.io",
    description: "Extract all email addresses from websites, useful for report submission",
    firefoxLink: "https://addons.mozilla.org/en-US/firefox/addon/hunterio/",
    firefoxLabel: "Firefox Store",
    chromeLink: "https://chromewebstore.google.com/detail/hunter-email-finder-exten/hgmhmanijnjhaffoampdlllchpolkdnj"
  },
  {
    name: "HackTools",
    description: "Collection of useful payloads and tools for penetration testing",
    firefoxLink: "https://addons.mozilla.org/en-US/firefox/addon/hacktools/",
    firefoxLabel: "Firefox Store",
    chromeLink: "https://chromewebstore.google.com/detail/hack-tools/cmbndhnoonmghfofefkcccljbkdpamhi"
  },
  {
    name: "Cookie Editor",
    description: "Advanced cookie management with security flag detection",
    firefoxLink: "https://addons.mozilla.org/en-US/firefox/addon/edit-cookie/",
    firefoxLabel: "Firefox Store",
    chromeLink: "https://chromewebstore.google.com/detail/editthiscookie-v3/ojfebgpkimhlhcblbalbfjblapadhbol"
  },
  {
    name: "WebRTC Disable",
    description: "Protect VPN IP from WebRTC leaks",
    firefoxLink: "https://addons.mozilla.org/en-US/firefox/addon/happy-bonobo-disable-webrtc/",
    firefoxLabel: "Firefox Store",
    chromeLink: "https://chromewebstore.google.com/detail/webrtc-protect-protect-ip/bkmmlbllpjdpgcgdohbaghfaecnddhni"
  },
  {
    name: "Link Gopher",
    description: "Extract all domains and links from websites and Google results",
    firefoxLink: "https://addons.mozilla.org/en-US/firefox/addon/link-gopher/",
    firefoxLabel: "Firefox Store",
    chromeLink: "https://chromewebstore.google.com/detail/link-gopher/bpjdkodgnbfalgghnbeggfbfjpcfamkf"
  },
  {
    name: "FindSomething",
    description: "Discover hidden parameters and secret keys",
    firefoxLink: "https://addons.mozilla.org/en-US/firefox/addon/findsomething/",
    firefoxLabel: "Firefox Store",
    chromeLink: "https://chromewebstore.google.com/detail/findsomething/kfhniponecokdefffkpagipffdefeldb"
  },
  {
    name: "DotGit",
    description: "Find exposed .git repositories for potential P1 information disclosure",
    firefoxLink: "https://addons.mozilla.org/en-US/firefox/addon/dotgit/",
    firefoxLabel: "Firefox Store",
    chromeLink: "https://chromewebstore.google.com/detail/dotgit/pampamgoihgcedonnphgehgondkhikel"
  },
  {
    name: "Open Multiple URLs",
    description: "Open multiple sites simultaneously",
    firefoxLink: "https://addons.mozilla.org/en-US/firefox/addon/open-multiple-urls/",
    firefoxLabel: "Firefox Store",
    chromeLink: "https://chromewebstore.google.com/detail/open-multiple-urls/oifijhaokejakekmnjmphonojcfkpbbh"
  },
  {
    name: "uBlock Origin",
    description: "Block ads and trackers for cleaner testing",
    firefoxLink: "https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/",
    firefoxLabel: "Firefox Store",
    chromeLink: "https://chromewebstore.google.com/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm"
  },
  {
    name: "Dark Reader",
    description: "Dark mode for better night-time hunting",
    firefoxLink: "https://addons.mozilla.org/en-US/firefox/addon/darkreader/",
    firefoxLabel: "Firefox Store",
    chromeLink: "https://chromewebstore.google.com/detail/dark-reader/eimadpbcbfnmbkopoojfekhnkhdbieeh"
  },
  {
    name: "User-Agent Switcher",
    description: "Test sites with different user-agent strings",
    firefoxLink: "https://addons.mozilla.org/en-US/firefox/addon/uaswitcher/",
    firefoxLabel: "Firefox Store",
    chromeLink: "https://chromewebstore.google.com/detail/user-agent-switcher-and-m/bhchdcejhohfmigjafbampogmaanbfkg"
  },
  {
    name: "Retire.js",
    description: "Identify vulnerable JavaScript libraries",
    firefoxLink: "https://addons.mozilla.org/en-US/firefox/addon/retire-js/",
    firefoxLabel: "Firefox Store"
  },
  {
    name: "Page Translator",
    description: "Translate websites to your preferred language",
    firefoxLink: "https://addons.mozilla.org/en-US/firefox/addon/traduzir-paginas-web/",
    firefoxLabel: "Firefox Store"
  },
  {
    name: "WaybackURLs",
    description: "Fetch URLs from Wayback Machine archive",
    firefoxLink: "https://addons.mozilla.org/en-US/firefox/addon/waybackurl/",
    firefoxLabel: "Firefox Store"
  },
  {
    name: "Shodan",
    description: "View hosting details, IP ownership, and open services for websites",
    firefoxLink: "https://addons.mozilla.org/es/firefox/addon/shodan-addon/",
    firefoxLabel: "Firefox Store",
    chromeLink: "https://chromewebstore.google.com/detail/shodan/jjalcfnidlmpjhdfepjhjbhnhkbgleap"
  },
  {
    name: "EXIF Viewer Pro",
    description: "Extracts metadata from images directly in the browser.",
    chromeLink: "https://chromewebstore.google.com/detail/exif-viewer-pro/mmbhfeiddhndihdjeganjggkmjapkffm"
  },
  {
    name: "Google Translate",
    description: "Translates entire web pages into different languages.",
    chromeLink: "https://chromewebstore.google.com/detail/google-translate/aapbdbdomjkkjkaonfhkkikfgjllcleb"
  },
  {
    name: "Wayback Machine",
    description: "Fetches archived versions and URLs from the Internet Archive.",
    chromeLink: "https://chromewebstore.google.com/detail/wayback-machine/fpnmgdkabkmnadcjpehmlllkndpkmiak"
  },
  {
    name: "SponsorBlock",
    description: "Skips sponsored segments and intros on YouTube.",
    chromeLink: "https://chromewebstore.google.com/detail/sponsorblock-for-youtube/mnjggcdmjocbbbhaepdhchncahnbgone"
  },
  {
    name: "EndPointer",
    description: "Extracts and analyzes sensitive URLs and endpoints.",
    chromeLink: "https://chromewebstore.google.com/detail/endpointer/ppliilneafplhagjhhphcjmjdmbjagcp"
  },
  {
    name: "YesWeHack VDP Finder",
    description: "Detects vulnerability disclosure programs (VDPs) of websites.",
    chromeLink: "https://chromewebstore.google.com/detail/yeswehack-vdp-finder/jnknjejacdkpnaacfgolbmdohkhpphjb"
  },
  {
    name: "S3BucketList",
    description: "Detects Amazon S3 bucket URLs from network requests.",
    chromeLink: "https://chromewebstore.google.com/detail/s3bucketlist/anngjobjhcbancaaogmlcffohpmcniki"
  },
  {
    name: "D3coder",
    description: "Provides encoding/decoding tools such as Base64, ROT13, and URL encoding.",
    chromeLink: "https://chromewebstore.google.com/detail/d3coder/gncnbkghencmkfgeepfaonmegemakcol"
  },
  {
    name: "Mitaka",
    description: "Searches IPs, domains, URLs, and hashes across OSINT platforms.",
    chromeLink: "https://chromewebstore.google.com/detail/mitaka/bfjbejmeoibbdpfdbmbacmefcbannnbg"
  },
  {
    name: "Vortimo",
    description: "OSINT tool for scraping, bookmarking, and analyzing web content.",
    chromeLink: "https://chromewebstore.google.com/detail/vortimo-osint-tool/mnakbpdnkedaegeiaoakkjafhoidklnf"
  },
  {
    name: "Toggle JavaScript",
    description: "Enables or disables JavaScript quickly for security testing.",
    chromeLink: "https://chromewebstore.google.com/detail/toggle-javascript/cidlcjdalomndpeagkjpnefhljffbnlo"
  },
  {
    name: "IP Address and Domain Information",
    description: "Displays IP, hosting provider, WHOIS, and geolocation data.",
    chromeLink: "https://chromewebstore.google.com/detail/ip-address-and-domain-inf/lhgkegeccnckoiliokondpaaalbhafoa"
  },
  {
    name: "JSON Formatter",
    description: "Formats and highlights raw JSON data for readability.",
    chromeLink: "https://chromewebstore.google.com/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa"
  },
  {
    name: "HackBar",
    description: "Tool for manual security testing like XSS and SQLi payloads.",
    chromeLink: "https://chromewebstore.google.com/detail/hackbar/ginpbkfigcoaokgflihfhhmglmbchinc"
  },
  {
    name: "Fake Filler",
    description: "Auto-fills forms with realistic dummy data for testing.",
    chromeLink: "https://chromewebstore.google.com/detail/fake-filler/bnjjngeaknajbdcgpfkgnonkmififhfo"
  },
  {
    name: "Code Formatter",
    description: "Beautifies JSON, CSS, and JavaScript for easier inspection.",
    chromeLink: "https://chromewebstore.google.com/detail/code-formatter-json-css-j/bhimnoepicmcjfkbmhckamllnibadfal"
  }
]

export function BrowserExtensions() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {extensions.map((extension) => (
          <motion.div
            key={extension.name}
            className="projects h-full border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors flex flex-col"
          >
            <div className="space-y-1 flex-1 flex flex-col">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold leading-tight">
                  {extension.name}
                </h3>
              </div>

              <p className="text-sm text-muted-foreground leading-snug">
                {extension.description}
              </p>

              <div className="pt-2 mt-auto">
                <div className='flex gap-2 h-max flex-row'>
                  {
                    extension.firefoxLink && (
                      <Button variant={'outline'} size={'small'} asChild className='text-xs group/button border-border hover:bg-white hover:text-black no-underline transition-all duration-300 ease-in-out active:scale-95'>
                        {(() => {
                          const isExternal = typeof extension.firefoxLink === 'string' && !extension.firefoxLink.startsWith('/');
                          return (
                            <Link href={extension.firefoxLink} target={isExternal ? '_blank' : undefined} rel="noopener noreferrer">
                              <FaFirefox size={14} className='group-hover/button:-rotate-12 group-hover/button:scale-110 rotate-0 transition-transform duration-300 ease-out' />
                              {extension.firefoxLabel ?? 'Firefox Store'}
                            </Link>
                          );
                        })()}
                      </Button>
                    )
                  }
                  {
                    extension.chromeLink && (
                      <Button variant={'outline'} size={'small'} asChild className='text-xs group/button border-border hover:bg-white hover:text-black no-underline transition-all duration-300 ease-in-out active:scale-95'>
                        <Link href={extension.chromeLink} target='_blank' rel="noopener noreferrer">
                          <FaChrome size={14} className='group-hover/button:-rotate-12 group-hover/button:scale-110 rotate-0 transition-transform duration-300 ease-out' />
                          Chrome Store
                        </Link>
                      </Button>
                    )
                  }
                  {
                    extension.githubLink && (
                      <Button variant={'outline'} size={'small'} asChild className='text-xs group/button border-border hover:bg-white hover:text-black no-underline transition-all duration-300 ease-in-out active:scale-95'>
                        <Link href={extension.githubLink} target='_blank' rel="noopener noreferrer">
                          <FaGithub size={14} className='group-hover/button:-rotate-12 group-hover/button:scale-110 rotate-0 transition-transform duration-300 ease-out' />
                          Github
                        </Link>
                      </Button>
                    )
                  }
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
