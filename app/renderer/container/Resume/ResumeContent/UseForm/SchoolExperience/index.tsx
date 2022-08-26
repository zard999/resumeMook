/*
 * @Author: zyh
 * @Date: 2022-08-26 17:23:55
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-26 17:43:52
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseForm/SchoolExperience/index.tsx
 * @Description: 在校经历Form
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import MyModal from '@common/components/MyModal';
import { IProps } from '../types';
import WrapperExperience from '../WrapperExperience';
import Form from './Form';
import { useAppSelector } from '@store/hooks';
import { selectResume } from '@src/container/Resume/slice';
import AdapterExperience from '../WrapperExperience/adapter';
import { AdapterExperienceType } from '../WrapperExperience/adapter';
import useUpdateResumeHook from '@src/container/Resume/ResumeContent/useUpdateResumeHook';

function SchoolExperience({ onClose }: IProps) {
  const updateResumeHook = useUpdateResumeHook();
  const { schoolExperience } = useAppSelector(selectResume);
  const updateDataList = (newList: AdapterExperienceType[]) => {
    updateResumeHook('schoolExperience', newList);
  };
  return (
    <MyModal.Dialog
      title="在校经历"
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
        dataList={AdapterExperience.school(schoolExperience as AdapterExperienceType[])}
        updateDataList={updateDataList}
      >
        <Form />
      </WrapperExperience>
    </MyModal.Dialog>
  );
}
export default SchoolExperience;
