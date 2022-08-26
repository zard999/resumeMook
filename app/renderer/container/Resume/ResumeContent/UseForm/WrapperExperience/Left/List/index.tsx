/*
 * @Author: zyh
 * @Date: 2022-08-25 18:20:31
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-26 13:46:08
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseForm/WrapperExperience/Left/List/index.tsx
 * @Description: 左侧列表展示
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import DeleteIcon from '@assets/icon/delete.png';
import './index.less';
import { AdapterExperienceType } from '../../adapter';
import { formatToString } from '@common/utils/time';

export interface IListProps {
  currentIndex: number;
  experienceList: AdapterExperienceType[];
  onChange: (index: number) => void; // 切换条目
}

function List({ currentIndex, experienceList, onChange }: IListProps) {
  return (
    <div styleName="experience-list">
      {experienceList &&
        experienceList?.length &&
        experienceList?.map((experience: AdapterExperienceType, index: number) => (
          <div
            styleName={`experience-item ${currentIndex === index ? 'is-select' : ''}`}
            key={index}
            onClick={() => onChange(index)}
          >
            <div styleName="experience-item-box">
              <div styleName="experience-item-title">{experience?.title}</div>
              <div styleName="experience-item-date">{formatToString(experience?.date)}</div>
            </div>
            <div styleName="experience-item-action">
              <div styleName="experience-delete">
                <img src={DeleteIcon} alt="" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
export default List;
