/*
 * @Author: zyh
 * @Date: 2022-08-23 18:28:37
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-24 10:39:36
 * @FilePath: /resume/app/renderer/container/Resume/index.tsx
 * @Description: 简历模块
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import fileAction from '@common/utils/file';
import { getAppPath } from '@common/utils/appPath';

function Resume() {
  // 直接写'./index.tsx'是不行的，得写绝对路径
  getAppPath().then((rootPath: string) => {
    console.log('rootPath', rootPath);
    fileAction.read(`${rootPath}app/renderer/container/resume/index.tsx`).then((data) => {
      console.log('data', data);
    });
  });
  return <div>1</div>;
}
export default Resume;
