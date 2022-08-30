/*
 * @Author: zyh
 * @Date: 2022-08-24 15:38:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-24 15:42:32
 * @FilePath: /resume/app/renderer/container/templates/templateOne/components/Work/index.tsx
 * @Description: 工作经历
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import './index.less';
import React from 'react';

function Work() {
  return (
    <div styleName="content">
      <p styleName="label">工作经历 Post</p>
      <ul styleName="list">
        <li styleName="flex">
          <div styleName="left">
            <p>2017.09-2019.04</p>
            <p>前端工程师</p>
          </div>
          <div styleName="right">
            <p>湖北瞎说大学网络中心</p>
            <p>
              担任TickNet工作室前端工程师，与湖北瞎说大学网络中心合作，围绕微信企业号开发或主导多个应用｜任职期间基于微信企业号开发校内闲余市场，采用Vue.js主导开发，并与湖北xxx科技有限公司合作，主导开发该公司官网及后台管理'
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Work;
