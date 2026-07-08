/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig
