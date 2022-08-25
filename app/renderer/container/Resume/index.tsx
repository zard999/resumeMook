/*
 * @Author: zyh
 * @Date: 2022-08-23 18:28:37
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-24 15:53:45
 * @FilePath: /resume/app/renderer/container/Resume/index.tsx
 * @Description: 简历模块
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import fileAction from '@common/utils/file';
import { getAppPath } from '@common/utils/appPath';
import './index.less';
import ResumeHeader from './ResumeHeader';
import ResumeContent from './ResumeContent';
import ResumeToolbar from './ResumeToolbar';

function Resume() {
  // 直接写'./index.tsx'是不行的，得写绝对路径
  getAppPath().then((rootPath: string) => {
    console.log('rootPath', rootPath);
    fileAction.read(`${rootPath}app/renderer/container/resume/index.tsx`).then((data) => {
      console.log('data', data);
    });
  });
  return (
    <div styleName="container">
      <div styleName="header">
        <ResumeHeader />
      </div>
      <div styleName="content">
        <ResumeContent />
      </div>
      <div styleName="toolbar">
        <ResumeToolbar />
      </div>
    </div>
  );
}
export default Resume;
