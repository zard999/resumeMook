import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@store/index';

export interface RStore {
  resumeToolbarKeys: string[];
  resume: TSResume.IntactResume; // 简历模版数据
}

const initialState: RStore = {
  resumeToolbarKeys: [] as string[], // 选中工具条模块的keys
  resume: {
    base: {
      avatar: '',
      username: '张永辉',
      area: '广东·深圳',
      hometown: '湖北',
    },
    education: {
      school: '湖北瞎说大学',
      major: '计算机科学与技术',
      degree: '本科',
      onSchoolTime: {
        beginTime: '2020.09',
        endTime: '2022.06',
      },
    },
    contact: {
      phone: '13545438280',
      email: '1874861374@qq.com',
      github: 'https://github.com/zard999',
      juejin: 'https://juejin.cn/user/1390225439328023',
    },
    work: {
      job: '前端工程师',
      city: '深圳｜武汉',
      cityList: ['深圳', '武汉'],
    },
    hobby: '电影、游戏、爬山、滑板、跳绳',
    skill:
      '熟悉 Vue.js，了解数据双向绑定原理、阅读过 nextTick 源码｜熟悉 React，了解并使用 Hooks 特性，阅读过 redux 源码，开发 rc-redux-model 中间件｜阅读过 Antd 部分优秀组件源码，并参考借鉴，开发组内 UI 组件库｜了解 Vscode，开发组内项目辅助工具 vscode-beehive-extension 插件｜了解 Webpack 编译原理，了解 babel 转码原理，编写过 babel 插件｜了解 Electron，了解 Node.js 以及 Git 团队协作开发工具｜了解设计模式，对于特定场景，能采用合适的设计模式进行解决｜了解 MYSQL，了解数据库优化常用方法｜了解基于微信公众号应用开发，采用 Taro 开发微信小程序，具备良好的网络基础知识',
    skillList: [
      '熟悉 Vue.js，了解数据双向绑定原理、阅读过 nextTick 源码',
      '熟悉 React，了解并使用 Hooks 特性，阅读过 redux 源码',
      '了解 Electron，了解 Node.js 以及 Git 团队协作开发工具',
      '了解设计模式，对于特定场景，能采用合适的设计模式进行解决',
      '了解 MYSQL，了解数据库优化常用方法',
      '了解基于微信公众号应用开发，采用 Taro 开发微信小程序，具备良好的网络基础知识',
    ],
    evaluation: '切图工程师，投身开源',
    evaluationList: ['切图工程师', '投身开源'],
    certificate: '深圳第一届喝酒大赛参与奖',
    certificateList: ['深圳第一届喝酒大赛参与奖'],
    schoolExperience: [
      {
        beginTime: '2016.09',
        endTime: '2017.09',
        post: '文艺部会长',
        department: '校团委学生会',
        content:
          '计划、组织、协调各年级学生组织的文艺和文化娱乐活动｜承办好学生会部的学生文艺晚会。有效地与社团部开展合作项目',
        parseContent: [
          '计划、组织、协调各年级学生组织的文艺和文化娱乐活动',
          '承办好学生会部的学生文艺晚会。有效地与社团部开展合作项目',
        ],
      },
    ],
    workExperience: [
      {
        beginTime: '2017.09',
        endTime: '2019.04',
        post: '前端工程师',
        department: '湖北瞎说大学网络中心',
        content:
          '担任TickNet工作室前端工程师，与湖南瞎说大学网络中心合作，围绕微信企业号开发或主导多个应用｜任职期间基于微信企业号开发校内闲余市场，采用Vue.js主导开发，并与湖南xxx科技有限公司合作，主导开发该公司官网及后台管理',
        parseContent: [
          '担任TickNet工作室前端工程师，与湖南瞎说大学网络中心合作，围绕微信企业号开发或主导多个应用',
          '任职期间基于微信企业号开发校内闲余市场，采用Vue.js主导开发，并与武汉xxx科技有限公司合作，主导开发该公司官网及后台管理',
        ],
      },
    ],
    projectExperience: [
      {
        beginTime: '2021.03',
        endTime: '2021.05',
        projectName: 'resumeMook 可视化简历平台',
        post: '前端工程师',
        content:
          'Electron + React Hooks 打造简历平台，只需输入一次信息，套用多份模版｜通过 jsonfile 方式实现主题换肤，支持导出 PDF 简历文档｜通过 indexDB 方式实现历史简历缓存，通过可视化拖拽形式，自定义组件模版',
        parseContent: [
          'Electron + React Hooks 打造简历平台，只需输入一次信息，套用多份模版',
          '通过 jsonfile 方式实现主题换肤，支持导出 PDF 简历文档',
          '通过 indexDB 方式实现历史简历缓存，通过可视化拖拽形式，自定义组件模版',
        ],
        date: 1621145137865,
      },
    ],
  },
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    // 设置keys（包括初始化，添加，删除）
    setResumeToolbarKeys(state, action) {
      const resumeToolbarKeys = action.payload;
      state.resumeToolbarKeys = resumeToolbarKeys;
      console.log('resumeToolbarKeys', state.resumeToolbarKeys);
    },

    // 修改resume
    updateResume(state, action) {
      console.log('updateResume', action);
      state.resume.base = action.payload;
    },
  },
});

// useAppSelector所需要的函数
export const selectResumeToolbarKeys = (state: RootState) => state.resume.resumeToolbarKeys;
export const selectResume = (state: RootState) => state.resume.resume;

// 导出reducer
export const { setResumeToolbarKeys, updateResume } = resumeSlice.actions;

export default resumeSlice.reducer;
