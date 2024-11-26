module.exports = {
  apps: [
    {
      name: 'frontend-roorkee',
      script: 'npm',
      args: 'run start',
      interpreter: 'none',
      env: {
        NODE_ENV: 'production',
        PORT: 3000, 
      },
      instances: 'max',
      exec_mode: 'cluster',
      max_memory_restart: '1G',
      autorestart: true,
      restart_delay: 1000,
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: '/var/log/pm2/frontend-error.log',
      out_file: '/var/log/pm2/frontend-out.log'
    }
  ]
};