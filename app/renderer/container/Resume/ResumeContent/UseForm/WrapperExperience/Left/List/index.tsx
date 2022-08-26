/*
 * @Author: zyh
 * @Date: 2022-08-25 18:20:31
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-25 18:24:57
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseForm/WrapperExperience/Left/List/index.tsx
 * @Description: 左侧列表展示
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import DeleteIcon from '@assets/icon/delete.png';
import './index.less';

function List() {
  return (
    <div styleName="experience-list">
      <div styleName="experience-item">
        <div styleName="experience-item-box">
          <div styleName="experience-item-title">{1111}</div>
          <div styleName="experience-item-date">{2020}</div>
        </div>
        <div styleName="experience-item-action">
          <div styleName="experience-delete">
            <img src={DeleteIcon} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default List;
