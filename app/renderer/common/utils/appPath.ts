/*
 * @Author: zyh
 * @Date: 2022-08-24 10:29:03
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-24 10:32:35
 * @FilePath: /resume/app/renderer/common/utils/appPath.ts
 * @Description: 获取项目的绝对路径
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */

// 监听主进程和渲染进程通信
import { ipcRenderer } from 'electron';

export function getAppPath() {
  return new Promise((resolve: (value: string) => void, reject: (value: Error) => void) => {
    ipcRenderer.send('get-root-path');
    ipcRenderer.on('reply-root-path', (event, arg: string) => {
      if (arg) {
        resolve(arg);
      } else {
        reject(new Error('项目路径错误'));
      }
    });
  });
}
