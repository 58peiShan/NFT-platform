const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
require('dotenv').config();
module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: [
    // "webpack-hot-middleware/client?noInfo=true&reload=true",
    "./src/index.js",
  ],
  output: {
    filename: "./js/[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    port: process.env.FRONT_END_PORT,
    open: true,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
      },
      {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-react", "@babel/preset-env"] },
        },
      },
      {
        test: /\.s[ca]ss$/,
        use: [
          {loader:MiniCssExtractPlugin.loader}, {loader:"css-loader",options: {
            modules: true,
        },}, {loader:"sass-loader"}
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              fallback: 'file-loader',
              name: "[name].[ext]",
              //: "/img",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      inject: true,
      minify: true,
    }),
    new MiniCssExtractPlugin({
      filename: "./css/index.css",
    }),
  ],
  resolve: {
    alias: {
        assetsPath: path.resolve(__dirname, "src/assets"),
    },
},
};
