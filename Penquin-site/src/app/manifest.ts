import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Penquin - Cyber Security Tool',
        short_name: 'Penquin Tool',
        description: 'Level up your bug bounty game with Penquin Tool. Pre-built commands, streamlined workflows, and insider resources for Cyber Security researchers.',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
            {
                src: '/logo.jpg',
                sizes: 'any',
                type: 'image/jpeg',
            },
        ],
    }
}
