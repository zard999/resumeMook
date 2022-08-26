/*
 * @Author: zyh
 * @Date: 2022-08-25 18:26:05
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-26 09:20:29
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseForm/WrapperExperience/Right/index.tsx
 * @Description: 专门服务于经验弹窗右侧
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import MyScrollBox from '@src/common/components/MyScrollBox';
import React from 'react';
import './index.less';

interface IProps {
  children: React.ReactNode;
}

function Right({ children }: IProps) {
  const getChild = () => {
    const menuElement = (children as any)[0];
    const formElement = (children as any)[1][0];
    return [menuElement, formElement];
  };
  return (
    <>
      <div styleName="header">{getChild()[0]}</div>
      <div styleName="content">
        <MyScrollBox maxHeight={360}>{getChild()[1]}</MyScrollBox>
      </div>
    </>
  );
}
export default Right;
