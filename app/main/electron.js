/*
 * @Author: zyh
 * @Date: 2022-08-23 11:18:25
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-23 11:41:58
 * @FilePath: /resume/app/main/electron.js
 * @Description: electron启动文件
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
const { app, BrowserWindow } = require("electron");

// 创建浏览器窗口
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true, // 注入node模块
      devTools: true,
    },
  });

  mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
