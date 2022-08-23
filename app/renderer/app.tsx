/*
 * @Author: zyh
 * @Date: 2022-08-23 14:01:13
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-23 16:01:42
 * @FilePath: /resume/app/renderer/app.tsx
 * @Description: App
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import Title from './Title';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <div>resume平台</div>
          <div>这是</div>
          <Title text="hhh" styles={{ color: 'red' }} />
        </Route>
      </Switch>
    </Router>
  );
}
ReactDOM.render(<App />, document.getElementById('root'));
