/*
 * @Author: zyh
 * @Date: 2022-08-24 15:38:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-24 15:41:28
 * @FilePath: /resume/app/renderer/container/templates/templateOne/components/Contact/index.tsx
 * @Description: 联系方式
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import '../../../styles/template-one.less';

function Contact() {
  return (
    <div styleName="container">
      <p styleName="title">联系方式 Contact</p>
      <ul styleName="content">
        <li>电话：176****2612</li>
        <li>邮箱：1063137960@qq.com</li>
      </ul>
    </div>
  );
}

export default Contact;
