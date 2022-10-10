/*
 * @Author: zyh
 * @Date: 2022-08-23 11:18:25
 * @LastEditors: zyh
 * @LastEditTime: 2022-09-22 18:22:33
 * @FilePath: /resumeMook/app/main/electron.ts
 * @Description: electron启动文件
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import path from 'path';
import { autoUpdater } from 'electron-updater';
import { app, BrowserWindow, ipcMain, dialog, Menu, globalShortcut } from 'electron';
import { CheckForUpdates } from './update';
import customMenu from './customMenu';
import './useData';
export interface MyBrowserWindow extends BrowserWindow {
  uid?: string;
}

const ROOT_PATH = path.join(app.getAppPath(), '../');

// 定义返回给渲染层的相关提示文案
const message = {
  error: '检查更新出错',
  checking: '正在检查更新……',
  updateAva: '检测到新版本，正在下载……',
  updateNotAva: '现在使用的就是最新版本，不用更新',
};

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

  CheckForUpdates();
}

// 全量更新
function checkUpdate() {
  // if (process.platform === 'darwin') {
  // 我们使用koa-static将静态目录设置成了static文件夹，
  // 所以访问http://127.0.0.1:9005/darwin，就相当于访问了static/darwin文件夹，win32同理
  // autoUpdater.setFeedURL('https://plasma.stpass.com/file/electron-base/'); // 设置要检测更新的路径
  // 这里是为了在本地做应用升级测试使用
  if (isDev()) {
    autoUpdater.updateConfigPath = path.join(__dirname, 'dev-app-update.yml');
  } else {
    autoUpdater.setFeedURL('http://127.0.0.1:9005/darwin/'); // 设置要检测更新的路径
  }

  // } else {
  //   autoUpdater.setFeedURL('https://plasma.stpass.com/file/electron-base/resume-realease');
  //   // autoUpdater.setFeedURL('https://plasma.stpass.com/file/electron-base/');
  // }

  // 检测更新
  autoUpdater.checkForUpdates();

  // 监听'error'事件
  autoUpdater.on('error', (err) => {
    console.log('err', err);
  });

  // 监听'update-available'事件，发现有新版本可以更新时触发
  autoUpdater.on('update-available', () => {
    console.log('found new version');
  });

  // 默认会自动下载新版本，如果不想自动下载，设置autoUpdater.autoDownload = false

  // 监听'update-downloaded'事件，新版本下载完成时触发
  autoUpdater.on('update-downloaded', () => {
    dialog
      .showMessageBox({
        type: 'info',
        title: '应用安装',
        message: '发现新版本，是否安装？',
        buttons: ['是', '否'],
      })
      .then((buttonIndex) => {
        if (buttonIndex.response === 0) {
          // 选择是，则退出程序，安装新版本
          autoUpdater.quitAndInstall();
          app.quit();
        }
      });
  });
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

  // 每次启动程序，就检查更新
  // checkUpdate();
});
