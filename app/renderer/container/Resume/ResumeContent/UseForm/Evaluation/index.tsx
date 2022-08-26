/*
 * @Author: zyh
 * @Date: 2022-08-25 16:41:44
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-25 16:46:44
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseForm/Evaluation/index.tsx
 * @Description: 个人评价弹窗
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import MyModal from '@common/components/MyModal';
import MyInput from '@common/components/MyInput';
import { IProps } from '../types';
import { useAppSelector } from '@store/hooks';
import { selectResume } from '@src/container/Resume/slice';
import useUpdateResumeHook from '@src/container/Resume/ResumeContent/useUpdateResumeHook';
import './index.less';

function Evaluation({ onClose }: IProps) {
  const updateResumeHook = useUpdateResumeHook();
  const { evaluation } = useAppSelector(selectResume);

  return (
    <MyModal.Dialog
      title="个人评价"
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
            <span styleName="require">*</span>评 价 ：
          </div>
          <div styleName="right">
            <MyInput
              type="textarea"
              onChange={(e) => {
                updateResumeHook<string>('evaluation', e.target.value);
              }}
              rows={5}
              value={evaluation || ''}
              placeholder="夸一夸自己有什么亮点"
              allowClear={true}
            />
            <div styleName="tips"> * 可通过 | 分割</div>
          </div>
        </div>
      </div>
    </MyModal.Dialog>
  );
}
export default Evaluation;
