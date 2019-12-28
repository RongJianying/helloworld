const merge = require('webpack-merge');
const path = require('path');
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const asyncHandler = require('express-async-handler');
const webpackBaseConf = require('./webpack.base.conf.js');

const options = process.argv;
const port = options.includes('--port') ? options[options.indexOf('--port') + 1] : 9010;

module.exports = merge(webpackBaseConf, {
  mode: 'development',
  output: {
    publicPath: `http://localhost:${port}`
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new HTMLWebpackPlugin({
      name: 'index.html',
      template: path.resolve(__dirname, 'mock/index-dev.html')
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port,
    before(app) {
      app.get(['/app/:networkId/mkpl/*'], (req, res, next) => {
        req.url = '/index.html';
        next();
      });
      app.get(
        '/app/services/:apiName',
        asyncHandler(async (req, res) => {
          const data = await fs.promises.readFile(`./mock/${req.params.apiName}.json`, 'utf8');
          res.header('Content-Type', 'application/json');
          res.json(JSON.parse(data));
        })
      );
      app.get(
        '/mkpl_buyer_listings/search',
        asyncHandler(async function(req, res) {
          const data = await fs.promises.readFile(
            `./mock/listing.json`,
            'utf8'
          );
          res.header('Content-Type', 'application/json');
          res.json(JSON.parse(data));
        })
      );
    }
  }
});
