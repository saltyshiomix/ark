/** @format */

module.exports = {
  apps: [
    {
      name: 'Portal',
      script: '.next/production-server/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
