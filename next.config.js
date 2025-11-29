/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['undraw.co', 'via.placeholder.com'],
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: 'canvas' }];
    return config;
  },
}

module.exports = nextConfig
