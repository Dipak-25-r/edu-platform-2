/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['undraw.co', 'via.placeholder.com'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  webpack: (config, { isServer }) => {
    config.externals = [...(config.externals || []), { canvas: 'canvas' }];
    if (!isServer) {
      config.optimization.runtimeChunk = 'single';
    }
    return config;
  },
  // Suppress Plotly.js warnings
  env: {
    NEXT_PUBLIC_PLOTLY_IGNORE_WARNINGS: 'true',
  },
}

module.exports = nextConfig
