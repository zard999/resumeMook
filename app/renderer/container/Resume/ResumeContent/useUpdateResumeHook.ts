/*
 * @Author: zyh
 * @Date: 2022-08-25 13:52:16
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-26 15:26:57
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/useUpdateResumeHook.ts
 * @Description: 更新简历hook
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { AdapterExperienceType } from './UseForm/WrapperExperience/adapter';
import {
  selectResume,
  updateBase,
  updateContact,
  updateEducation,
  updateCertificate,
  updateWork,
  updateSkill,
  updateEvaluation,
  updateProjectExperience,
} from '../slice';

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
  const updateWork = useUpdateWorkHook();
  const updateSkill = useUpdateSkillHook();
  const updateEvaluationHook = useUpdateEvaluationHook();
  const updateProjectExperienceHook = useUpdateProjectExperienceHook();

  return <T>(stateKey: string, stateValue: T) => {
    const keys = stateKey.split('/') || [];
    if (keys[0]) {
      console.log('111', stateKey, stateValue, keys);
      if (keys[0] === 'base') updatePersonalHook(keys[1], stateValue);
      if (keys[0] === 'contact') updateContactHook(keys[1], stateValue);
      if (keys[0] === 'education') updateEducationHook(keys[1], stateValue);
      if (keys[0] === 'certificate') updateCertificateHook(keys[0], stateValue);
      if (keys[0] === 'work') updateWork(keys[1], stateValue);
      if (keys[0] === 'skill') updateSkill(keys[0], stateValue);
      if (keys[0] === 'evaluation') updateEvaluationHook(keys[0], stateValue);
      if (keys[0] === 'projectExperience') updateProjectExperienceHook(keys[0], stateValue);
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
    let certificateList = stateValue ? (stateValue as any).split('｜') : [];
    dispatch(
      updateCertificate({
        [stateKey]: stateValue,
        certificateList: certificateList,
      })
    );
  };
}

/**
 * @description: 修改工作期望（work）
 * @return {*}
 */
function useUpdateWorkHook() {
  const dispatch = useAppDispatch();
  const { work } = useAppSelector(selectResume);
  return <T>(stateKey: string, stateValue: T) => {
    console.log('action.payload', stateValue, stateKey);
    if (stateKey !== 'city') {
      return dispatch(
        updateWork({
          ...work,
          [stateKey]: stateValue,
        })
      );
    }

    const cityList = (stateValue as any).split('｜');
    dispatch(
      updateWork({
        ...work,
        [stateKey]: stateValue,
        cityList,
      })
    );
  };
}

/**
 * @description: 修改荣誉证书（certificate）
 * @return {*}
 */
function useUpdateSkillHook() {
  const dispatch = useAppDispatch();
  return <T>(stateKey: string, stateValue: T) => {
    const skillList = (stateValue as any).split('｜');
    dispatch(
      updateSkill({
        [stateKey]: stateValue,
        skillList,
      })
    );
  };
}

/**
 * @description: 修改荣誉证书（certificate）
 * @return {*}
 */
function useUpdateEvaluationHook() {
  const dispatch = useAppDispatch();
  return <T>(stateKey: string, stateValue: T) => {
    const evaluationList = (stateValue as any).split('｜');
    dispatch(
      updateEvaluation({
        [stateKey]: stateValue,
        evaluationList,
      })
    );
  };
}

/**
 * @description: 修改项目经验（ProjectExperience）
 * @return {*}
 */
function useUpdateProjectExperienceHook() {
  const dispatch = useAppDispatch();
  return <T>(stateKey: string, stateValue: T) => {
    console.log('stateValue', stateValue);
    let newList = (stateValue as any)?.map((item: AdapterExperienceType) => {
      let parseContent = item.content ? item.content.split('｜') : [];
      return {
        ...item,
        projectName: item?.title,
        parseContent,
      };
    });
    dispatch(
      updateProjectExperience({
        [stateKey]: newList,
      })
    );
  };
}

export default useUpdateResumeHook;
