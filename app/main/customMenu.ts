/*
 * @Author: zyh
 * @Date: 2022-08-30 16:17:03
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-30 17:26:31
 * @FilePath: /resume/app/main/customMenu.ts
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { MenuItem, MenuItemConstructorOptions, app, BrowserWindow } from 'electron';
import { shell } from 'electron';
import lodash from 'lodash';
import { MyBrowserWindow } from './electron';

const customMenu: (MenuItemConstructorOptions | MenuItem)[] = [
  {
    label: '平台',
    role: 'help',
    submenu: [
      {
        label: '源码',
        click: function () {
          shell.openExternal('https://github.com/zard999/resumeMook');
        },
      },
      {
        label: '小册',
        click: function () {
          shell.openExternal('https://juejin.cn/book/6950646725295996940');
        },
      },
    ],
  },
  {
    label: '编辑',
    submenu: [
      {
        label: '撤销',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo',
      },
      {
        label: '重做',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo',
      },
      {
        label: '剪切',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut',
      },
      {
        label: '复制',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy',
      },
      {
        label: '粘贴',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste',
      },
      {
        label: '全选',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectAll',
      },
    ],
  },
  {
    label: '视图',
    submenu: [
      {
        label: '刷新当前页面',
        accelerator: 'CmdOrCtrl+R',
        click: function (item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload();
        },
      },
      {
        label: '切换全屏幕',
        accelerator: (function () {
          if (process.platform === 'darwin') return 'Ctrl+Command+F';
          else return 'F11';
        })(),
        click: function (item, focusedWindow) {
          if (focusedWindow) focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        },
      },
      {
        label: '切换开发者工具',
        accelerator: (function () {
          if (process.platform === 'darwin') return 'Alt+Command+I';
          else return 'Ctrl+Shift+I';
        })(),
        click: function (item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.openDevTools();
        },
      },
    ],
  },
  {
    label: '窗口',
    role: 'window',
    submenu: [
      {
        label: '最小化',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize',
      },
      {
        label: '关闭',
        accelerator: 'CmdOrCtrl+W',
        role: 'close',
      },
    ],
  },
  {
    label: '设置',
    submenu: [
      {
        label: '修改简历数据存储路径',
        click: function () {
          // 获取目前所有的窗口
          const wins: MyBrowserWindow[] = BrowserWindow.getAllWindows();
          const currentWindow = lodash.find(wins, (w) => w.uid === 'settingWindow');
          if (currentWindow) {
            currentWindow.show(); // 显示窗口
          }
          console.log('111');
        },
      },
    ],
  },
];

if (process.platform === 'darwin') {
  const { name } = app;
  customMenu.unshift({
    label: name,
    submenu: [
      {
        label: '关于 ' + name,
        role: 'about',
      },
      {
        type: 'separator',
      },
      {
        label: '服务',
        role: 'services',
        submenu: [],
      },
      {
        type: 'separator',
      },
      {
        label: 'Hide ' + name,
        accelerator: 'Command+H',
        role: 'hide',
      },
      {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        role: 'hideOthers',
      },
      {
        label: 'Show All',
        role: 'unhide',
      },
      {
        type: 'separator',
      },
      {
        label: '退出',
        accelerator: 'Command+Q',
        click: function () {
          app.quit();
        },
      },
    ],
  });
}

export default customMenu;