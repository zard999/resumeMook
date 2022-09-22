/*
 * @Author: zyh
 * @Date: 2022-08-23 11:18:25
 * @LastEditors: zyh
 * @LastEditTime: 2022-09-22 11:19:30
 * @FilePath: /resumeMook/app/main/electron.ts
 * @Description: electron启动文件
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import path from 'path';
import { autoUpdater } from 'electron-updater';
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

  // 全量更新
  // 配置提供更新的程序及build中配置的url
  autoUpdater.setFeedURL('https://plasma.stpass.com/file/electron-base/resume');
  // 是否自动更新，如果为true，当可以更新时(update-available)自动执行更新下载
  autoUpdater.autoDownload = false;

  // 1.在渲染进程里触发获取更新，开始进行更新流程。 (根据具体需求)
  ipcMain.on('checkForUpdates', (e, arg) => {
    autoUpdater.checkForUpdates();
  });
  autoUpdater.on('error', function (error) {
    printUpdaterMessage('error');
    mainWindow.webContents.send('updateError', error);
  });

  // 2. 开始检查是否有更新
  autoUpdater.on('checking-for-update', function () {
    printUpdaterMessage('checking');
  });

  // 3. 有更新时触发
  autoUpdater.on('update-available', function (info) {
    printUpdaterMessage('updateAvailable');
    // 4. 告诉渲染进程有更新，info包含新版本信息
    mainWindow.webContents.send('updateAvailable', info);
    // dialog
    //   .showMessageBox({
    //     type: 'info',
    //     title: '检测到新版本',
    //     message: '是否立即更新?',
    //     buttons: ['暂时忽略', '立即更新'],
    //   })
    //   .then((response) => {
    //     if (response.response === 1) {
    //       autoUpdater.downloadUpdate();
    //     } else {
    //       // 4. 告诉渲染进程有更新，info包含新版本信息
    //       mainWindow.webContents.send('updateAvailable', info);
    //     }
    //   });
  });

  // 7. 收到确认更新提示，执行下载
  ipcMain.on('comfirmUpdate', () => {
    autoUpdater.downloadUpdate();
  });

  autoUpdater.on('update-not-available', function (info) {
    printUpdaterMessage('updateNotAvailable');
  });

  // 8. 下载进度，包含进度百分比、下载速度、已下载字节、总字节等
  // ps: 调试时，想重复更新，会因为缓存导致该事件不执行，下载直接完成，可找到C:\Users\40551\AppData\Local\xxx-updater\pending下的缓存文件将其删除（这是我本地的路径）
  autoUpdater.on('download-progress', function (progressObj) {
    printUpdaterMessage('downloadProgress');
    mainWindow.webContents.send('downloadProgress', progressObj);
  });

  // 10. 下载完成，告诉渲染进程，是否立即执行更新安装操作
  autoUpdater.on('update-downloaded', function () {
    mainWindow.webContents.send('updateDownloaded');
    // 12. 立即更新安装
    ipcMain.on('updateNow', (e, arg) => {
      autoUpdater.quitAndInstall();
    });
  });

  // 将日志在渲染进程里面打印出来
  function printUpdaterMessage(
    arg: 'error' | 'checking' | 'updateAvailable' | 'downloadProgress' | 'updateNotAvailable'
  ) {
    let message = {
      error: '更新出错',
      checking: '正在检查更新',
      updateAvailable: '检测到新版本',
      downloadProgress: '下载中',
      updateNotAvailable: '无新版本',
    };
    mainWindow.webContents.send('printUpdaterMessage', message[arg] ?? arg);
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
