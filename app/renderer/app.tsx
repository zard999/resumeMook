/*
 * @Author: zyh
 * @Date: 2022-08-23 14:01:13
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-24 09:38:36
 * @FilePath: /resume/app/renderer/app.tsx
 * @Description: App
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import { store } from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
ReactDOM.render(<App />, document.getElementById('root'));
