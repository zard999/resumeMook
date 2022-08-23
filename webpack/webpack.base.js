/*
 * @Author: zyh
 * @Date: 2022-08-23 13:41:34
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-23 13:53:07
 * @FilePath: /resume/webpack/webpack.base.js
 * @Description: webpack配置文件
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
const { path } = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 每次打包自动清除上一次的dist文件
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
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@src": path.join(__dirname, "../", "app/renderer"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
