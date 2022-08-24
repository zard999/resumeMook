/*
 * @Author: zyh
 * @Date: 2022-08-24 15:49:55
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-24 16:43:28
 * @FilePath: /resume/app/renderer/container/Resume/ResumeToolbar/index.tsx
 * @Description: 工具条
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import './index.less';
import RESUME_TOOLBAR_LIST from '@common/constants/resume';
import MyScrollBox from '@common/components/MyScrollBox';

function ResumeToolbar() {
  const height = document.body.clientHeight;
  return (
    <div styleName="slider">
      <MyScrollBox maxHeight={height - 180}>
        <div styleName="module">
          <div styleName="title">
            <span styleName="line" />
            全部模块
          </div>
          <div styleName="content">
            {RESUME_TOOLBAR_LIST.map((toolbar: TSResume.SliderItem) => {
              return (
                <div styleName="box" key={toolbar.key}>
                  <div styleName="info">
                    <i styleName="icon" />
                    <div styleName="text">
                      <div styleName="name">{toolbar.name}</div>
                      <div styleName="summary">{toolbar.summary}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </MyScrollBox>
    </div>
  );
}

export default ResumeToolbar;
