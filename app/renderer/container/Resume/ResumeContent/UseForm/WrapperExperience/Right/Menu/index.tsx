/*
 * @Author: zyh
 * @Date: 2022-08-25 18:29:49
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-26 11:31:51
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseForm/WrapperExperience/Right/Menu/index.tsx
 * @Description: 右侧顶部按钮菜单
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import './index.less';
import { AdapterExperienceType } from '../../adapter';
interface IProps {
  currentItem: AdapterExperienceType;
  isEdit: boolean; // 编辑状态
  onChangeEditStatus: () => void; // 点击编辑进入编辑状态
  onCancelEditValue: () => void; // 取消当前内容
}
function Menu({ currentItem, isEdit, onChangeEditStatus, onCancelEditValue }: IProps) {
  return (
    <div styleName="menu">
      <div styleName="left">
        <div styleName="title">{currentItem?.title}</div>
      </div>
      <div styleName="right">
        {isEdit && (
          <>
            <div styleName="btn cancel" onClick={onCancelEditValue}>
              取消
            </div>
            <div styleName="btn save">保存</div>
          </>
        )}

        {!isEdit && (
          <div styleName="btn cancel" onClick={onChangeEditStatus}>
            编辑
          </div>
        )}
      </div>
    </div>
  );
}
export default Menu;
