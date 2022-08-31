/*
 * @Author: zyh
 * @Date: 2022-08-31 10:18:42
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-31 11:04:09
 * @FilePath: /resume/app/main/useData.ts
 * @Description: 解决生成环境设置主题无法写入本地
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import path from 'path';
import { app, ipcMain } from 'electron';
import fileAction from '@common/utils/file';

// 根据平台设备，userData指向的路径不同，默认是每个用户的应用程序数据目录
// 开发时目录时Electron，生产时项目文件名
const appConfigPath = path.resolve(app.getPath('userData'), 'appConfig');

// 判断 appConfig 文件夹是否可读
fileAction
  .canRead(appConfigPath)
  .then(() => {
    // 判断是否存在 theme.config.json
    fileAction.hasFile(`${appConfigPath}/theme.config.json`).catch(() => {
      // 不存在则创建
      createThemeConfigJson();
    });

    // 判断是否存在 global.config.json
    fileAction.hasFile(`${appConfigPath}/global.config.json`).catch(() => {
      // 不存在则创建
      createGlobalConfigJson();
    });
  })
  .catch(() => {
    // appConfig 文件夹不可读，说明该文件夹不存在，则新增文件夹
    fileAction.mkdirDir(appConfigPath).then(() => {
      // 默认创建 theme 和 global 文件夹
      createThemeConfigJson();
      createGlobalConfigJson();
    });
  });

// 创建默认的 theme.config.json
const createThemeConfigJson = () => {
  fileAction?.write(
    `${appConfigPath}/theme.config.json`,
    {
      name: '主题配置表',
      currentTheme: {
        id: 'dark',
        fontColor: '#ffffff',
        backgroundColor: '#27292c',
      },
      themeList: [
        {
          id: 'dark',
          fontColor: '#ffffff',
          backgroundColor: '#27292c',
        },
        {
          id: 'blue',
          fontColor: '#ffffff',
          backgroundColor: '#35495e',
        },
        {
          id: 'green',
          fontColor: '#ffffff',
          backgroundColor: '#416f5b',
        },
        {
          id: 'purple',
          fontColor: '#ffffff',
          backgroundColor: '#54546c',
        },
        {
          id: 'princess',
          fontColor: '#ffffff',
          backgroundColor: '#945454',
        },
      ],
    },
    'utf8'
  );
};

// 创建默认的 global.config.json
const createGlobalConfigJson = () => {
  fileAction?.write(
    `${appConfigPath}/global.config.json`,
    {
      name: '全局配置表',
      resumeSavePath: '',
    },
    'utf8'
  );
};

// 响应渲染进程得到 userData 路径，因为 app 模块只能在主进程中使用
ipcMain.on('Electron:get-userData-path', (event) => {
  event.reply('Electron:reply-userData-path', app.getPath('userData'));
});
