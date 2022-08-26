/*
 * @Author: zyh
 * @Date: 2022-08-24 15:38:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-26 17:17:46
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseTemplate/templateOne/components/Project/index.tsx
 * @Description: 项目经验
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import './index.less';
import { useSelector } from 'react-redux';
import { selectResume } from '../../../../../slice';

function Project() {
  const { projectExperience } = useSelector(selectResume);
  return (
    <div styleName="content">
      <p styleName="label">项目经历 Project</p>
      <ul styleName="list">
        {projectExperience &&
          projectExperience?.length &&
          projectExperience?.map((experience: TSResume.ProjectExperience, index: number) => (
            <li styleName="flex" key={experience?.content + String(index)}>
              <div styleName="left">
                {(experience?.beginTime || experience?.endTime) && (
                  <p>
                    {experience?.beginTime && !experience?.endTime && <span>{experience?.beginTime}</span>}
                    {!experience?.beginTime && experience?.endTime && <span>{experience?.endTime}</span>}
                    {experience?.beginTime && experience?.endTime && (
                      <span>
                        {experience?.endTime} - {experience?.endTime}
                      </span>
                    )}
                  </p>
                )}
              </div>
              <div styleName="right">
                <p>
                  {experience?.projectName && !experience?.post && <span>{experience?.projectName}</span>}
                  {!experience?.projectName && experience?.post && <span>{experience?.post}</span>}
                  {experience?.projectName && experience?.post && (
                    <span>
                      {experience?.post} - {experience?.post}
                    </span>
                  )}
                </p>
              </div>
              <div styleName="text">
                <ul styleName="item-box">
                  {experience?.content &&
                    experience?.parseContent &&
                    experience?.parseContent.length > 0 &&
                    experience?.parseContent?.map((content: string, idx: number) => {
                      return (
                        <li styleName="item-content" key={idx}>
                          <span>{content}</span>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Project;
