/*
 * @Author: zyh
 * @Date: 2022-08-24 09:41:52
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-24 09:44:36
 * @FilePath: /resume/app/renderer/store/hooks.ts
 * @Description: 封装导出hook
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, RootState } from './index';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
