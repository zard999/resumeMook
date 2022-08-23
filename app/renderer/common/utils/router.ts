/*
 * @Author: zyh
 * @Date: 2022-08-23 23:29:19
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-23 23:33:06
 * @FilePath: /resume/app/renderer/common/utils/router.ts
 * @Description: 工具
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */

/**
 * @description: 判断是否属于外部链接
 * @params (string) url：链接
 * @return {*}
 */
export function isHttpOrHttpsUrl(url: string) {
  let regRule = /(http|https):\/\/([\w.]+\/?)\S*/;
  // toLowerCase：将单词字母转换为小写
  return regRule.test(url.toLowerCase());
}
