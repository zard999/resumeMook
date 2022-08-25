/*
 * @Author: zyh
 * @Date: 2022-08-25 09:07:26
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-25 09:22:44
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseForm/Contact/index.tsx
 * @Description: 联系方式弹框
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import MyInput from '@src/common/components/MyInput';
import MyModal from '@src/common/components/MyModal';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectResume } from '@src/container/Resume/slice';
import { IProps } from '../types';
import './index.less';

function Contact({ onClose }: IProps) {
  const { contact } = useSelector(selectResume);
  return (
    <MyModal.Dialog
      title="联系方式"
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
            <span styleName="require">*</span>电 话 ：
          </div>
          <div styleName="right">
            <MyInput onChange={(e) => {}} value={contact?.phone || ''} allowClear placeholder="请输入电话号码" />
          </div>
        </div>

        <div styleName="flex">
          <div styleName="left">
            <span styleName="require">*</span>邮 箱 ：
          </div>
          <div styleName="right">
            <MyInput onChange={(e) => {}} value={contact?.email || ''} allowClear placeholder="请输入邮箱" />
          </div>
        </div>

        <div styleName="flex">
          <div styleName="left">
            <span styleName="require" style={{ opacity: 0 }}>
              *
            </span>
            Github ：
          </div>
          <div styleName="right">
            <MyInput onChange={(e) => {}} value={contact?.github || ''} allowClear placeholder="请输入 Github 地址" />
          </div>
        </div>

        <div styleName="flex">
          <div styleName="left">
            <span styleName="require" style={{ opacity: 0 }}>
              *
            </span>
            掘 金 ：
          </div>
          <div styleName="right">
            <MyInput onChange={(e) => {}} value={contact?.juejin || ''} allowClear placeholder="掘金地址" />
          </div>
        </div>
      </div>
    </MyModal.Dialog>
  );
}
export default Contact;
