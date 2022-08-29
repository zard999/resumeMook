/*
 * @Author: zyh
 * @Date: 2022-08-23 18:28:37
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-29 09:15:27
 * @FilePath: /resume/app/renderer/container/Resume/index.tsx
 * @Description: 简历模块
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import './index.less';
import ResumeHeader from './ResumeHeader';
import ResumeContent from './ResumeContent';
import ResumeToolbar from './ResumeToolbar';

function Resume() {
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
