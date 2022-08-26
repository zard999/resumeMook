/*
 * @Author: zyh
 * @Date: 2022-08-26 10:18:38
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-26 10:24:23
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseForm/WrapperExperience/utils.ts
 * @Description: 添加和删除封装
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { AdapterExperienceType } from './adapter';
export function onAddExperience(preList: AdapterExperienceType[]) {
  // Array.from参数是一个真正的数组：返回一个新数组
  let nextList: AdapterExperienceType[] = preList ? Array.from(preList) : [];
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
