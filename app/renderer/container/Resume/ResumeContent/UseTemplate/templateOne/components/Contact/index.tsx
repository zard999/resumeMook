/*
 * @Author: zyh
 * @Date: 2022-08-24 15:38:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-25 11:21:31
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseTemplate/templateOne/components/Contact/index.tsx
 * @Description: 联系方式
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import '../../../styles/template-one.less';
import { useSelector } from 'react-redux';
import { selectResume } from '../../../../../slice';

function Contact() {
  const { contact } = useSelector(selectResume);
  return (
    <div styleName="container">
      <p styleName="title">联系方式 Contact</p>
      <ul styleName="content">
        {contact?.phone && <li>电话：{`${contact?.phone.slice(0, 3)}****${contact?.phone.slice(7)}`}</li>}
        {contact?.email && <li>邮箱：{contact?.email}</li>}
      </ul>
    </div>
  );
}

export default Contact;
