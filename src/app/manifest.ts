import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Penquin',
        short_name: 'Penquin',
        description: 'Level up your bug bounty game with pre-built commands, streamlined workflows, and insider resources.',
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
