const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const basePlugins = [
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
  }),
  new webpack.optimize.CommonsChunkPlugin("vendor"),
  new HtmlWebpackPlugin({
    template: "./control/index.html"
  }),
  new webpack.ContextReplacementPlugin(
    /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
    __dirname
  )
];

const prodPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    mangle: {
      keep_fnames: true,
    },
    compress: {
      warnings: false,
    },
  })
];

const plugins = basePlugins
  .concat((process.env.NODE_ENV === 'production') ? prodPlugins: []);

module.exports = {
  entry: {
    app: "./control/main.ts",
    vendor: [
      "reflect-metadata",
      "zone.js",
      "@angular/core",
      "@angular/compiler",
      "@angular/common",
      "@angular/platform-browser",
      "@angular/platform-browser-dynamic",
      "ts-helpers",
      "rxjs"
    ]
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].[hash].js"
  },
  resolve: {
    extensions: [".js", ".ts"]
  },
  module: {
    rules: [
      { test: /.ts$/, loader: "awesome-typescript-loader" },
    ]
  },
  plugins: plugins
};
