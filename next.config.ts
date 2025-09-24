import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const NextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/v1',
        destination: '/docs',
        permanent: true,
      },
      {
        source: '/v1/:path*',
        destination: '/docs/:path*',
        permanent: true,
      },
    ];
  },
};

export default withMDX(NextConfig);