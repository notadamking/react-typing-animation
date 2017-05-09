const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV !== 'development';

module.exports = {
  devtool: isProduction ? 'source-map' : 'eval',
  context: path.resolve(__dirname, './'),
  entry: isProduction
    ? {
      app: ['./index.js'],
      vendor: ['react', 'react-dom'],
    }
    : ['webpack-hot-middleware/client', 'react-hot-loader/patch', './index.js'],
  output: {
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    path: path.resolve(__dirname, './build/public'),
    publicPath: isProduction ? '/' : 'http://localhost:3000/',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          minimize: isProduction,
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|build)/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isProduction
        ? JSON.stringify('production')
        : JSON.stringify('development'),
      __DEVELOPMENT__: !isProduction,
    }),
    new AssetsPlugin({
      path: path.resolve(__dirname, './build'),
    }),
    new HtmlWebpackPlugin({
      template: './template.html',
    }),
    ...(isProduction
      ? [
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
        }),
        new webpack.optimize.UglifyJsPlugin({
          output: {
            comments: false,
          },
        }),
      ]
      : [
        new webpack.IgnorePlugin(/webpack-assets.json/),
        new webpack.HotModuleReplacementPlugin(),
      ]),
  ],
  stats: {
    children: false,
  },
};
