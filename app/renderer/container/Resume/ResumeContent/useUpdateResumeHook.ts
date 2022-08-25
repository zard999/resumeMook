/*
 * @Author: zyh
 * @Date: 2022-08-25 13:52:16
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-25 14:35:25
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/useUpdateResumeHook.ts
 * @Description: 更新简历hook
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { selectResume, updateResume } from '../slice';

/**
 * @description: 更新简历信息，这是修改 redux 简历信息的唯一方法
 * @params：（string[]）stateKey 关联key，
 * @params：（string）stateValue
 * @return {*}
 */
function useUpdateResumeHook() {
  const updatePersonalHook = useUpdatePersonalHook();
  return <T>(stateKey: string, stateValue: T) => {
    const keys = stateKey.split('/') || [];
    if (keys[0]) {
      console.log('111', stateKey, stateValue, keys);
      if (keys[0] === 'base') updatePersonalHook(keys[1], stateValue);
    }
  };
}

/**
 * @description: 修改个人信息（base）
 * @return {*}
 */
function useUpdatePersonalHook() {
  const { base } = useAppSelector(selectResume);
  const dispatch = useAppDispatch();
  return <T>(stateKey: string, stateValue: T) => {
    dispatch(
      updateResume({
        ...base,
        [stateKey]: stateValue,
      })
    );
  };
}

export default useUpdateResumeHook;
