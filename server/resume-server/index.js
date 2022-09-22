/*
 * @Author: zyh
 * @Date: 2022-09-22 12:17:41
 * @LastEditors: zyh
 * @LastEditTime: 2022-09-22 12:17:50
 * @FilePath: /resumeMook/server/resume-server/index.js
 * @Description: 本地模仿服务器
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
const Koa = require('koa');
const app = new Koa();

const static = require('koa-static');
const path = require('path');

app.use(static(path.join(__dirname, './static')));

app.listen(9005);
