/*
 * @Author: zyh
 * @Date: 2022-08-31 15:01:56
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-31 15:21:48
 * @FilePath: /resume/webpack/webpack.render.base.js
 * @Description: webpack的render基础配置文件
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

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
  entry: {
    // 👇 对应渲染进程的 app.jsx 入口文件
    index: path.resolve(__dirname, '../app/renderer/app.tsx'),
    // 👇 定义应用设置的入口
    setting: path.resolve(__dirname, '../app/renderer/windowPages/setting/app.tsx'),
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    // 不能写太多，每次引入文件时，都要通过fs文件系统查找匹配，越多，调用底层次数越多，更耗时，webpack编译速度更慢
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@assets': path.join(__dirname, '../', 'assets/'),
      '@src': path.join(__dirname, '../', 'app/renderer'),
      '@common': path.join(__dirname, '../', 'app/renderer/common'),
      '@store': path.join(__dirname, '../', 'app/renderer/store'),
    },
  },
  target: 'electron-renderer', // 针对渲染进程
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        // loader: 'HappyPack/loader?id=visResumeMookHappyPack',
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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 👇 以此文件为模版，自动生成 HTML
      template: path.resolve(__dirname, '../app/renderer/index.html'),
      filename: path.resolve(__dirname, '../dist/index.html'),
      chunks: ['index'],
    }),
    // 定义应用设置的HtmlWebpackPlugin
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../app/renderer/windowPages/setting/index.html'),
      filename: path.resolve(__dirname, '../dist/setting.html'),
      chunks: ['setting'],
    }),
    // 通过该插件实现资源文件的拷贝
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../assets'),
          to: path.resolve(__dirname, '../dist/assets'),
        },
        // 取消拷贝，因为文件夹现在是代码创建的
        // {
        //   from: path.resolve(__dirname, '../appConfig'),
        //   to: path.resolve(__dirname, '../dist/appConfig'),
        // },
      ],
    }),
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '../dist/dll/reacts.dll.js'),
    }),
  ],
};
