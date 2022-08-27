/*
 * @Author: zyh
 * @Date: 2022-08-27 11:35:47
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-27 11:40:48
 * @FilePath: /resume/app/renderer/container/templateList/StaticResume/index.tsx
 * @Description: 静态模版组件
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import './index.less';
import MyScrollBox from '@common/components/MyScrollBox';
import * as TemplateList from '@src/container/templates';
import Footer from '../Footer';

function StaticResume() {
  const HEADER_HEIGHT = 76; // 距离头部距离
  const height = document.body.clientHeight;
  return (
    <div styleName="container">
      <MyScrollBox maxHeight={height - HEADER_HEIGHT}>
        <TemplateList.TemplateOne />
        <Footer />
      </MyScrollBox>
    </div>
  );
}
export default StaticResume;
