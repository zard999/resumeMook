/*
 * @Author: zyh
 * @Date: 2022-08-23 14:01:13
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-23 18:13:00
 * @FilePath: /resume/app/renderer/app.tsx
 * @Description: App
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';

function App() {
  return <Router />;
}
ReactDOM.render(<App />, document.getElementById('root'));
