/*
 * @Author: zyh
 * @Date: 2022-08-24 15:38:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-24 15:41:38
 * @FilePath: /resume/app/renderer/container/templates/templateOne/components/Job/index.tsx
 * @Description: 求职意向
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import '../../../styles/template-one.less';
import './index.less';

function Job() {
  return (
    <div styleName="container">
      <p styleName="title">求职意向 Work</p>
      <ul styleName="content">
        <li>职位：前端工程师</li>
        <li>城市：广州｜成都｜海口</li>
      </ul>
    </div>
  );
}

export default Job;
