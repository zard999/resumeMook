/*
 * @Author: zyh
 * @Date: 2022-08-23 17:58:09
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-27 10:50:53
 * @FilePath: /resume/app/renderer/router/index.tsx
 * @Description: 路由器
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Root from '@src/container/Root';
import Resume from '@src/container/Resume';
import TemplateList from '@src/container/templateList';
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
        {/* 添加模版模版入口路由，必须添加exact */}
        <Route path={ROUTER.templateList} exact>
          <TemplateList />
        </Route>
      </Switch>
      {/* 默认重定向到首页 */}
      <Redirect to={ROUTER.root} />
    </HashRouter>
  );
}
export default Router;
