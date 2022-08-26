/*
 * @Author: zyh
 * @Date: 2022-08-26 10:18:38
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-26 16:01:13
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseForm/WrapperExperience/utils.ts
 * @Description: 添加和删除封装
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { AdapterExperienceType } from './adapter';
export function onAddExperience(prevList: AdapterExperienceType[]) {
  // Array.from参数是一个真正的数组：返回一个新数组
  let nextList: AdapterExperienceType[] = prevList ? Array.from(prevList) : [];
  const item: AdapterExperienceType = {
    title: '未命名条目',
    date: new Date().valueOf(),
    post: '',
    content: '',
    parseContent: [],
    beginTime: '',
    endTime: '',
    supplement: '',
  };
  nextList.unshift(item);
  return nextList;
}

export function onDeleteExperience(index: number, prevList: AdapterExperienceType[]) {
  let nextList: AdapterExperienceType[] = prevList ? Array.from(prevList) : [];
  nextList.splice(index, 1);
  return nextList;
}
