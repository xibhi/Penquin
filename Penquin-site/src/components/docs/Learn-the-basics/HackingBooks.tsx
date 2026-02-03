'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface BookItem {
  idx: number
  name: string
  url: string
  interesting: string
}

const books: BookItem[] = [
  { idx: 1, name: 'Cyberjutsu', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/Cyberjutsu.pdf', interesting: 'no' },
  { idx: 2, name: 'Black-Hat-Go', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/Black-Hat-Go.pdf', interesting: 'Yes' },
  { idx: 3, name: 'Violent Python', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/Violent%20Python.pdf', interesting: 'Yes' },
  { idx: 4, name: 'Black-Hat-Bash', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/Black-Hat-Bash.pdf', interesting: 'Yes' },
  { idx: 5, name: 'BlackHat GraphQL', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/BlackHat%20GraphQL.pdf', interesting: 'Yes' },
  { idx: 6, name: 'Bash Cheat Sheet', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/bash_cheat_sheet.pdf', interesting: 'Yes' },
  { idx: 7, name: 'Rust-Programming', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/No-Starch-Press-The-Rust.pdf', interesting: 'Yes' },
  { idx: 8, name: 'Make Python Talk', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/make-python-talk.pdf', interesting: 'Yes' },
  { idx: 9, name: 'Zseanos Methodology', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/zseanos-methodology.pdf', interesting: 'Yes' },
  { idx: 10, name: 'Bug Bounty Bootcamp', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/bug-bounty-bootcamp.pdf', interesting: 'Yes' },
  { idx: 11, name: "A Bug Hunter's Diary", url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/a%20bug%20hunters%20diary.pdf', interesting: 'no' },
  { idx: 12, name: 'JavaScript Security', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/JavaScript%20Security.pdf', interesting: 'No' },
  { idx: 13, name: 'Build an HTML5 Game', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/Build%20an%20HTML5%20Game.pdf', interesting: 'Yes' },
  { idx: 14, name: 'Red Team Field Manual', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/rtfm-red-team-field-manual.pdf', interesting: 'Yes' },
  { idx: 15, name: 'Blue Team Field Manual', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/Blue%20Team%20Field%20Manual.pdf', interesting: 'Yes' },
  { idx: 16, name: 'The-Linux-Command-Line', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/The-Linux-Command-Line.pdf', interesting: 'Yes' },
  { idx: 17, name: 'Linux Basics for Hackers', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/linux-basics-for-hackers.pdf', interesting: 'Yes' },
  { idx: 18, name: 'Attacking Network Protocols', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/attacking%20network%20protocols.pdf', interesting: 'No' },
  { idx: 19, name: 'Hacking APIs - Early Access', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/Hacking%20APIs%20-%20Early%20Access.pdf', interesting: 'Yes' },
  { idx: 20, name: 'Web Security For Developers', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/websecurityfordevelopers.pdf', interesting: 'No' },
  { idx: 21, name: 'Pentesting Azure Applications', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/pentesting%20azure%20applications.pdf', interesting: 'Yes' },
  { idx: 22, name: 'Black Hat Python, 2nd Edition', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/Black%20Hat%20Python.pdf', interesting: 'Yes' },
  { idx: 23, name: 'How Cybersecurity Really Works', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/how-cybersecurity-really-works.pdf', interesting: 'no' },
  { idx: 24, name: 'Beyond-the-Basic-Stuff-with-Python', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/Beyond-the-Basic-Stuff-with-Python.pdf', interesting: 'Yes' },
  { idx: 25, name: 'Learn Windows PowerShell in a Month of Lunches', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/learn-windows-powershell-in-a-month-of-lunches.pdf', interesting: 'Yes' },
  { idx: 26, name: 'Real-World Bug Hunting - A Field Guide to Web Hacking', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/Real-World%20Bug%20Hunting%20-%20A%20Field%20Guide%20to%20Web%20Hacking.pdf', interesting: 'Yes' },
  { idx: 27, name: 'Penetration Testing - A hands-on introduction to Hacking', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/Penetration%20Testing%20-%20A%20hands-on%20introduction%20to%20Hacking.pdf', interesting: 'Yes' },
  { idx: 28, name: 'The Hacker Playbook 3 - Practical Guide To Penetration Testing', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/The%20Hacker%20Playbook%203%20-%20Practical%20Guide%20To%20Penetration%20Testing.pdf', interesting: 'no' },
  { idx: 29, name: 'Enumerating Esoteric Attack Surfaces by Jann Moon', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/Enumerating%20Esoteric%20Attack%20Surfaces%20by%20Jann%20Moon.pdf', interesting: 'no' },
  { idx: 30, name: 'Practical Packet Analysis', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/practical%20packet%20analysis%203rd%20edition.pdf', interesting: 'Yes' },
  { idx: 31, name: 'Wicked Cool Shell Scripts.pdf', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/Wicked%20Cool%20Shell%20Scripts.pdf', interesting: 'Yes' },
  { idx: 32, name: 'Wicked Cool Perl Scripts', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/Wicked%20Cool%20Perl%20Scripts.pdf', interesting: 'Yes' },
  { idx: 33, name: 'wicked-cool-ruby-scripts', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/wicked-cool-ruby-scripts.pdf', interesting: 'Yes' },
  { idx: 34, name: 'perl-one-liners', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/perl-one-liners.pdf', interesting: 'Yes' },
  { idx: 35, name: 'the-book-of-ruby', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/the-book-of-ruby.pdf', interesting: 'Yes' },
  { idx: 36, name: 'Ruby by Example', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/Ruby%20by%20Example.pdf', interesting: 'no' },
  { idx: 37, name: 'PowerShell_for_Sysadmins', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/PowerShell_for_Sysadmins.pdf', interesting: 'Yes' },
  { idx: 38, name: 'Webbots, Spiders, and Screen Scrapers', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/Webbots%2C%20Spiders%2C%20and%20Screen%20Scrapers.pdf', interesting: '-' },
  { idx: 39, name: 'mining-social-media', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/mining-social-media.pdf', interesting: 'Yes' },
  { idx: 40, name: 'How-Linux-Works', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/How-Linux-Works.pdf', interesting: 'Yes' },
  { idx: 41, name: 'Mastering Modern Web Penetration Testing', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/Mastering%20Modern%20Web%20Penetration%20Testing.pdf', interesting: 'no' },
  { idx: 42, name: 'The tangled Web a guide to securing modern Web applications', url: 'https://github.com/Raunaksplanet/My-CS-Store/blob/main/Books/The%20tangled%20Web_%20a%20guide%20to%20securing%20modern%20Web%20applications.pdf', interesting: 'no' },
]

export function HackingBooks() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <motion.div
            key={`${book.idx}-${book.name}`}
           
            className="projects h-full border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors flex flex-col"
          >
            <div className="space-y-2 flex-1 flex flex-col">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold leading-tight">{book.name}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 border border-border text-[10px]">
                    #{book.idx}
                  </span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">Interesting: {book.interesting}</p>

              <div className="pt-2 mt-auto">
                <a
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors no-underline border-0 focus:outline-none focus:ring-0"
                >
                  Open PDF
                  <i className="fas fa-external-link-alt text-xs"></i>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}


