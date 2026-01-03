'use client'

import Hero from "@/components/index/Hero";
import Footer from "@/components/index/Footer";
import Features from "@/components/index/Features";
import CTA from "@/components/index/CTA";
import Terminal from "@/components/index/Terminal";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export default function Home() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <div>
      <Hero />
      <div ref={sectionRef} className="md:max-w-3xl mx-auto my-8 md:my-18">
        <motion.h1
          initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
          animate={isInView ? { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.3 } } : {}}
          className='bg-clip-text text-transparent py-2 max-md:mx-6 relative z-20 font-bold font-sans tracking-tight text-4xl md:text-7xl bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-neutral-700 dark:to-white'
        >
          Quick Install
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)', y: 40 }}
          animate={isInView ? { opacity: 1, filter: 'blur(0px)', y: 0, transition: { delay: 0.4, duration: 0.3 } } : {}}
        >
          <div className="md:my-8 my-3 md:text-left md:max-w-3xl mx-auto align-middle">
            <Terminal command={"wget https://raw.githubusercontent.com/xibhi/Penquin/refs/heads/master/ToolsInstaller.sh && sudo bash ToolsInstaller.sh"} />
          </div>
        </motion.div>
      </div>
      <Features />
      <CTA />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Penquin",
            "applicationCategory": "SecurityApplication",
            "operatingSystem": "Linux, macOS, Windows (WSL)",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "description": "Level up your bug bounty game with pre-built commands, streamlined workflows, and insider resources.",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "150"
            }
          })
        }}
      />
    </div>
  );
}
