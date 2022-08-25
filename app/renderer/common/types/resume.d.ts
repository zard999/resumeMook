/*
 * @Author: zyh
 * @Date: 2022-08-24 15:21:56
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-25 11:46:32
 * @FilePath: /resume/app/renderer/common/types/resume.d.ts
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
declare namespace TSResume {
  // 基本信息
  export interface Base {
    avatar?: string; // 头像
    username: string; // 姓名
    area?: string; // 地区
    school?: string; // 学校

    // 学年
    onSchoolTime?: {
      beginTime: string | number | null; // 入校时间
      endTime: string | number | null; // 离校时间
    };
    major?: string; // 专业
    degree?: string; // 学位
    hometown?: string; // 籍贯
    political?: string; // 政治面貌
  }

  // 联系方式
  export interface Contact {
    phone?: string; // 电话号码
    email?: string; // 邮箱
    github?: string; // github
    juejin?: string; // 掘金
  }

  // 求职信息
  export interface Work {
    job?: string; // 意愿岗位
    city?: string; // 意愿城市
    cityList?: string[]; // 意愿城市列表
  }

  // 在校经验
  export interface SchoolExperience extends Experience {
    department?: string; // 部门
    post?: string; // 职位
    content?: string; // 主要工作
    parseContent?: string[];
  }

  // 工作经验
  export interface WorkExperience extends Experience {
    department?: string; // 部门
    post?: string; // 职位
    content?: string; // 主要工作
    parseContent?: string[];
  }

  // 项目经验
  export interface ProjectExperience extends Experience {
    projectName?: string; // 项目名
    post?: string; // 职位
    content?: string; // 主要工作
    parseContent?: string[];
  }

  // 经验
  interface Experience {
    beginTime?: number | string | undefined; // 开始时间
    endTime?: number | string | undefined; // 结束时间
    supplement?: string; // 额外补充内容
    date?: number; // 最后修改时间
  }

  // 一份完整的简历信息
  export interface IntactResume {
    base: Base;
    skill: string;
    skillList: string[];
    hobby: string;
    evaluation: string;
    evaluationList: string[];
    certificate: string;
    certificateList: string[];
    contact: Contact;
    work: Work;
    workExperience?: WorkExperience[];
    schoolExperience?: SchoolExperience[];
    projectExperience?: ProjectExperience[];
  }

  // 简历模版
  export interface TemplateItem {
    id: string; // 唯一标识
    name: string; // 模版名
    cover: string; // 模版封面
  }

  // 简历工具条模块
  export interface SliderItem {
    key: string; //  唯一标识
    name: string; // 模块名
    summary: string; // 描述
    require?: boolean; // 是否必须
  }
}
