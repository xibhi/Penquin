'use client'

import React from 'react'
import { motion } from 'framer-motion'

const images = [
    {
        url: '/content/1.png',
        alt: 'Lab Setup View 1'
    },
    {
        url: '/content/2.png',
        alt: 'Lab Setup View 2'
    },
    {
        url: '/content/3.png',
        alt: 'Lab Setup View 3'
    },
    {
        url: '/content/4.png',
        alt: 'Lab Setup View 4'
    },
    {
        url: '/content/5.png',
        alt: 'Lab Setup View 5'
    }
]

export function LabSetup() {
    return (
        <div className="space-y-8">
            <p className="text-lg text-muted-foreground">
                Visual walkthrough of my Android Bug Bounty lab environment. A well-organized workspace is key to efficient vulnerability research.
            </p>

            <div className="grid grid-cols-1 gap-8">
                {images.map((image, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300"
                    >
                        <div className="relative overflow-hidden bg-muted/30">
                            <img
                                src={image.url}
                                alt={image.alt}
                                className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.01]"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <span className="text-white font-medium">{image.alt}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
