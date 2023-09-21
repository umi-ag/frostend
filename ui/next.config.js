/** @type {import('next').NextConfig} */
const nextConfig = {
  runtime: 'edge',
  images: {
    domains: [
      'storage.googleapis.com',
      `github.com`,
      'user-images.githubusercontent.com',
    ],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig
