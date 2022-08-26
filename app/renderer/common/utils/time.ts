/*
 * @Author: zyh
 * @Date: 2022-08-26 09:49:12
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-26 09:55:29
 * @FilePath: /resume/app/renderer/common/utils/time.ts
 * @Description: 处理时间
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
/**
 * @description: 处理时间戳变成类似 2022/08/26 这样的字符串
 * @param {number} num 时间戳整数
 * @param {*} unit 符号
 * @return {*}
 */
export function intToDateString(num: number, unit = '/'): string {
  let date;
  if (!num) {
    date = new Date();
  } else {
    date = new Date(num);
  }
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}${unit}${month >= 10 ? month : '0' + month}${unit}${day >= 10 ? day : '0' + day}`;
}

/**
 * @description: 时间戳变成类似14:28:19这样的字符串
 * @param {number} num 时间戳整数
 * @return {*}
 */
export function intToTimeString(num?: number): string {
  let date;
  if (!num) {
    date = new Date();
  } else {
    date = new Date(num);
  }
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${hour >= 10 ? hour : '0' + hour}:${minute >= 10 ? minute : '0' + minute}:${
    second >= 10 ? second : '0' + second
  }
    `;
}

/**
 * @description: 时间戳变成类似2018/01/12 12:32:21这样的字符串
 * @param {number} num 时间戳整数
 * @param {*} unit 符号
 * @return {*}
 */
export function formatToString(num: number | undefined, unit = '/') {
  if (!num) return '';
  const date1 = intToDateString(num, unit);
  const date2 = intToTimeString(num);
  return `${date1} ${date2}`;
}
