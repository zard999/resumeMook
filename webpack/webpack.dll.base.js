/*
 * @Author: zyh
 * @Date: 2022-08-31 14:43:29
 * @LastEditors: zyh
 * @LastEditTime: 2022-09-21 17:17:34
 * @FilePath: /resumeMook/webpack/webpack.dll.base.js
 * @Description: 将第三方包打成一个文件：因为每次打包构建，这些第三方包又要打一次，比较耗时
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
const path = require('path');
const webpack = require('webpack');

/** @type {import("webpack").Configuration} */
module.exports = {
  entry: {
    // 我这里将lodash也放在reacts中，实际上是可以拆分的
    reacts: ['react', 'react-dom', 'redux', 'react-redux', 'lodash'],
  },
  output: {
    library: '[name]',
    filename: '[name].dll.js',
    path: path.resolve(__dirname, '../dist/dll'),
  },
  plugins: [
    // 👇 定义全局变量
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, '../dist/dll/[name].manifest.json'),
    }),
  ],
};
