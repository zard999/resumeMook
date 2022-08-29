/*
 * @Author: zyh
 * @Date: 2022-08-26 18:47:15
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-29 10:34:00
 * @FilePath: /resume/app/renderer/common/utils/index.ts
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
// 创建uid
export function createUID() {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'
    .replace(/[xy]/g, (c) => {
      let r = (Math.random() * 16) | 0;
      let v = c === 'x' ? r : (r & 3) | 8;
      return v.toString(16);
    })
    .toUpperCase();
}

// 将字符串数字转成整型数字
export function transformStringToNumber(value: string): number {
  return Number(value);
}

// 剔除px
export function reducePX(value: string | number | undefined): string {
  if (!value) return '';
  const _value = String(value);
  return _value.replace('px', '');
}
