/*
 * @Author: zyh
 * @Date: 2022-08-24 15:38:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-09-15 09:07:11
 * @FilePath: /resumeMook/app/renderer/container/Resume/ResumeContent/UseTemplate/templateOne/index.tsx
 * @Description: 模板1
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import './index.less';
import Avatar from './components/Avatar';
import BaseInfo from './components/BaseInfo';
import Contact from './components/Contact';
import Job from './components/Job';
import Certificate from './components/Certificate';
import Synopsis from './components/Synopsis';
import Skill from './components/Skill';
import Post from './components/Post';
import Project from './components/Project';
import Work from './components/Work';
import Education from './components/Job/Education';
import { useAppSelector } from '@store/hooks';
import { selectResumeToolbarKeys } from '@src/container/Resume/slice';
import { RESUME_TOOLBAR_MAPS } from '@common/constants/resume';
import { selectResume } from '@src/container/Resume/slice';

function TemplateOne() {
  const resumeToolbarKeys = useAppSelector(selectResumeToolbarKeys);
  const { base } = useAppSelector(selectResume);
  // 必须带有id，以方便导出时获取DOM元素内容
  return (
    <div styleName="a4-box">
      <div styleName="flex container" id="visPdf">
        {/* 左侧 */}
        <div styleName="left">
          <div styleName="avatar">
            <Avatar />
          </div>
          <div styleName="fillColor" />
          <div styleName="baseData">
            <BaseInfo />
            {resumeToolbarKeys.includes(RESUME_TOOLBAR_MAPS.education) && <Education />}
            {resumeToolbarKeys.includes(RESUME_TOOLBAR_MAPS.contact) && <Contact />}
            {resumeToolbarKeys.includes(RESUME_TOOLBAR_MAPS.workPrefer) && <Job />}
            {resumeToolbarKeys.includes(RESUME_TOOLBAR_MAPS.certificate) && <Certificate />}
          </div>
        </div>
        {/* 内容 */}
        <div styleName="center">
          {(resumeToolbarKeys.includes(RESUME_TOOLBAR_MAPS.evaluation) || base?.username) && <Synopsis />}
          <div styleName="listData">
            {resumeToolbarKeys.includes(RESUME_TOOLBAR_MAPS.skill) && <Skill />}
            {resumeToolbarKeys.includes(RESUME_TOOLBAR_MAPS.schoolExperience) && <Post />}
            {resumeToolbarKeys.includes(RESUME_TOOLBAR_MAPS.projectExperience) && <Project />}
            {resumeToolbarKeys.includes(RESUME_TOOLBAR_MAPS.workExperience) && <Work />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateOne;
