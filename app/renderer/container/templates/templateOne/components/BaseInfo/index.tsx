/*
 * @Author: zyh
 * @Date: 2022-08-24 15:38:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-30 18:04:58
 * @FilePath: /resume/app/renderer/container/templates/templateOne/components/BaseInfo/index.tsx
 * @Description: 基本信息
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import '../../../styles/template-one.less';

function BaseInfo() {
  return (
    <div styleName="container">
      <p styleName="title">基本信息 Basic</p>
      <ul styleName="content">
        <li>院校：湖北瞎说大学</li>
        <li>专业：软件工程</li>
        <li>学历：本科</li>
        <li>学年：2020.09 - 2022.06</li>
        <li>籍贯：湖北·孝感</li>
      </ul>
    </div>
  );
}

export default BaseInfo;
