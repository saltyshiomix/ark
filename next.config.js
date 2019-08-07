/** @format */
/* eslint no-param-reassign: 0 */

const { join, resolve } = require('path');
const DotenvWebpackPlugin = require('dotenv-webpack');

const withSass = require('@zeit/next-sass');
// const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
// const withReactSvg = require('next-react-svg');
const withPlugins = require('next-compose-plugins');
const Webpack = require('webpack');

function withCustomWebpack(conf = {}) {
  const { webpack } = conf;

  conf.webpack = (
    config,
    { /* buildId, */ dev, isServer /* , defaultLoaders */, ...rest },
  ) => {
    config.plugins = [
      ...(config.plugins || []),
      new Webpack.DefinePlugin({
        __DEV__: JSON.stringify(dev),
        __SERVER__: JSON.stringify(isServer),
      }),
      new DotenvWebpackPlugin({ path: join(__dirname, '.env') }),
    ];

    return webpack(config, { isServer, ...rest });
  };

  return conf;
}

const plugins = [
  [withCSS, { cssModules: true }],
  [withSass],
  [withFonts, { enableSvg: true }],
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
