/*
 * @Author: zyh
 * @Date: 2022-08-23 13:53:54
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-23 15:23:57
 * @FilePath: /resume/webpack/webpack.main.dev.js
 * @Description: 主进程的配置
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
const path = require('path');
const baseConfig = require('./webpack.base.js');
const webpackMerge = require('webpack-merge');
/**
 * @description:
 * entry：定义入口文件
 * target：可以让webpack构建出不同运行环境的代码
 * output：定义出口文件
 * @return {*}
 */
const mainConfig = {
  entry: path.resolve(__dirname, '../app/main/electron.ts'),
  target: 'electron-main', // 针对主进程
  output: {
    filename: 'electron.js',
    path: path.resolve(__dirname, '../dist'),
  },
  devtool: 'inline-source-map',
  mode: 'development',
};

module.exports = webpackMerge.merge(baseConfig, mainConfig);
