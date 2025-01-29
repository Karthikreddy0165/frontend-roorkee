import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // your app's base URL
    env: {
      apiUrl: 'http://43.204.236.103:8000'
    },
    setupNodeEvents(on, config) {
      // Add any necessary node event listeners here
    },
  },
});
