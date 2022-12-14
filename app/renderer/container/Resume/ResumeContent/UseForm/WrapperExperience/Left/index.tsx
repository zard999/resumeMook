/*
 * @Author: zyh
 * @Date: 2022-08-25 18:17:51
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-26 16:37:56
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

function Left({ currentIndex, experienceList, onAdd, onChange, onDelete }: IProps) {
  return (
    <div styleName="layout-left">
      {experienceList.length > 0 && (
        <>
          <MyScrollBox maxHeight={420}>
            <List currentIndex={currentIndex} experienceList={experienceList} onChange={onChange} onDelete={onDelete} />
          </MyScrollBox>
          <div styleName="action">
            <MyButton width={112} size="middle" onClick={onAdd}>
              添加条目
            </MyButton>
          </div>
        </>
      )}

      {experienceList.length === 0 && (
        <div styleName="empty">
          <div styleName="empty-tips">还没有内容，快添加一下吧～</div>
          <div styleName="empty-action">
            <MyButton width={112} size="middle" onClick={onAdd}>
              添加条目
            </MyButton>
          </div>
        </div>
      )}
    </div>
  );
}
export default Left;
