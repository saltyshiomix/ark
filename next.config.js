const { join } = require('path');
const withTypescript = require('@zeit/next-typescript');
const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = withTypescript({
  webpack: config => {
    config.plugins = [
      ...(config.plugins || []),
      new DotenvWebpackPlugin({
        path: join(__dirname, '.env'),
        systemvars: true
      })
    ]
    return config;
  }
});
