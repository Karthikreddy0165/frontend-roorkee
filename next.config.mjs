/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['3.109.208.148'], // Add your local domain here
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '3.109.208.148',
        port: '8000',
        pathname: '/media/banners/**',
      },
    ],
  },
};

export default nextConfig;