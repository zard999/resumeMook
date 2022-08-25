/*
 * @Author: zyh
 * @Date: 2022-08-24 15:48:00
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-25 09:16:43
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

import BaseInfo from './UseForm/BaseInfo';
import Job from './UseForm/Job';
import Contact from './UseForm/Contact';

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
          {formName === RESUME_TOOLBAR_MAPS.personal && <BaseInfo onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.workPrefer && <Job onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.contact && <Contact onClose={onClose} />}
        </>
      )}
    </MyScrollBox>
  );
}
export default ResumeContent;
