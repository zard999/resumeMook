/*
 * @Author: zyh
 * @Date: 2022-08-29 11:03:26
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-29 11:53:55
 * @FilePath: /resume/app/renderer/common/components/MyTheme/slice.ts
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../store/index';

export interface TStore {
  themeList: TSTheme.Item[]; // 主题列表
  currentTheme: TSTheme.Item; // 当前选中的主题
}

const initialState: TStore = {
  themeList: [],
  currentTheme: {
    id: '',
    fontColor: '',
    backgroundColor: '',
  },
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // 初始化设置主题列表
    setThemeList(state, action) {
      state.themeList = action.payload.themeConfigValues.themeList;
      state.currentTheme = action.payload.themeConfigValues.currentTheme;
    },
  },
});

// slice
export const selectCurrentTheme = (state: RootState) => state.theme.currentTheme;
export const selectThemeList = (state: RootState) => state.theme.themeList;

// reducer
export const { setThemeList } = themeSlice.actions;

export default themeSlice.reducer;
