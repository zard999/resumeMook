/*
 * @Author: zyh
 * @Date: 2022-08-24 09:31:31
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-29 11:06:03
 * @FilePath: /resume/app/renderer/store/index.ts
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { configureStore } from '@reduxjs/toolkit';
import globalSlice from './slice';
import resumeSlice from '@src/container/Resume/slice';
import templateSlice from '@src/container/templateList/slice';
import themeSlice from '@src/common/components/MyTheme/slice';

export const store = configureStore({
  reducer: {
    global: globalSlice,
    resume: resumeSlice,
    template: templateSlice,
    theme: themeSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
