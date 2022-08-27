/*
 * @Author: zyh
 * @Date: 2022-08-27 10:44:26
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-27 12:06:28
 * @FilePath: /resume/app/renderer/container/templateList/index.tsx
 * @Description: 模版列表页面
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import './index.less';
import Header from './Header';
import Navigation from './Navigation';
import StaticResume from './StaticResume';

function TemplateList() {
  return (
    <div styleName="container">
      <Header />
      <div styleName="content">
        <Navigation />
        <StaticResume />
      </div>
    </div>
  );
}
export default TemplateList;
