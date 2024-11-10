// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',  // Catch all requests to /api
        destination: 'http://localhost:5000/api/:path*' // Proxy to Backend
      }
    ];
  }
};

module.exports = nextConfig;