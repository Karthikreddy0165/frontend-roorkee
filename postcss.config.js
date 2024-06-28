module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/HomePage',
        permanent: true,
      },
    ];
  },
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
