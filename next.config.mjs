/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL, // Add your API base URL from the environment
  },
  images: {
    domains: ['65.0.122.213', 'launchpad-media.s3.amazonaws.com'], // Add your allowed domains here
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
