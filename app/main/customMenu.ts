/*
 * @Author: zyh
 * @Date: 2022-08-30 16:17:03
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-30 16:25:54
 * @FilePath: /resume/app/main/customMenu.ts
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { dialog, MenuItem, MenuItemConstructorOptions } from 'electron';

const customMenu: (MenuItemConstructorOptions | MenuItem)[] = [
  {
    label: '我是简历平台自定义菜单栏',
    role: 'help',
    submenu: [
      {
        label: '关于',
        click: function () {
          dialog.showMessageBox({
            type: 'question',
            title: '提问环节',
            message: '谁最帅 ?',
            detail: '彭于晏广州分晏，不接受反驳',
          });
        },
      },
    ],
  },
  {
    label: '自定义的编辑菜单栏',
    submenu: [
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
    ],
  },
];

export default customMenu;
