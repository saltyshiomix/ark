const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = {
  webpack: (config) => {
    config.plugins = [
      ...(config.plugins || []),
      new DotenvWebpackPlugin(),
    ];
    return config;
  },
};
