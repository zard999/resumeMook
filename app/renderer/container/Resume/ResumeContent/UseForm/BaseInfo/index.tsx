/*
 * @Author: zyh
 * @Date: 2022-08-24 23:12:50
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-25 09:05:13
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseForm/BaseInfo/index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import MyModal from '@common/components/MyModal';
import MyInput from '@common/components/MyInput';
import { useSelector } from 'react-redux';
import { selectResume } from '@src/container/Resume/slice';
import './index.less';
import { IProps } from '../types';

function BaseInfo({ onClose }: IProps) {
  const { base, hobby } = useSelector(selectResume);
  return (
    <MyModal.Dialog
      title="个人信息"
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
            <span styleName="require">*</span>姓 名 ：
          </div>
          <div styleName="right">
            <MyInput onChange={(e) => {}} value={base?.username || ''} placeholder="请输入姓名" allowClear={true} />
          </div>
        </div>

        <div styleName="flex">
          <div styleName="left">
            <span styleName="require">*</span>院 校 ：
          </div>
          <div styleName="right">
            <MyInput onChange={(e) => {}} value={base?.school || ''} placeholder="请输入籍贯" allowClear={true} />
          </div>
        </div>

        <div styleName="flex">
          <div styleName="left">
            <span styleName="require">*</span>籍 贯 ：
          </div>
          <div styleName="right">
            <MyInput onChange={(e) => {}} value={base?.hometown || ''} placeholder="请输入籍贯" allowClear={true} />
          </div>
        </div>

        <div styleName="flex">
          <div styleName="left">
            <span styleName="require" style={{ opacity: 0 }}>
              *
            </span>
            学 历 ：
          </div>
          <div styleName="right">
            <MyInput onChange={(e) => {}} value={base?.degree || ''} placeholder="请输入籍贯" allowClear={true} />
          </div>
        </div>

        <div styleName="flex">
          <div styleName="left">
            <span styleName="require" style={{ opacity: 0 }}>
              *
            </span>
            专 业 ：
          </div>
          <div styleName="right">
            <MyInput onChange={(e) => {}} value={base?.major || ''} placeholder="请输入籍贯" allowClear={true} />
          </div>
        </div>

        <div styleName="flex">
          <div styleName="left">
            <span styleName="require" style={{ opacity: 0 }}>
              *
            </span>
            学 年 ：
          </div>
          <div styleName="right">
            <MyInput
              onChange={(e) => {}}
              value={base?.onSchoolTime?.beginTime + ' - ' + base?.onSchoolTime?.endTime || ''}
              placeholder="请输入籍贯"
              allowClear={true}
            />
            <div styleName="tips"> * 学年请用 - 分割</div>
          </div>
        </div>

        <div styleName="flex">
          <div styleName="left">
            <span styleName="require" style={{ opacity: 0 }}>
              *
            </span>
            爱 好 ：
          </div>
          <div styleName="right">
            <MyInput
              type="textarea"
              onChange={(e) => {}}
              rows={5}
              value={hobby || ''}
              placeholder="你有什么特长爱好呢"
              allowClear={true}
            />
          </div>
        </div>
      </div>
    </MyModal.Dialog>
  );
}
export default BaseInfo;
