/*
 * @Author: zyh
 * @Date: 2022-08-23 23:07:06
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-23 23:09:05
 * @FilePath: /resume/app/renderer/common/types/router.d.ts
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
// 路由类型约束
declare namespace TSRouter {
  export interface Item {
    url: string; // 路由跳转链接
    key: string; // 关键词
    text: string; // 文本
  }
}
