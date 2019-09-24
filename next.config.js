const withCSS = require('@zeit/next-css');
const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = withCSS({
  webpack: (config) => {
    config.module.rules = [
      ...(config.module.rules || []),
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: 'url-loader?limit=100000',
      },
    ];

    config.plugins = [
      ...(config.plugins || []),
      new DotenvWebpackPlugin(),
    ];

    return config;
  },
});
