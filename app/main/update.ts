/*
 * @Author: zyh
 * @Date: 2022-09-22 17:10:28
 * @LastEditors: zyh
 * @LastEditTime: 2022-09-23 15:38:59
 * @FilePath: /resumeMook/app/main/update.ts
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { app, ipcMain } from 'electron';
const AdmZip = require('adm-zip');
const request = require('request');
const fs = require('fs');
const path = require('path');
let baseUrl = path.resolve(__dirname) + 'resources/';

if (process.platform === 'darwin') {
  baseUrl = path.resolve(app.getPath('userData'), 'appConfig');
}

const fileUrl = 'http://127.0.0.1:9005/darwin/'; // 这里需要修改为自己的资源外网
console.log('baseUrl', baseUrl);
/**
 * 更新
 */
const downLoad = () => {
  return new Promise<boolean>((resolve, reject) => {
    // 创建一个可以写入的流，
    const stream = fs.createWriteStream(`${baseUrl}app.zip`);
    const url = `${fileUrl}app.zip`;
    request(url)
      .pipe(stream)
      .on('close', () => {
        const unzip = new AdmZip(`${baseUrl}app.zip`); // 下载压缩更新包
        unzip.extractAllTo(`${baseUrl}`, true); // 解压替换本地文件
        resolve(true);
      });
  });
};

const CheckForUpdates = () => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: `${fileUrl}package.json`, // 请求package.json，与本地对比版本号
      },
      (error: any, res: any, body: any) => {
        try {
          if (error || res.statusCode !== 200) {
            throw 'Failed to update the version number, please contact the administrator';
          }
          const json = JSON.parse(body);
          const { version, description } = json;
          console.log(version);

          /**
           * app.getVersion() 返回开发中的 Electron 版本号
           */
          const localVersion = app.getVersion();
          let flag = false;
          version !== localVersion ? (flag = true) : (flag = false);
          ipcMain.on('exist_update', (event, message) => {
            event.returnValue = flag;
          });
          // ipc通信 确认更新下载
          ipcMain.handle('new_update', async (event, message) => {
            let flag = await downLoad();
            return flag;
          });
          ipcMain.on('Sure', (event, message) => {
            app.exit();
            app.relaunch();
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      }
    );
  });
};
export { downLoad, CheckForUpdates };
