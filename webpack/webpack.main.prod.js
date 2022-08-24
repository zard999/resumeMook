/*
 * @Author: zyh
 * @Date: 2022-08-23 16:14:32
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-23 17:03:38
 * @FilePath: /resume/webpack/webpack.main.prod.js
 * @Description: 生产环境主进程的配置
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
const path = require('path');
const baseConfig = require('./webpack.base');
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');

const prodConfig = {
  entry: path.resolve(__dirname, '../app/main/electron.ts'),
  target: 'electron-main',
  output: {
    filename: 'electron.js',
    path: path.resolve(__dirname, '../dist'),
  },
  devtool: 'inline-source-map',
  mode: 'production',
  plugins: [
    // 👇 添加这个，用于打包后的主进程中正确获取__dirname
    new webpack.DefinePlugin({
      __dirname: '__dirname',
    }),
  ],
};

module.exports = webpackMerge.merge(baseConfig, prodConfig);
