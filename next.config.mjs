/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['13.201.99.1'], // Add your local domain here
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '13.201.99.1',
        port: '8000',
        pathname: '/media/banners/**',
      },
    ],
  },
};

export default nextConfig;