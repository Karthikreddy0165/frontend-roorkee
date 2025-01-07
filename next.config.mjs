/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'launchpad-media.s3.amazonaws.com',
        pathname: '/media/banners/**',
      },
    ],
  },
};

export default nextConfig;