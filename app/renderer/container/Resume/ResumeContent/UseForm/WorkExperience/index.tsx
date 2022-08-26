/*
 * @Author: zyh
 * @Date: 2022-08-26 16:50:03
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-26 17:18:11
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseForm/WorkExperience/index.tsx
 * @Description: 工作经历
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import MyModal from '@common/components/MyModal';
import WrapperExperience from '../WrapperExperience';
import Form from './Form';
import { useAppSelector } from '@store/hooks';
import { selectResume } from '@src/container/Resume/slice';
import AdapterExperience, { AdapterExperienceType } from '../WrapperExperience/adapter';
import useUpdateResumeHook from '@src/container/Resume/ResumeContent/useUpdateResumeHook';
import { IProps } from '../types';

function WorkExperience({ onClose }: IProps) {
  const updateResumeHook = useUpdateResumeHook();
  const { workExperience } = useAppSelector(selectResume);
  const updateDataList = (newDataList: AdapterExperienceType[]) => {
    updateResumeHook('workExperience', newDataList);
  };
  return (
    <MyModal.Dialog
      title="工作经历"
      showFooter={false}
      config={{
        cancelBtn: {
          callback: onClose,
        },
      }}
      width={960}
      childStyle={{ padding: 0 }}
    >
      <WrapperExperience
        dataList={AdapterExperience.work(workExperience as AdapterExperienceType[])}
        updateDataList={updateDataList}
      >
        <Form />
      </WrapperExperience>
    </MyModal.Dialog>
  );
}
export default WorkExperience;
