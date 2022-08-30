/*
 * @Author: zyh
 * @Date: 2022-08-24 15:38:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-24 15:42:12
 * @FilePath: /resume/app/renderer/container/templates/templateOne/components/Skill/index.tsx
 * @Description: 技能
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import './index.less';

function Skill() {
  return (
    <div styleName="content">
      <p styleName="label">技能证书 Skill</p>
      <ul styleName="skill">
        {[
          '熟悉 Vue.js，了解数据双向绑定原理、阅读过 nextTick 源码',
          '熟悉 React，了解并使用 Hooks 特性，阅读过 redux 源码',
          '了解 Electron，了解 Node.js 以及 Git 团队协作开发工具',
          '了解设计模式，对于特定场景，能采用合适的设计模式进行解决',
          '了解 MYSQL，了解数据库优化常用方法',
          '了解基于微信公众号应用开发，采用 Taro 开发微信小程序，具备良好的网络基础知识',
        ].map((item) => (
          <li styleName="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Skill;
