const path = require("path");
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.dev.js');
const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    // noInfo: true,
  })
);

app.listen(3000, function () {
  console.log('3000');
});

app.use(require("webpack-hot-middleware")(compiler));
//解決僅透過網址列抓不到路由
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, './dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})