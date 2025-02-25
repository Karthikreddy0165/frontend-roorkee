import { defineConfig } from 'cypress';
import dotenv from 'dotenv'
dotenv.config({ path: './.env'})
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', 
    env: {
      apiUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://43.204.236.103:8000',
    },
    setupNodeEvents(on, config) {
      console.log("Using API URL:", config.env.apiUrl);
      // Add any necessary node event listeners here
    },
  },
});
