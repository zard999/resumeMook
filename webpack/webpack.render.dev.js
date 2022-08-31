/*
 * @Author: zyh
 * @Date: 2022-08-23 13:59:34
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-31 15:12:19
 * @FilePath: /resume/webpack/webpack.render.dev.js
 * @Description: 渲染进程开发配置
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
const path = require('path');
const webpackMerge = require('webpack-merge');
const renderBaseConfig = require('./webpack.render.base');

const devConfig = {
  mode: 'development',
  // 本地开发配置
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    host: '127.0.0.1', // webpack-dev-server启动时要指定ip，不能直接通过localhost启动，不指定会报错
    port: 7001, // 启动端口为 7001 的服务
    hot: true,
  },
};

module.exports = webpackMerge.merge(renderBaseConfig, devConfig);
