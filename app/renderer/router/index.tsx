/*
 * @Author: zyh
 * @Date: 2022-08-23 17:58:09
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-23 23:26:08
 * @FilePath: /resume/app/renderer/router/index.tsx
 * @Description: 路由器
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Root from '@src/container/Root';
import Resume from '@src/container/Resume';
// 引入路由管理
import ROUTER from '@common/constants/router';
function Router() {
  return (
    <HashRouter>
      <Switch>
        {/* 一定要添加exact，必须添加exact */}
        <Route path={ROUTER.root} exact>
          <Root />
        </Route>
        {/* 添加简历模块入口路由，必须添加exact */}
        <Route path={ROUTER.resume} exact>
          <Resume />
        </Route>
      </Switch>
      <Redirect to={ROUTER.root} />
    </HashRouter>
  );
}
export default Router;
