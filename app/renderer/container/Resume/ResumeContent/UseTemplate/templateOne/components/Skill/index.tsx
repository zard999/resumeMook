/*
 * @Author: zyh
 * @Date: 2022-08-24 15:38:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-25 16:25:52
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseTemplate/templateOne/components/Skill/index.tsx
 * @Description: 技能
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import './index.less';
import { useSelector } from 'react-redux';
import { selectResume } from '../../../../../slice';

function Skill() {
  const { skill, skillList } = useSelector(selectResume);
  return (
    <div styleName="content">
      <p styleName="label">技能证书 Skill</p>
      <ul styleName="skill">
        {skill &&
          skillList?.length > 0 &&
          skillList?.map((skill: string, index: number) => (
            <li key={index} styleName="item">
              {skill}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Skill;
