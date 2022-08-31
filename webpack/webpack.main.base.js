/*
 * @Author: zyh
 * @Date: 2022-08-31 15:16:18
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-31 15:18:46
 * @FilePath: /resume/webpack/webpack.main.base.js
 * @Description: webpack的render基础配置文件
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
const path = require('path');
const webpack = require('webpack');

/**
 * @description:
 * entry：定义入口文件
 * target：可以让webpack构建出不同运行环境的代码
 * output：定义出口文件
 * @return {*}
 */
module.exports = {
  entry: path.resolve(__dirname, '../app/main/electron.ts'),
  output: {
    filename: 'electron.js',
    path: path.resolve(__dirname, '../dist'),
  },
  target: 'electron-main',
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@common': path.join(__dirname, '../', 'app/renderer/common'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    // 用于打包后的主进程中正确获取__dirname
    new webpack.DefinePlugin({
      __dirname: '__dirname',
    }),
  ],
};
