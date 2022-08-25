/*
 * @Author: zyh
 * @Date: 2022-08-25 13:52:16
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-25 15:38:43
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/useUpdateResumeHook.ts
 * @Description: 更新简历hook
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { selectResume, updateBase, updateContact, updateEducation, updateCertificate } from '../slice';

/**
 * @description: 更新简历信息，这是修改 redux 简历信息的唯一方法
 * @params：（string[]）stateKey 关联key，
 * @params：（string）stateValue
 * @return {*}
 */
function useUpdateResumeHook() {
  const updatePersonalHook = useUpdatePersonalHook();
  const updateContactHook = useUpdateContactHook();
  const updateEducationHook = useUpdateEducationHook();
  const updateCertificateHook = useUpdateCertificateHook();

  return <T>(stateKey: string, stateValue: T) => {
    const keys = stateKey.split('/') || [];
    if (keys[0]) {
      console.log('111', stateKey, stateValue, keys);
      if (keys[0] === 'base') updatePersonalHook(keys[1], stateValue);
      if (keys[0] === 'contact') updateContactHook(keys[1], stateValue);
      if (keys[0] === 'education') updateEducationHook(keys[1], stateValue);
      if (keys[0] === 'certificate') updateCertificateHook(keys[0], stateValue);
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
      updateBase({
        ...base,
        [stateKey]: stateValue,
      })
    );
  };
}

/**
 * @description: 修改教育信息（education）
 * @return {*}
 */
function useUpdateEducationHook() {
  const { education } = useAppSelector(selectResume);
  const dispatch = useAppDispatch();
  return <T>(stateKey: string, stateValue: T) => {
    dispatch(
      updateEducation({
        ...education,
        [stateKey]: stateValue,
      })
    );
  };
}

/**
 * @description: 修改联系方式（contact）
 * @return {*}
 */
function useUpdateContactHook() {
  const { contact } = useAppSelector(selectResume);
  const dispatch = useAppDispatch();
  return <T>(stateKey: string, stateValue: T) => {
    dispatch(
      updateContact({
        ...contact,
        [stateKey]: stateValue,
      })
    );
  };
}

/**
 * @description: 修改荣誉证书（certificate）
 * @return {*}
 */
function useUpdateCertificateHook() {
  const dispatch = useAppDispatch();
  return <T>(stateKey: string, stateValue: T) => {
    let certificateList = stateValue ? (stateValue as any).split('|') : [];
    dispatch(
      updateCertificate({
        [stateKey]: stateValue,
        certificateList: certificateList,
      })
    );
  };
}

export default useUpdateResumeHook;
