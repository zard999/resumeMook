/*
 * @Author: zyh
 * @Date: 2022-08-25 17:42:01
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-25 17:59:54
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseForm/WrapperExperience/adapter.ts
 * @Description: 适配器模块：将不同数据适配成 List 组件所需的数据格式，本质就是求并集
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
// 定义一个统一的数据格式
export interface AdapterExperienceType {
  title?: string; // 标题
  post?: string; // 职位
  content?: string; // 主要工作
  parseContent?: string[];
  beginTime?: number | string | undefined; // 开始时间
  endTime?: number | string | undefined; // 结束时间
  supplement?: string; // 额外补充内容
  date?: number; // 最后编辑时间
}

const AdapterExperience = {
  // 项目经验
  project(list: TSResume.ProjectExperience[]): AdapterExperienceType[] {
    if (!list || list?.length === 0) return [];
    const experienceList: AdapterExperienceType[] = list.map((item: TSResume.ProjectExperience) => {
      return {
        ...item,
        title: item.projectName,
      };
    });
    return experienceList;
  },
};

export default AdapterExperience;
