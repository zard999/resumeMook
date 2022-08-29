/*
 * @Author: zyh
 * @Date: 2022-08-29 15:40:31
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-29 16:13:49
 * @FilePath: /resume/app/renderer/windowPages/setting/index.tsx
 * @Description: 应用设置
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React, { useState } from 'react';
import './index.less';
import { ipcRenderer } from 'electron';

function Setting() {
  const [resumeSavePath, setResumeSavePath] = useState('');

  const onChangePath = () => {
    // 1. 向主进程发生消息，因为dialog模块只能在主进程中调用
    ipcRenderer.send('open-save-resume-path', '');
    // 2. 监听主进程发送回来的消息
    ipcRenderer.on('reply-save-resume-path', (event, arg: string[]) => {
      if (arg) {
        console.log('result', arg);
        if (arg.length > 0) setResumeSavePath(arg[0]);
      } else {
        console.log('自定义存储路径失败');
      }
    });
  };
  return (
    <div styleName="container">
      <p styleName="label">修改简历数据储存路径</p>
      <div styleName="input">
        <div styleName="value">{resumeSavePath || '当前存储路径为：'}</div>
        <div styleName="update-btn" onClick={onChangePath}>
          更改路径
        </div>
      </div>
    </div>
  );
}
export default Setting;
