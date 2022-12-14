/*
 * @Author: zyh
 * @Date: 2022-08-29 15:40:31
 * @LastEditors: zyh
 * @LastEditTime: 2022-09-22 17:50:14
 * @FilePath: /resumeMook/app/renderer/windowPages/setting/index.tsx
 * @Description: 应用设置
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React, { useState, useEffect } from 'react';
import './index.less';
import { ipcRenderer } from 'electron';
import { useReadGlobalConfigFile, useUpdateGlobalConfigFile } from '@src/hooks/useGlobalConfigActionHooks';
import { getUserStoreDataPath } from '@common/utils/appPath';

function Setting() {
  const [resumeSavePath, setResumeSavePath] = useState('');
  // 进行读取文件内容和更新内容
  const readGlobalConfigFile = useReadGlobalConfigFile();
  const updateGlobalConfigFile = useUpdateGlobalConfigFile();

  useEffect(() => {
    readGlobalConfigFile().then((value: { [key: string]: any }) => {
      // 如果存在默认路径，以此为主
      if (value?.resumeSavePath) {
        setResumeSavePath(value?.resumeSavePath);
      } else {
        // 不存在默认路径，则设置默认路径并更新文件内容
        getUserStoreDataPath().then((appPath: string) => {
          console.log('appPath', appPath);
          setResumeSavePath(`${appPath}/resumeCache`);
          updateGlobalConfigFile('resumeSavePath', `${appPath}/resumeCache`);
        });
      }
    });
  }, []);

  const onChangePath = () => {
    // 1. 向主进程发生消息，因为dialog模块只能在主进程中调用
    ipcRenderer.send('open-save-resume-path', '');
    // 2. 监听主进程发送回来的消息
    ipcRenderer.on('reply-save-resume-path', (event, arg: string[]) => {
      if (arg) {
        console.log('result', arg);
        if (arg.length > 0) {
          setResumeSavePath(arg[0]);
          updateGlobalConfigFile('resumeSavePath', arg[0]);
        }
      } else {
        console.log('自定义存储路径失败');
      }
    });
  };

  // 全量更新
  // 增量更新
  const onUpdate = () => {
    // 6. 点击确认更新
    // ipcRenderer.send('comfirmUpdate');
    // console.log('comfirmUpdate');
    // 发送通知是否存在更新
    let isUpdate = ipcRenderer.sendSync('exist_update');
    if (isUpdate) {
      ipcRenderer.invoke('new_update').then((res) => {
        if (res) {
          ipcRenderer.send('Sure');
        }
      });
    }
    console.log(isUpdate);
  };

  const onHideWindow = () => {
    ipcRenderer.send('Electron:SettingWindow-hide-event');
  };

  const onMinWindow = () => {
    ipcRenderer.send('Electron:SettingWindow-min-event');
  };

  return (
    <div styleName="container">
      <div styleName="menu">
        <div styleName="hide" onClick={onHideWindow}>
          x
        </div>
        <div styleName="min" onClick={onMinWindow}>
          -
        </div>
      </div>
      <div styleName="content">
        <p styleName="label">修改简历数据储存路径</p>
        <div styleName="input">
          <div styleName="value">{resumeSavePath || '当前存储路径为：'}</div>
          <div styleName="update-btn" onClick={onChangePath}>
            更改路径
          </div>
        </div>
      </div>
      <div styleName="update-btn" onClick={onUpdate}>
        更新
      </div>
    </div>
  );
}
export default Setting;
