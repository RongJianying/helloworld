const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const INLINE_IMAGE_SIZE_LIMIT = 1024;
const BIZ_PATH = path.resolve(__dirname, '../../lib/front_end/biz');

module.exports = {
  entry: {
    mkpl: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash].js',
    hashDigestLength: 32
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css'
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /\.modules\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.modules\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]'
              },
              importLoaders: 1,
              localsConvention: 'camelCaseOnly'
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=200000&mimetype=application/font-woff'
      },
      {
        test: /\.gif/,
        loader: `url-loader?limit=${INLINE_IMAGE_SIZE_LIMIT}&mimetype=image/gif&name=images/[name]-[hash].[ext]`
      },
      {
        test: /\.jpg/,
        loader: `url-loader?limit=${INLINE_IMAGE_SIZE_LIMIT}&mimetype=image/jpg&name=images/[name]-[hash].[ext]`
      },
      {
        test: /\.png/,
        loader: `url-loader?limit=${INLINE_IMAGE_SIZE_LIMIT}&mimetype=image/png&name=images/[name]-[hash].[ext]`
      },
      {
        test: /\.svg/,
        loader: `url-loader?limit=${INLINE_IMAGE_SIZE_LIMIT}&mimetype=image/svg+xml&name=images/[name]-[hash].[ext]`
      }
    ]
  },
  resolve: {
    alias: {
      'biz-discover': `${BIZ_PATH}/biz-discover/`
    },
    extensions: ['.js', '.jsx']
  }
};
