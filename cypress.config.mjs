import { defineConfig } from 'cypress';
import dotenv from 'dotenv'
dotenv.config({ path: './.env'})
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', 
    env: {
      apiUrl: process.env.NEXT_PUBLIC_API_BASE_URL
    },
    setupNodeEvents(on, config) {
      // Add any necessary node event listeners here
    },
  },
});
