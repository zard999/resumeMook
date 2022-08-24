import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@store/index';

// interface IState {
//   resumeToolbarKeys: string[];
// }

const initialState = {
  resumeToolbarKeys: [] as string[], // 选中工具条模块的keys
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
  },
});

// useAppSelector所需要的函数
export const selectResumeToolbarKeys = (state: RootState) => state.resume.resumeToolbarKeys;

// 导出reducer
export const { setResumeToolbarKeys } = resumeSlice.actions;

export default resumeSlice.reducer;
