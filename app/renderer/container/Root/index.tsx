/*
 * @Author: zyh
 * @Date: 2022-08-23 18:07:04
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-23 23:25:58
 * @FilePath: /resume/app/renderer/container/Root/index.tsx
 * @Description: 首页
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import './index.less';
import Logo from '@assets/logo.png';
import { useHistory } from 'react-router';
// 提供与桌面集成相关的功能
import { shell } from 'electron';
import { ROUTER_ENTRY, ROUTER_KEY } from '@common/constants/router';

function Root() {
  const history = useHistory();

  // 路由跳转
  const onRouterToLink = (router: TSRouter.Item) => {
    if (router.text !== '简历') {
      shell.openExternal(router.url);
      console.log('跳转到github');
    } else {
      // 打开页面
      console.log('跳转到简历页面', router);
      history.push(router.url);
    }
  };
  return (
    <div styleName="root">
      <div styleName="container">
        <img src={Logo} alt="" />
        <div styleName="title">resumePlatform</div>
        <div styleName="tips">一个模板简历制作平台, 让你的简历更加出众 ~</div>
        <div styleName="action">
          {ROUTER_ENTRY.map((router: TSRouter.Item) => {
            return (
              <div key={router.key} styleName="item" onClick={() => onRouterToLink(router)}>
                {router.text}
              </div>
            );
          })}
        </div>
        <div styleName="copyright">
          <div styleName="footer">
            <p styleName="copyright">
              Copyright © 2022-{new Date().getFullYear()} All Rights Reserved. Copyright By zyh
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Root;
