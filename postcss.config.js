/*
 * @Author: zyh
 * @Date: 2022-08-23 15:35:29
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-23 15:35:35
 * @FilePath: /resume/postcss.config.js
 * @Description: 解决引入less报错的配置
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['> 0.5%', 'last 5 versions'],
    },
  },
};
