/*
 * @Author: zyh
 * @Date: 2022-08-29 09:44:51
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-29 18:22:38
 * @FilePath: /resume/app/renderer/container/templateList/slice.ts
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@store/index';

export interface TStore {
  ResumeToolbarKeys: string[]; // 选中工具条模块的keys
  templateList: TSTemplate.Item[]; // 模块列表
  selectTemplate: TSTemplate.Item; // 当前选择的模版
}

const initialState = {
  ResumeToolbarKeys: [],
  templateList: [],
  selectTemplate: {
    templateId: '',
    templateName: '',
    templateCover: '',
    templateIndex: -1,
  },
};

const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    // 添加
    addTemplateList(state, action) {
      state.templateList = action.payload.templateList;
      state.selectTemplate = action.payload.templateList[0];
    },

    // 修改选中的模版
    updateSelectTemplate(state, action) {
      console.log('updateSelectTemplate', action.payload);
      state.selectTemplate = action.payload;
    },
  },
});

// selector所需要的函数
export const selectTemplateList = (state: RootState) => state.template.templateList;
export const selectSelectTemplate = (state: RootState) => state.template.selectTemplate;

export const { addTemplateList, updateSelectTemplate } = templateSlice.actions;

export default templateSlice.reducer;
