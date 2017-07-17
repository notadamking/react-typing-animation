const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV !== 'development';

module.exports = {
  devtool: isProduction ? 'source-map' : 'eval',
  context: path.resolve(__dirname, './'),
  entry: isProduction
    ? './index.js'
    : ['webpack-hot-middleware/client', 'react-hot-loader/patch', './index.js'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './build'),
    publicPath: isProduction ? '/react-typing-animation/' : '/',
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
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: isProduction
          ? ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                {
                  loader:
                    'css-loader?modules&importLoaders=1&localIdentName=[hash:base64:4]',
                },
                { loader: 'postcss-loader' },
              ],
            })
          : [
              { loader: 'style-loader' },
              {
                loader:
                  'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
              },
              { loader: 'postcss-loader' },
            ],
      },
      {
        test: /\.(png|jpg|ico|woff|woff2|ttf|eot|svg)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([{ from: './public', to: './' }]),
    new HtmlWebpackPlugin({
      template: './template.html',
    }),
    ...(isProduction
      ? [
          new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: JSON.stringify('production'),
            },
          }),
          new ExtractTextPlugin({
            filename: 'styles/main.css',
            allChunks: true,
            publicPath: 'styles/',
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
