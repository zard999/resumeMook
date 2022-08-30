/*
 * @Author: zyh
 * @Date: 2022-08-23 18:07:04
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-30 11:17:25
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
import { isHttpOrHttpsUrl, compilePath } from '@common/utils/router';
import { useAppSelector } from '@store/hooks';
import MyTheme from '@common/components/MyTheme';
import { selectCurrentTheme } from '@common/components/MyTheme/slice';
import { selectSelectTemplate } from '@src/container/templateList/slice';

function Root() {
  const history = useHistory();
  const currentTheme = useAppSelector(selectCurrentTheme);
  const selectTemplate = useAppSelector(selectSelectTemplate);

  // 路由跳转
  const onRouterToLink = (router: TSRouter.Item) => {
    if (isHttpOrHttpsUrl(router.url)) {
      shell.openExternal(router.url);
      // console.log('跳转到github');
    } else {
      // 打开页面
      // console.log('跳转到简历页面', router);
      if (router.key !== ROUTER_KEY.resume) {
        history.push(compilePath(router.url));
      } else {
        // 如果跳转的是简历的页面，跳转路由的修改
        history.push(
          compilePath(router.url, {
            fromPath: ROUTER_KEY.root,
            templateId: selectTemplate?.templateId,
            templateIndex: selectTemplate?.templateIndex,
          })
        );
      }
    }
  };
  return (
    <div styleName="root" style={{ backgroundColor: currentTheme?.backgroundColor }}>
      <div styleName="container">
        <img src={Logo} alt="" />
        <div styleName="title">resumePlatform</div>
        <div styleName="tips">一个模板简历制作平台, 让你的简历更加出众 ~</div>
        <div styleName="theme">
          <MyTheme />
        </div>
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
