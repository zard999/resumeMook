/*
 * @Author: zyh
 * @Date: 2022-08-23 16:17:46
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-31 15:14:58
 * @FilePath: /resume/webpack/webpack.render.prod.js
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
const webpackMerge = require('webpack-merge');
const renderBaseConfig = require('./webpack.render.base');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const prodConfig = {
  mode: 'production',
  optimization: {
    minimizer: [
      // JS代码压缩
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
      }),
    ],
  },
  plugins: [
    // css代码压缩
    new OptimizeCssAssetsPlugin({}),
    // 将css提取到单独的文件中
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
  ],
  module: {
    rules: [
      // 打包css的loader
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin, 'style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
};

module.exports = webpackMerge.merge(renderBaseConfig, prodConfig);
