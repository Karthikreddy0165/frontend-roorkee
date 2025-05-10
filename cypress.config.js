const { defineConfig } = require('cypress');
const codeCoverageTask = require('@cypress/code-coverage/task');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', 
    env: {
      apiUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://django.empowerhub.info',
    },
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
  },
});
