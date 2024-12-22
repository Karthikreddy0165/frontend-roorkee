/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    domains: ['65.0.122.213'], // Add your local domain here
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '65.0.122.213',
        port: '8000',
        pathname: '/media/banners/**',
      },
    ],
  },
};

export default nextConfig;