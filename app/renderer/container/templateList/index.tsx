/*
 * @Author: zyh
 * @Date: 2022-08-27 10:44:26
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-29 10:35:38
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
import MyReactSize from '@common/components/MyRectSize';

function TemplateList() {
  return (
    <div styleName="container">
      <Header />
      <div styleName="content">
        <MyReactSize>
          <MyReactSize.Left>
            <Navigation />
          </MyReactSize.Left>
          <MyReactSize.Right>
            <StaticResume />
          </MyReactSize.Right>
        </MyReactSize>
      </div>
    </div>
  );
}
export default TemplateList;
