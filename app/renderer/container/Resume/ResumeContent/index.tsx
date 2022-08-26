/*
 * @Author: zyh
 * @Date: 2022-08-24 15:48:00
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-25 18:05:29
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React, { useEffect, useState } from 'react';
import './index.less';
import * as UseTemplateList from './UseTemplate';
import MyScrollBox from '@src/common/components/MyScrollBox';
import Messager, { MESSAGE_EVENT_NAME_MAPS } from '@common/message';
import { RESUME_TOOLBAR_MAPS } from '@common/constants/resume';

import BaseInfoForm from './UseForm/BaseInfo';
import JobForm from './UseForm/Job';
import ContactForm from './UseForm/Contact';
import EductionForm from './UseForm/Education';
import CertificateForm from './UseForm/Certificate';
import SkillForm from './UseForm/Skill';
import EvaluationForm from './UseForm/Evaluation';
import ProjectExperienceForm from './UseForm/ProjectExperience';

function ResumeContent() {
  const HEADER_ACTION_HEIGHT = 92;
  const height = document.body.clientHeight;

  const [isShowFormModal, setIsShowFormModal] = useState(false);
  const [formName, setFormName] = useState('');

  useEffect(() => {
    document.addEventListener(MESSAGE_EVENT_NAME_MAPS.OPEN_FORM_MODAL, onReceive);
    return () => document.removeEventListener(MESSAGE_EVENT_NAME_MAPS.OPEN_FORM_MODAL, onReceive);
  }, []);

  // 订阅
  const onReceive = (e: any) => {
    Messager.receive(e, (data: any) => {
      setIsShowFormModal(true);
      setFormName(data?.form_name);
      console.log('data', data);
    });
  };

  // 关闭
  const onClose = () => {
    setIsShowFormModal(false);
    setFormName('');
  };
  return (
    <MyScrollBox maxHeight={height - HEADER_ACTION_HEIGHT}>
      <UseTemplateList.TemplateOne />
      {isShowFormModal && (
        <>
          {formName === RESUME_TOOLBAR_MAPS.personal && <BaseInfoForm onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.workPrefer && <JobForm onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.contact && <ContactForm onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.education && <EductionForm onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.certificate && <CertificateForm onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.skill && <SkillForm onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.evaluation && <EvaluationForm onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.projectExperience && <ProjectExperienceForm onClose={onClose} />}
        </>
      )}
    </MyScrollBox>
  );
}
export default ResumeContent;
