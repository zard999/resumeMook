/*
 * @Author: zyh
 * @Date: 2022-08-25 18:17:51
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-26 13:47:14
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseForm/WrapperExperience/Left/index.tsx
 * @Description: 专门服务于经验弹窗左侧
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import './index.less';
import MyScrollBox from '@common/components/MyScrollBox';
import MyButton from '@common/components/MyButton';
import List from './List';
import { IListProps } from './List/index';

interface IProps extends IListProps {
  onAdd: () => void;
}

function Left({ currentIndex, experienceList, onAdd, onChange }: IProps) {
  return (
    <div styleName="layout-left">
      <MyScrollBox maxHeight={420}>
        <List currentIndex={currentIndex} experienceList={experienceList} onChange={onChange} />
      </MyScrollBox>
      <div styleName="action">
        <MyButton width={112} size="middle" onClick={onAdd}>
          添加条目
        </MyButton>
      </div>
    </div>
  );
}
export default Left;
