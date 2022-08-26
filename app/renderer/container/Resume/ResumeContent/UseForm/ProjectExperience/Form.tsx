/*
 * @Author: zyh
 * @Date: 2022-08-25 17:32:15
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-26 14:36:26
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseForm/ProjectExperience/Form.tsx
 * @Description: Form
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import MyInput from '@common/components/MyInput';
import { AdapterExperienceType } from '../WrapperExperience/adapter';
import './index.less';

interface IProps {
  currentItem?: AdapterExperienceType;
  isDisable?: boolean;
  onChangeCurrentItem?: (newItem: AdapterExperienceType) => void;
}

function Form({ currentItem, isDisable, onChangeCurrentItem }: IProps) {
  console.log('currentItem', isDisable);
  const onChangeValue = (key: string, value: string) => {
    let newItem = { ...currentItem, [key]: value };
    onChangeCurrentItem && onChangeCurrentItem(newItem);
  };
  return (
    <div styleName="wrapper">
      <div styleName="flex">
        <div styleName="left">
          <span styleName="require">*</span>项目名 ：
        </div>
        <div styleName="right">
          <MyInput
            value={currentItem?.title}
            onChange={(e) => onChangeValue('title', e.target?.value || '')}
            placeholder="请输入项目名"
            disabled={isDisable}
          />
        </div>
      </div>
      <div styleName="flex">
        <div styleName="left">
          <span styleName="require">*</span>职 位 ：
        </div>
        <div styleName="right">
          <MyInput value={currentItem?.post} placeholder="在项目中担任什么职位" disabled={isDisable} />
        </div>
      </div>
      <div styleName="flex">
        <div styleName="left">
          <span styleName="require">*</span>时 间 ：
        </div>
        <div styleName="right">
          <MyInput
            value={currentItem?.beginTime}
            placeholder="请输入开始时间"
            style={{ width: 290 }}
            disabled={isDisable}
          />
          <span styleName="line">-</span>
          <MyInput
            value={currentItem?.endTime}
            placeholder="请输入结束时间"
            style={{ width: 290 }}
            disabled={isDisable}
          />
        </div>
      </div>
      <div styleName="flex">
        <div styleName="left">
          <span styleName="require">*</span>内 容 ：
        </div>
        <div styleName="right">
          <MyInput
            type="textarea"
            rows={5}
            value={currentItem?.content}
            placeholder="你在项目中的主要工作是什么呢？"
            disabled={isDisable}
          />
        </div>
      </div>
    </div>
  );
}
export default Form;
