const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ENV = process.env.npm_lifecycle_event;
const JiT = ENV === 'control:jit';
if (JiT) {
  console.log('AoT: False');
}

const basePlugins = [
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
  }),
  new webpack.optimize.CommonsChunkPlugin("vendor"),
  new HtmlWebpackPlugin({
    template: "./sandbox/index.html"
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
    app: "./sandbox/main.ts",
    vendor: [
      "reflect-metadata",
      "zone.js",
      "@angular/core",
      "@angular/compiler",
      "@angular/platform-browser-dynamic",
      "ts-helpers"
    ]
  },
  output: {
    path: __dirname + "/../dist",
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
