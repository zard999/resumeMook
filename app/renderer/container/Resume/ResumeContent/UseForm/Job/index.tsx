/*
 * @Author: zyh
 * @Date: 2022-08-24 23:13:14
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-25 09:00:49
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseForm/Job/index.tsx
 * @Description: 工作期望弹框表单
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import MyModal from '@common/components/MyModal';
import MyInput from '@common/components/MyInput';
import { useSelector } from 'react-redux';
import './index.less';
import { selectResume } from '@src/container/Resume/slice';
import { IProps } from '../types';

function Job({ onClose }: IProps) {
  const { work } = useSelector(selectResume);
  return (
    <MyModal.Dialog
      title="工作期望"
      showFooter={false}
      config={{
        cancelBtn: {
          callback: onClose,
        },
      }}
    >
      <div styleName="form">
        <div styleName="flex">
          <div styleName="left">
            <span styleName="require">*</span>职 位 ：
          </div>
          <div styleName="right">
            <MyInput onChange={(e) => {}} value={work?.job || ''} placeholder="求职岗位" allowClear={true} />
          </div>
        </div>
        <div styleName="flex">
          <div styleName="left">
            <span styleName="require">*</span>城 市 ：
          </div>
          <div styleName="right">
            <MyInput onChange={(e) => {}} value={work?.city || ''} placeholder="请输入意愿城市" allowClear={true} />
            <div styleName="tips"> * 多个地点以｜分割</div>
          </div>
        </div>
      </div>
    </MyModal.Dialog>
  );
}
export default Job;
