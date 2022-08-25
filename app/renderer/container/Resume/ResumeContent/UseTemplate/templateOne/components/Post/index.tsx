/*
 * @Author: zyh
 * @Date: 2022-08-24 15:38:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-25 13:47:55
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseTemplate/templateOne/components/Post/index.tsx
 * @Description: 在校经历
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import './index.less';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectResume } from '../../../../../slice';

function Post() {
  const { schoolExperience } = useSelector(selectResume);
  return (
    <div styleName="content">
      <p styleName="label">在校经历 Post</p>
      <ul styleName="list">
        {schoolExperience &&
          schoolExperience?.length > 0 &&
          schoolExperience.map((experience: TSResume.SchoolExperience, index: number) => (
            <li styleName="flex" key={experience?.post + String(index)}>
              <div styleName="left">
                <p>{experience?.beginTime + '-' + experience?.endTime}</p>
                <p>{experience.post}</p>
              </div>
              <div styleName="right">
                <p>{experience?.department}</p>
                <p>{experience?.parseContent}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Post;
