/*
 * @Author: zyh
 * @Date: 2022-08-23 13:41:34
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-31 11:41:21
 * @FilePath: /resume/webpack/webpack.base.js
 * @Description: webpack配置文件
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 每次打包自动清除上一次的dist文件
/**
 * @description:
 * resolve：配置webpack如何寻找模块对应的文件
 *      extensions：表示在导入语句中没带文件后缀时，webpack会自动带上后缀去尝试访问文件是否存在
 *      alias：别名
 * babel-loader：当匹配到 /\.(js|jsx|ts|tsx)$/ 文件时，使用此loader处理
 * @return {*}
 */
module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@assets': path.join(__dirname, '../', 'assets/'),
      '@src': path.join(__dirname, '../', 'app/renderer'),
      '@common': path.join(__dirname, '../', 'app/renderer/common'),
      '@store': path.join(__dirname, '../', 'app/renderer/store'),
    },
  },
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
