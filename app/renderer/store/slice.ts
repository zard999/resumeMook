/*
 * @Author: zyh
 * @Date: 2022-08-24 09:33:56
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-24 11:15:11
 * @FilePath: /resume/app/renderer/store/slice.ts
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

export interface GStore {
  rootPath: string; // 项目路径
}

const initialState: GStore = {
  rootPath: '',
};

// 创建redux模块
const globalSlice = createSlice({
  name: 'global',
  initialState, // 初始化状态数据
  reducers: {},
});

export const setAppName = (state: RootState) => state.global.rootPath;
export default globalSlice.reducer; // store里面需要的是reducer
