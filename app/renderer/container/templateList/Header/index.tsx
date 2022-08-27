/*
 * @Author: zyh
 * @Date: 2022-08-27 10:54:43
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-27 10:58:10
 * @FilePath: /resume/app/renderer/container/templateList/Header/index.tsx
 * @Description: 头部
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import './index.less';
import { useHistory } from 'react-router';

function Header() {
  const history = useHistory();
  const goBack = () => history.push('/');
  return (
    <div styleName="header">
      <div styleName="back" onClick={goBack}>
        返回
      </div>
      <p styleName="title">简历模版仓库</p>
    </div>
  );
}
export default Header;
