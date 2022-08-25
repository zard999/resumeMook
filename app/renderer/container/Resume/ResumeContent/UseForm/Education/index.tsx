/*
 * @Author: zyh
 * @Date: 2022-08-25 09:58:09
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-25 10:01:16
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseForm/Education/index.tsx
 * @Description: 教育信息
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import MyModal from '@common/components/MyModal';
import MyInput from '@common/components/MyInput';
import { IProps } from '../types';
import { useSelector } from 'react-redux';
import './index.less';
import { selectResume } from '@src/container/Resume/slice';

function Eduction({ onClose }: IProps) {
  const { base } = useSelector(selectResume);
  return (
    <MyModal.Dialog
      title="教育信息"
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
            <span styleName="require">*</span>学 校 ：
          </div>
          <div styleName="right">
            <MyInput onChange={(e) => {}} value={base?.school || ''} placeholder="请输入贵校" allowClear={true} />
          </div>
        </div>
        <div styleName="flex">
          <div styleName="left">
            <span styleName="require">*</span>专 业 ：
          </div>
          <div styleName="right">
            <MyInput onChange={(e) => {}} value={base?.major || ''} placeholder="请输入专业" allowClear={true} />
          </div>
        </div>
        <div styleName="flex">
          <div styleName="left">
            <span styleName="require">*</span>学 位 ：
          </div>
          <div styleName="right">
            <MyInput
              onChange={(e) => {}}
              value={base?.degree || ''}
              placeholder="学士？硕士？博士？"
              allowClear={true}
            />
          </div>
        </div>
        <div styleName="flex">
          <div styleName="left">
            <span styleName="require">*</span>学 年 ：
          </div>
          <div styleName="right">
            <MyInput
              onChange={(e) => {
                const nextTime = {
                  ...base?.onSchoolTime,
                  beginTime: e.target.value,
                };
              }}
              value={base?.onSchoolTime?.beginTime || ''}
              placeholder="2015.09.01"
              allowClear={true}
              style={{ width: 300 }}
            />
            <span styleName="line">-</span>
            <MyInput
              onChange={(e) => {
                const nextTime = {
                  ...base?.onSchoolTime,
                  endTime: e.target.value,
                };
              }}
              value={base?.onSchoolTime?.endTime || ''}
              placeholder="2015.06.30"
              style={{ width: 300 }}
              allowClear={true}
            />
          </div>
        </div>
      </div>
    </MyModal.Dialog>
  );
}
export default Eduction;
