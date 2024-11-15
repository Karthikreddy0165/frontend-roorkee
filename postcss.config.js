module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/App',
        permanent: true,
      },
    ];
  },
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  
};
