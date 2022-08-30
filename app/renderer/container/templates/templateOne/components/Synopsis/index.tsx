/*
 * @Author: zyh
 * @Date: 2022-08-24 15:38:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-30 17:59:06
 * @FilePath: /resume/app/renderer/container/templates/templateOne/components/Synopsis/index.tsx
 * @Description: 简单介绍
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import './index.less';

function Synopsis() {
  return (
    <div styleName="content">
      <p styleName="name">张永辉</p>
      <p styleName="job">前端工程师</p>
      <p styleName="summary">{['切图工程师', '投身开源'].join('，')}</p>
    </div>
  );
}

export default Synopsis;
