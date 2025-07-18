/** @type {import('next').NextConfig} */

import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  images: {
    remotePatterns: [new URL('https://github.com/mhmdsheref.png')],
  },
}

const withMDX = createMDX({
  // Add Markdown plugins here, as desired
})



// Merge MDX config with Next.js config
export default withMDX(nextConfig)