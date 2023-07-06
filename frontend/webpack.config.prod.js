const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
module.exports = {
  mode: "production",
  devtool: "souce-map",
  entry: "./src/index.js",
  output: {
    filename: "./js/[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
        options: {
          outputPath: "./img",
        },
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
            loader: "file-loader",
            options: {
              name(resourcePath) {
                const willRemovePath = path.resolve(__dirname, "src");
                const parseDir = path.resolve(path.dirname(resourcePath));
                const exportPath = parseDir
                    .replace(willRemovePath, "")
                    .replace(/^[\\/]/, "")
                    .replace(/\\/g, "/");
                return `${exportPath}/[name].[ext]`;
            },
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              disable: false ,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      assetsPath: path.resolve(__dirname, "src/img"),
    },
},
  plugins: [
  
    new webpack.HotModuleReplacementPlugin(),
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
};
