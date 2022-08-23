/*
 * @Author: zyh
 * @Date: 2022-08-23 13:59:34
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-23 15:25:31
 * @FilePath: /resume/webpack/webpack.render.dev.js
 * @Description: 渲染进程开发配置
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
const path = require('path');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devConfig = {
  mode: 'development',
  entry: {
    // 👇 对应渲染进程的 app.jsx 入口文件
    index: path.resolve(__dirname, '../app/renderer/app.tsx'),
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
  },
  target: 'electron-renderer', // 针对渲染进程
  devtool: 'inline-source-map',
  // 本地开发配置
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    host: '127.0.0.1', // webpack-dev-server启动时要指定ip，不能直接通过localhost启动，不指定会报错
    port: 7001, // 启动端口为 7001 的服务
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 👇 以此文件为模版，自动生成 HTML
      template: path.resolve(__dirname, '../app/renderer/index.html'),
      filename: path.resolve(__dirname, '../dist/index.html'),
      chunks: ['index'],
    }),
  ],
};

module.exports = webpackMerge.merge(baseConfig, devConfig);
