const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.dev');

const app = express();
const compiler = webpack(webpackConfig);


app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.listen(4201, () => {
  console.log('Server listening on port 4201, Ctrl+C to stop');  // eslint-disable-line no-console
});
