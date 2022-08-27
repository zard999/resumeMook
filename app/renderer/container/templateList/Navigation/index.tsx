/*
 * @Author: zyh
 * @Date: 2022-08-27 11:00:56
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-27 11:08:42
 * @FilePath: /resume/app/renderer/container/templateList/Navigation/index.tsx
 * @Description: 侧边栏
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import './index.less';
import TemplateCoverOne from '@assets/template/template1.jpg';
import TemplateCoverTwo from '@assets/template/template2.jpg';
import UseIcon from '@assets/icon/use.png';

import MyButton from '@common/components/MyButton';

function Navigation() {
  return (
    <div styleName="navigation">
      <div styleName="template">
        <img styleName="cover" src={TemplateCoverOne} />
        <div styleName="mask">
          <img styleName="use" src={UseIcon} />
        </div>
      </div>

      <div styleName="template">
        <img styleName="cover" src={TemplateCoverTwo} />
        <div styleName="mask">
          <MyButton
            size="middle"
            className="view-btn"
            onClick={() => {
              console.log(1);
            }}
          >
            预览模版
          </MyButton>
        </div>
      </div>
    </div>
  );
}
export default Navigation;
