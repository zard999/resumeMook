/*
 * @Author: zyh
 * @Date: 2022-08-23 13:53:54
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-31 15:20:26
 * @FilePath: /resume/webpack/webpack.main.dev.js
 * @Description: 主进程的配置
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
const webpackMerge = require('webpack-merge');
const mainBaseConfig = require('./webpack.main.base.js');

const mainConfig = {
  mode: 'development', // 相当于我们在Webpack.DefinePlugin中定义process.env.NODE_ENV = 'development'
};

module.exports = webpackMerge.merge(mainBaseConfig, mainConfig);
