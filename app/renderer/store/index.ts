/*
 * @Author: zyh
 * @Date: 2022-08-24 09:31:31
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-24 17:41:52
 * @FilePath: /resume/app/renderer/store/index.ts
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { configureStore } from '@reduxjs/toolkit';
import globalSlice from './slice';
import resumeSlice from '@src/container/Resume/slice';

export const store = configureStore({
  reducer: {
    global: globalSlice,
    resume: resumeSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
