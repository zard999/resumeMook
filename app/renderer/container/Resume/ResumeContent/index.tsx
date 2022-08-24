/*
 * @Author: zyh
 * @Date: 2022-08-24 15:48:00
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-24 23:09:31
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React, { useEffect } from 'react';
import './index.less';
import * as UseTemplateList from './UseTemplate';
import MyScrollBox from '@src/common/components/MyScrollBox';
import Messager, { MESSAGE_EVENT_NAME_MAPS } from '@common/message';

function ResumeContent() {
  const HEADER_ACTION_HEIGHT = 92;
  const height = document.body.clientHeight;

  useEffect(() => {
    document.addEventListener(MESSAGE_EVENT_NAME_MAPS.OPEN_FORM_MODAL, onReceive);
    return () => document.removeEventListener(MESSAGE_EVENT_NAME_MAPS.OPEN_FORM_MODAL, onReceive);
  }, []);

  // 订阅
  const onReceive = (e: any) => {
    Messager.receive(e, (data: any) => {
      console.log('订阅到的消息为', data);
    });
  };
  return (
    <MyScrollBox maxHeight={height - HEADER_ACTION_HEIGHT}>
      <UseTemplateList.TemplateOne />
    </MyScrollBox>
  );
}
export default ResumeContent;
