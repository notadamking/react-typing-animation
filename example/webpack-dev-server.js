/* eslint-disable import/no-commonjs */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

const express = require('express');
const webpack = require('webpack');

const webpackConfig = require('./webpack.config');

const devServer = express();
const compiler = webpack(webpackConfig);
const port = 3000;

devServer.use(
  require('webpack-dev-middleware')(compiler, {
    historyApiFallback: true,
    contentBase: `http://localhost:${port}/`,
    quiet: true,
    noInfo: true,
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true },
  })
);
devServer.use(require('webpack-hot-middleware')(compiler));

devServer.listen(port, err => {
  if (err) {
    console.error(err);
  } else {
    console.info(
      `==> 🚧  Webpack development server listening on port ${port}`
    );
  }
});
