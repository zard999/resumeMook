/*
 * @Author: zyh
 * @Date: 2022-08-24 15:38:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-25 15:04:17
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseTemplate/templateOne/components/Education/index.tsx
 * @Description: 基本信息
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import '../../../styles/template-one.less';
import { useSelector } from 'react-redux';
import { selectResume } from '../../../../../slice';

function Education() {
  const { education } = useSelector(selectResume);
  return (
    <div styleName="container">
      <p styleName="title">教育信息 Education</p>
      <ul styleName="content">
        {education?.school && <li>院校：{education?.school}</li>}
        {education?.major && <li>专业：{education?.major}</li>}
        {education?.degree && <li>学历：{education?.degree}</li>}
        {education?.onSchoolTime && education?.onSchoolTime?.beginTime && education?.onSchoolTime?.endTime && (
          <li>
            学年：{education?.onSchoolTime?.beginTime} - {education?.onSchoolTime?.endTime}
          </li>
        )}
      </ul>
    </div>
  );
}

export default Education;
