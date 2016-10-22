'use strict';
const webpackConfig = require('./webpack.config.js');
const ENV = process.env.npm_lifecycle_event;
const JiT = ENV === 'control:jit';
webpackConfig.entry.app = './sandbox/main-aot.ts';
if (!JiT) {
  console.log('AoT: True');
}
webpackConfig.entry.vendor = [
  "reflect-metadata",
  "zone.js",
  "@angular/core",
  "@angular/platform-browser",
  "@angular/forms",
  "ts-helpers"
];
module.exports = webpackConfig;
