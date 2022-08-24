/*
 * @Author: zyh
 * @Date: 2022-08-24 15:49:07
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-24 16:01:11
 * @FilePath: /resume/app/renderer/container/Resume/ResumeHeader/index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import { useHistory } from 'react-router';
import ROUTER from '@common/constants/router';
import './index.less';
import MyButton from '@common/components/MyButton/index';

function ResumeHeader() {
  const history = useHistory();

  // 返回首页
  const onBack = () => history.push(ROUTER.root);
  const onExport = () => {};
  return (
    <div styleName="header">
      <div styleName="back" onClick={onBack}>
        返回
      </div>
      <MyButton size="middle" className="export-btn" onClick={onExport}>
        导出PDF
      </MyButton>
    </div>
  );
}
export default ResumeHeader;
