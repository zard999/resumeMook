/*
 * @Author: zyh
 * @Date: 2022-08-24 15:38:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-25 15:12:42
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseTemplate/templateOne/components/BaseInfo/index.tsx
 * @Description: 基本信息
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import '../../../styles/template-one.less';
import { useSelector } from 'react-redux';
import { selectResume } from '../../../../../slice';

function BaseInfo() {
  const { base, hobby } = useSelector(selectResume);
  return (
    <div styleName="container">
      <p styleName="title">个人信息 Basic</p>
      <ul styleName="content">
        {base?.username && <li>姓名：{base?.username}</li>}
        {base?.hometown && <li>籍贯：{base?.hometown}</li>}
        {hobby && <li>爱好：{hobby}</li>}
      </ul>
    </div>
  );
}

export default BaseInfo;
