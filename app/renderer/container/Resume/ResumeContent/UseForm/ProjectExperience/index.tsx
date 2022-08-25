/*
 * @Author: zyh
 * @Date: 2022-08-25 17:00:43
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-25 17:38:58
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseForm/ProjectExperience/index.tsx
 * @Description: 项目经验弹窗
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import MyModal from '@common/components/MyModal';
import Form from './Form';
import WrapperExperience from '../WrapperExperience';
import useUpdateResumeHook from '@src/container/Resume/ResumeContent/useUpdateResumeHook';
import { useAppSelector } from '@store/hooks';
import { selectResume } from '../../../slice';

function ProjectExperience() {
  const updateResumeHook = useUpdateResumeHook();
  const { projectExperience } = useAppSelector(selectResume);

  const updateDataList = (newDataList: any[]) => updateResumeHook('projectExperience', newDataList);

  return (
    <MyModal.Dialog title="项目经验">
      <WrapperExperience dataList={projectExperience} updateDataList={updateDataList}>
        <Form />
      </WrapperExperience>
    </MyModal.Dialog>
  );
}
export default ProjectExperience;
