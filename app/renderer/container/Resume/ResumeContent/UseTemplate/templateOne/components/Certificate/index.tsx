/*
 * @Author: zyh
 * @Date: 2022-08-24 15:38:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-25 11:18:03
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseTemplate/templateOne/components/Certificate/index.tsx
 * @Description: 荣誉奖励
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import '../../../styles/template-one.less';
import { useSelector } from 'react-redux';
import { selectResume } from '../../../../../slice';
function Certificate() {
  const { certificate, certificateList } = useSelector(selectResume);
  return (
    <div styleName="container">
      <p styleName="title">荣誉奖励 Certificate</p>
      <ul styleName="content">
        {certificate &&
          certificateList.length > 0 &&
          certificateList.map((value: string, index: number) => <li key={value + index}>{value}</li>)}
      </ul>
    </div>
  );
}

export default Certificate;
