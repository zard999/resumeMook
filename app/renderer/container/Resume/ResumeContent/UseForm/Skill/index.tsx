/*
 * @Author: zyh
 * @Date: 2022-08-25 10:13:56
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-25 10:29:25
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseForm/Skill/index.tsx
 * @Description: 技能弹窗
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import MyModal from '@common/components/MyModal';
import MyInput from '@common/components/MyInput';
import { IProps } from '../types';
import { useSelector } from 'react-redux';
import './index.less';
import RecommendSkill, { IRecommendSkill } from '@common/constants/skill';
import { selectResume } from '@src/container/Resume/slice';

function Skill({ onClose }: IProps) {
  const { skill } = useSelector(selectResume);
  return (
    <MyModal.Dialog
      title="个人信息"
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
            <span styleName="require" style={{ opacity: 0 }}>
              *
            </span>
            技 能 ：
          </div>
          <div styleName="right">
            <div styleName="action">
              {RecommendSkill.map((skill: IRecommendSkill) => {
                return (
                  <div
                    styleName="label"
                    key={skill.uid}
                    style={{
                      color: skill?.styles?.font,
                      borderColor: skill?.styles?.font,
                      backgroundColor: skill?.styles?.bg,
                    }}
                    onClick={() => {
                      const value = `${skill}${skill ? '｜' : ''}${skill.label}`;
                    }}
                  >
                    {skill.label}
                  </div>
                );
              })}
            </div>
            <MyInput
              type="textarea"
              onChange={(e) => {}}
              rows={5}
              value={skill}
              placeholder="例如 Vue、React"
              allowClear={true}
            />
            <div styleName="tips"> * 多个技能以 | 分割</div>
          </div>
        </div>
      </div>
    </MyModal.Dialog>
  );
}
export default Skill;
