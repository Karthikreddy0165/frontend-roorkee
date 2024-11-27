/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000', // Add the port if required
        pathname: '/media/**', // Adjust the path based on your image location
      },
    ],
  },
};

export default nextConfig;
