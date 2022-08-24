/*
 * @Author: zyh
 * @Date: 2022-08-24 09:33:56
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-24 10:01:47
 * @FilePath: /resume/app/renderer/store/slice.ts
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

const initialState = {
  appName: '简历应用平台',
};

// 创建redux模块
const globalSlice = createSlice({
  name: 'global',
  initialState, // 初始化状态数据
  reducers: {},
});

export const setAppName = (state: RootState) => state.global.appName;
export default globalSlice.reducer; // store里面需要的是reducer
