/*
 * @Author: zyh
 * @Date: 2022-08-25 10:09:24
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-25 15:31:47
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseForm/Certificate/index.tsx
 * @Description: 获奖证书弹窗
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import MyModal from '@src/common/components/MyModal';
import MyInput from '@src/common/components/MyInput';
import { IProps } from '../types';
import { useSelector } from 'react-redux';
import './index.less';
import { selectResume } from '../../../slice';
import useUpdateResumeHook from '@src/container/Resume/ResumeContent/useUpdateResumeHook';

function Certificate({ onClose }: IProps) {
  const { certificate } = useSelector(selectResume);
  const updateResumeHook = useUpdateResumeHook();
  return (
    <MyModal.Dialog
      title="获奖证书"
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
            <span styleName="require">*</span>证 书 ：
          </div>
          <div styleName="right">
            <MyInput
              type="textarea"
              onChange={(e) => updateResumeHook('certificate', e.target?.value)}
              rows={5}
              value={certificate || ''}
              placeholder="互联网+大赛一等奖｜掘金大学骰王｜互联网喝酒大赛进步奖"
              allowClear={true}
            />
            <div styleName="tips"> * 多个证书以 | 分割</div>
          </div>
        </div>
      </div>
    </MyModal.Dialog>
  );
}

export default Certificate;
