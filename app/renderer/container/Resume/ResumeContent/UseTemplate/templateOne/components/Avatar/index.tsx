/*
 * @Author: zyh
 * @Date: 2022-08-24 15:38:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-25 10:52:13
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseTemplate/templateOne/components/Avatar/index.tsx
 * @Description: 头像
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import './index.less';
import AvatarImage from '@assets/avatar.jpg';
import { useSelector } from 'react-redux';
import { selectResume } from '../../../../../slice';

function Avatar() {
  const { base } = useSelector(selectResume);
  return (
    <div styleName="box">
      <div styleName="avatar">
        <img src={base.avatar} />
      </div>
    </div>
  );
}

export default Avatar;
