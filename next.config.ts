import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const NextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withMDX(NextConfig);