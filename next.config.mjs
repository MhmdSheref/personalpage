/** @type {import('next').NextConfig} */

import createMDX from '@next/mdx'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Set workspace root explicitly to silence the multiple-lockfile warning
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [new URL('https://github.com/mhmdsheref.png')],
    qualities: [75, 95, 100],
  },
}

const withMDX = createMDX({
  // Add Markdown plugins here, as desired
})



// Merge MDX config with Next.js config
export default withMDX(nextConfig)