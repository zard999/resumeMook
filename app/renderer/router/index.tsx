/*
 * @Author: zyh
 * @Date: 2022-08-23 17:58:09
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-30 14:04:14
 * @FilePath: /resume/app/renderer/router/index.tsx
 * @Description: 路由器
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React, { useEffect } from 'react';
import { HashRouter, Redirect } from 'react-router-dom';
import Root from '@src/container/Root';
import Resume from '@src/container/Resume';
import TemplateList from '@src/container/templateList';
// 引入路由管理
import ROUTER from '@common/constants/router';
import useReadDirAssertsTemplateHooks from '@src/hooks/useReadDirAssertsTemplateHooks';
import useThemeActionHooks from '@src/hooks/useThemeActionHooks';
// keepAlive
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';

function Router() {
  const readDirAssertsTemplateHooks = useReadDirAssertsTemplateHooks();
  const initThemeConfig = useThemeActionHooks.useInitThemeConfig();
  useEffect(() => {
    initThemeConfig();
    readDirAssertsTemplateHooks();
  }, []);
  return (
    <HashRouter>
      <CacheSwitch>
        {/* 一定要添加exact，必须添加exact */}
        <CacheRoute path={ROUTER.root} exact component={Root} />
        {/* <Root /> */}
        {/* 添加简历模块入口路由，必须添加exact */}
        <CacheRoute path={ROUTER.resume} exact component={Resume} />
        {/* 添加模版模版入口路由，必须添加exact */}
        <CacheRoute path={ROUTER.templateList} exact component={TemplateList} />
        {/* 默认重定向到首页 */}
        <Redirect to={ROUTER.root} />
      </CacheSwitch>
    </HashRouter>
  );
}
export default Router;
