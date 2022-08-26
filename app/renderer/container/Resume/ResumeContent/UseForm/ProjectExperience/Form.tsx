/*
 * @Author: zyh
 * @Date: 2022-08-25 17:32:15
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-26 09:04:33
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
  // isDisable?: boolean;
}

function Form({ currentItem }: IProps) {
  return (
    <div styleName="wrapper">
      <div styleName="flex">
        <div styleName="left">
          <span styleName="require">*</span>项目名 ：
        </div>
        <div styleName="right">
          <MyInput value="前端项目" placeholder="请输入项目名" />
        </div>
      </div>
      <div styleName="flex">
        <div styleName="left">
          <span styleName="require">*</span>职 位 ：
        </div>
        <div styleName="right">
          <MyInput value="前端工程师" placeholder="在项目中担任什么职位" />
        </div>
      </div>
      <div styleName="flex">
        <div styleName="left">
          <span styleName="require">*</span>时 间 ：
        </div>
        <div styleName="right">
          <MyInput value="" placeholder="2015.09.01" style={{ width: 290 }} />
          <span styleName="line">-</span>
          <MyInput value="" placeholder="2015.09.01" style={{ width: 290 }} />
        </div>
      </div>
      <div styleName="flex">
        <div styleName="left">
          <span styleName="require">*</span>内 容 ：
        </div>
        <div styleName="right">
          <MyInput type="textarea" rows={5} value="111" placeholder="你在项目中的主要工作是什么呢？" />
        </div>
      </div>
    </div>
  );
}
export default Form;
