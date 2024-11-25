/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['13.235.48.124'], // Add your local domain here
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '13.235.48.124',
        port: '8000',
        pathname: '/media/banners/**',
      },
    ],
  },
};

export default nextConfig;