/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: async function() {
    return [
      {
        source: '/api/:slug*',
        destination: 'http://localhost:8080/:slug*'
      }
    ]
  },
}

module.exports = nextConfig;
