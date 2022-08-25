/*
 * @Author: zyh
 * @Date: 2022-08-24 15:38:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-25 11:36:59
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseTemplate/templateOne/components/Job/index.tsx
 * @Description: 求职意向
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import '../../../styles/template-one.less';
import './index.less';
import { useSelector } from 'react-redux';
import { selectResume } from '../../../../../slice';

function Job() {
  const { work } = useSelector(selectResume);
  return (
    <div styleName="container">
      <p styleName="title">工作期望 Work</p>
      <ul styleName="content">
        {work?.job && <li>职位：{work?.job}</li>}
        {work?.cityList && work?.cityList?.length > 0 && (
          <li>
            城市：
            {work?.cityList?.map((city: string, index: number) => (
              <span>
                {city}
                {work?.cityList && work?.cityList?.length - 1 !== index && <span styleName="line">|</span>}
              </span>
            ))}
          </li>
        )}
      </ul>
    </div>
  );
}

export default Job;
