/*
 * @Author: zyh
 * @Date: 2022-08-24 15:38:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-25 13:46:08
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseTemplate/templateOne/components/Work/index.tsx
 * @Description: 工作经历
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import './index.less';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectResume } from '../../../../../slice';

function Work() {
  const { workExperience } = useSelector(selectResume);
  return (
    <div styleName="content">
      <p styleName="label">工作经历 Post</p>
      <ul styleName="list">
        {workExperience &&
          workExperience?.length &&
          workExperience?.map((experience: TSResume.WorkExperience, index: number) => (
            <li styleName="flex">
              <div styleName="left">
                <p>
                  {experience?.beginTime}-{experience?.endTime}
                </p>
                <p>{experience?.post}</p>
              </div>
              <div styleName="right">
                <p>{experience?.department}</p>
                <p>{experience?.content}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Work;
