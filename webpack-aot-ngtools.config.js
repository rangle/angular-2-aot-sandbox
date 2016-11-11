'use strict';
const webpackConfig = require('./webpack.config.js');
const AotPlugin =  require('@ngtools/webpack').AotPlugin;
const ENV = process.env.npm_lifecycle_event;
const JiT = ENV === 'control:jit';
webpackConfig.entry.app = './sandbox/main.ts';
if (!JiT) {
  console.log('AoT: True');
  console.log('ngc: False');
}
webpackConfig.entry.vendor = [
  "reflect-metadata",
  "zone.js",
  "@angular/core",
  "@angular/platform-browser",
  "@angular/forms",
  "ts-helpers"
];

webpackConfig.module.rules[0] = {
  test: /.ts$/,
  loader: "@ngtools/webpack"
}
webpackConfig.plugins = webpackConfig.plugins.concat([
  new AotPlugin({
    tsConfigPath: './tsconfig.json',
    entryModule: './sandbox/app.module#AppModule',
  }),
]);
module.exports = webpackConfig;
