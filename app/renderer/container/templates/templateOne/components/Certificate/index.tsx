/*
 * @Author: zyh
 * @Date: 2022-08-24 15:38:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-24 15:40:08
 * @FilePath: /resume/app/renderer/container/templates/templateOne/components/Certificate/index.tsx
 * @Description: 荣誉奖励
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import '../../../styles/template-one.less';

function Certificate() {
  return (
    <div styleName="container">
      <p styleName="title">荣誉奖励 Certificate</p>
      <ul styleName="content">
        <li>全国英语四级证书</li>
        <li>全国计算机二级证书</li>
        <li>湖南瞎说大学自封骰王</li>
        <li>广州第一届酒王大赛参与奖</li>
      </ul>
    </div>
  );
}

export default Certificate;
