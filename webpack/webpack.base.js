/*
 * @Author: zyh
 * @Date: 2022-08-23 13:41:34
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-31 15:04:33
 * @FilePath: /resume/webpack/webpack.base.js
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // 处理图片
      {
        test: /\.(jpg|png|jpeg|gif)$/,
        use: [
          {
            // loader: 'file-loader',
            loader: 'url-loader',
            options: {
              /**
               * 当图片小于2kb时，图片会自动转成base64格式，
               * 以字符串形式一起打包到js文件中，从而减少图片请求的数量，
               * 而大于2kb的图片，则是file-loader处理
               * url-loader是基于file-loader之上的
               * 缺点：1. 增大了打包后的js体积。2. 这些图片无法做到按需加载
               */
              limit: 2048,
              name: '[name]_[hash].[ext]',
              outputPath: 'images/',
              // esModule: false,
            },
          },
        ],
      },
    ],
  },
  // plugins: [new CleanWebpackPlugin()], //打包的时候注释掉
};
