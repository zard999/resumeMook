/*
 * @Author: zyh
 * @Date: 2022-08-29 15:40:28
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-29 15:44:20
 * @FilePath: /resume/app/renderer/windowPages/setting/app.tsx
 * @Description: 设置窗口
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import ReactDOM from 'react-dom';
// 引入redux
import { Provider } from 'react-redux';
import { store } from '@store/index';
// 应用设置的入口文件
import Setting from './index';

function App() {
  return (
    <Provider store={store}>
      <Setting />
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
