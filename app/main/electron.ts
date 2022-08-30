/*
 * @Author: zyh
 * @Date: 2022-08-23 11:18:25
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-30 16:30:22
 * @FilePath: /resume/app/main/electron.ts
 * @Description: electron启动文件
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import path from 'path';
import { app, BrowserWindow, ipcMain, dialog, Menu } from 'electron';
import customMenu from './customMenu';

const ROOT_PATH = path.join(app.getAppPath(), '../');

// 监听渲染进程发的消息并回复
ipcMain.on('get-root-path', (event, arg) => {
  event.reply('reply-root-path', ROOT_PATH);
});

// 应用设置，保存自定义存储路径
ipcMain.on('open-save-resume-path', (event, arg) => {
  dialog
    .showOpenDialog({
      properties: ['openDirectory'],
    })
    .then((result) => {
      event.reply('reply-save-resume-path', result.filePaths);
    })
    .catch((err) => {
      event.reply('reply-save-resume-path', err);
    });
});

function isDev() {
  // 👉 还记得我们配置中通过 webpack.DefinePlugin 定义的构建变量吗
  return process.env.NODE_ENV === 'development';
}

// 创建浏览器窗口
function createWindow() {
  // 创建主应用窗口
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true, // 注入node模块
      devTools: true,
    },
  });

  // 创建应用设置窗口
  const settingWindow = new BrowserWindow({
    width: 720,
    height: 240,
    resizable: false, // 我们设置该窗口不可拉伸宽高
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
    },
  });

  if (isDev()) {
    // 👇 看到了吗，在开发环境下，我们加载的是运行在 7001 端口的 React
    mainWindow.loadURL(`http://127.0.0.1:7001/index.html`);
    settingWindow.loadURL('http://localhost:7001/setting.html');
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`);
    settingWindow.loadURL(`file://${path.join(__dirname, '../dist/setting.html')}`);
  }
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('ready', function () {
  /**
   * buildFromTemplate：构建菜单栏
   * setApplicationMenu：构建MenuItem
   */
  const menu = Menu.buildFromTemplate(customMenu);
  Menu.setApplicationMenu(menu);
});
