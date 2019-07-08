const { join } = require('path');
const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = {
  webpack: config => {
    config.plugins = [
      ...(config.plugins || []),
      new DotenvWebpackPlugin({ path: join(__dirname, '.env') }),
    ];
    return config;
  }
};
