/** @type {import('next').NextConfig} */
const baseConfig = {
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

const nextConfig = {
  ...baseConfig,
  webpack(config, { isServer }) {
    // Instrument code only in test environment
    if (process.env.NODE_ENV === 'test') {
      config.module.rules.push({
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
          plugins: ['babel-plugin-istanbul'],  // Add the Istanbul plugin for coverage
        },
      });
    }

    return config;
  },
};

export default nextConfig;