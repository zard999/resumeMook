/*
 * @Author: zyh
 * @Date: 2022-08-23 23:29:19
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-30 11:03:50
 * @FilePath: /resume/app/renderer/common/utils/router.ts
 * @Description: 路由工具
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { compile } from 'path-to-regexp/dist/index.js';

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

/**
 * @description: 合并路由参数
 * @param {string} route
 * @param {object} params
 * compile：compile函数将返回一个用于将参数转换为有效路径的函数
 * @return {*}
 */
export function compilePath(route: string, params?: { [key: string]: any }) {
  const toPath = compile(route, { encode: encodeURIComponent });
  return toPath(params);
}
