/*
 * @Author: zyh
 * @Date: 2022-08-25 18:29:49
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-26 09:18:48
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseForm/WrapperExperience/Right/Menu/index.tsx
 * @Description: 右侧顶部按钮菜单
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import './index.less';
interface IProps {
  children: React.ReactNode;
}
function Menu() {
  return (
    <div styleName="menu">
      <div styleName="left">
        <div styleName="title">resumeMook可视化简历平台</div>
      </div>
      <div styleName="right">
        {/* <div styleName="btn cancel">取消</div>
        <div styleName="btn save">保存</div> */}

        <div styleName="btn cancel">编辑</div>
      </div>
    </div>
  );
}
export default Menu;
