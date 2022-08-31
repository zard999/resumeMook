/*
 * @Author: zyh
 * @Date: 2022-08-23 16:14:32
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-31 15:17:23
 * @FilePath: /resume/webpack/webpack.main.prod.js
 * @Description: 生产环境主进程的配置
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
const webpackMerge = require('webpack-merge');
const mainBaseConfig = require('./webpack.main.base.js');

const prodConfig = {
  mode: 'production',
};

module.exports = webpackMerge.merge(mainBaseConfig, prodConfig);
