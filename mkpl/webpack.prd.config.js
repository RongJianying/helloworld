const merge = require('webpack-merge');
const AssetsPlugin = require('assets-webpack-plugin');
const path = require('path');
const webpackBaseConf = require('./webpack.base.conf.js');

module.exports = merge(webpackBaseConf, {
  // actually production is the default mode value
  mode: 'production',
  devtool: 'hidden-source-map',
  output: {
    sourceMapFilename: 'sourcemaps/[file].map',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/static/mkpl',
    pathinfo: false
  },
  plugins: [
    new AssetsPlugin({
      filename: 'mkpl-manifest.json',
      path: path.resolve(__dirname, 'dist'),
      prettyPrint: true,
      metadata: { timestamp: new Date() }
    })
  ],
  optimization: {
    moduleIds: 'hashed',
    splitChunks: {
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/]/,
          name: 'common',
          chunks: 'all'
        }
      }
    }
  }
});
