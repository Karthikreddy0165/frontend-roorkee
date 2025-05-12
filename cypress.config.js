const { defineConfig } = require('cypress');
const codeCoverageTask = require('@cypress/code-coverage/task');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', 
    env: {
      apiUrl:'https://django.empowerhub.info',
    }
    ,
    retries:{
      runMode: 3,
      openMode: 0
    }
    ,
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
  },
});
