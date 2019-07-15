/** @format */

const { join } = require('path');
const DotenvWebpackPlugin = require('dotenv-webpack');

const withSass = require('@zeit/next-sass');
// const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
const withPlugins = require('next-compose-plugins');

function withCustomWebpack(conf = {}) {
  const { webpack } = conf;

  conf.webpack = (
    config,
    { /* buildId, */ dev, isServer /* , defaultLoaders */, ...rest },
  ) => {
    config.plugins = [
      ...(config.plugins || []),
      new DotenvWebpackPlugin({ path: join(__dirname, '.env') }),
    ];

    return webpack(config, { isServer, ...rest });
  };

  return conf;
}

const plugins = [
  [withCSS],
  [withSass],
  [withFonts],
  // [withBundleAnalyzer],
  [withCustomWebpack],
];

const config = {
  poweredByHeader: false,
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  // bundleAnalyzerConfig: {
  //   server: {
  //     analyzerMode: 'static',
  //     reportFilename: '../bundles/server.html'
  //   },
  //   browser: {
  //     analyzerMode: 'static',
  //     reportFilename: '../bundles/client.html'
  //   }
  // },
};

module.exports = withPlugins(plugins, config);
