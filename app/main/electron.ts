/*
 * @Author: zyh
 * @Date: 2022-08-23 11:18:25
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-31 11:23:00
 * @FilePath: /resume/app/main/electron.ts
 * @Description: electron启动文件
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import path from 'path';
import { app, BrowserWindow, ipcMain, dialog, Menu, globalShortcut } from 'electron';
import customMenu from './customMenu';
import './useData';
export interface MyBrowserWindow extends BrowserWindow {
  uid?: string;
}

const ROOT_PATH = path.join(app.getAppPath(), '../');

// 监听渲染进程发的消息并回复
ipcMain.on('get-root-path', (event, arg) => {
  event.reply('reply-root-path', isDev() ? ROOT_PATH : __dirname);
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

export function isDev() {
  // 👉 还记得我们配置中通过 webpack.DefinePlugin 定义的构建变量吗
  return process.env.NODE_ENV === 'development';
}

// 创建浏览器窗口
function createWindow() {
  // 创建主应用窗口
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    resizable: isDev(),
    webPreferences: {
      nodeIntegration: true, // 注入node模块
      devTools: isDev(),
    },
  });

  // 创建应用设置窗口
  const settingWindow: MyBrowserWindow = new BrowserWindow({
    width: 720,
    height: 240,
    show: false, // 设置为 false，使得窗口创建时不展示
    frame: false, // 为了解决退出程序时，程序并没有关闭的bug
    resizable: isDev(), // 我们设置该窗口不可拉伸宽高
    webPreferences: {
      devTools: isDev(),
      nodeIntegration: true,
    },
  });

  settingWindow.uid = 'settingWindow'; // 添加自己唯一的窗口属性

  // 监听关闭等事件
  ipcMain.on('Electron:SettingWindow-hide-event', () => {
    if (settingWindow.isVisible()) settingWindow.hide();
  });

  ipcMain.on('Electron:SettingWindow-min-event', () => {
    if (settingWindow.isVisible()) settingWindow.minimize();
  });

  mainWindow.on('close', () => {
    app.quit();
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

  // 注册一个快捷键
  const customCut = globalShortcut.register('CommandOrControl+T', () => {});

  if (!customCut) {
    console.log('凉了，注册失败');
  }
});

app.on('will-quit', () => {
  // 注销快捷键事件
  globalShortcut.unregister('CommandOrControl+T');
});

app.on('ready', function () {
  /**
   * buildFromTemplate：构建菜单栏
   * setApplicationMenu：构建MenuItem
   */
  const menu = Menu.buildFromTemplate(customMenu);
  Menu.setApplicationMenu(menu);
});
