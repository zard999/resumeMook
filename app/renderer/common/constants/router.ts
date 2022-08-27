/*
 * @Author: zyh
 * @Date: 2022-08-23 23:01:32
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-27 10:51:19
 * @FilePath: /resume/app/renderer/common/constants/router.ts
 * @Description: 路由表常量
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
// 模块路径
const ROUTER = {
  root: '/',
  resume: '/resume',
  templateList: '/templateList',
};

export default ROUTER;

export const ROUTER_KEY = {
  root: 'root',
  resume: 'resume',
  templateList: 'templateList',
};

// 入口模块，TS 定义类型必须为 TSRouter.Item
export const ROUTER_ENTRY: TSRouter.Item[] = [
  {
    url: 'https://github.com/zard999',
    key: 'intro',
    text: '介绍',
  },
  {
    url: ROUTER.resume,
    key: ROUTER_KEY.resume,
    text: '简历',
  },
  {
    url: ROUTER.templateList,
    key: ROUTER_KEY.templateList,
    text: '模版',
  },
  {
    url: 'https://github.com/zard999',
    key: 'code',
    text: '源码',
  },
];
