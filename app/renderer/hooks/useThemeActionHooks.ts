/*
 * @Author: zyh
 * @Date: 2022-08-29 11:08:20
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-29 13:55:11
 * @FilePath: /resume/app/renderer/hooks/useThemeActionHooks.ts
 * @Description: 切换主题
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { selectCurrentTheme } from '@common/components/MyTheme/slice';
import fileAction from '@common/utils/file';
import { getAppPath } from '@common/utils/appPath';
import path from 'path';
import { setThemeList, updateCurrentTheme } from '@common/components/MyTheme/slice';

// 获取当前主题与修改主题方法
function useGetCurrentTheme() {
  const setCurrentTheme = useChangeCurrentTheme();
  const currentTheme = useAppSelector(selectCurrentTheme);
  return {
    currentTheme,
    setCurrentTheme,
  };
}

// 更新当前选中的主题
function useChangeCurrentTheme() {
  const dispatch = useAppDispatch();
  return (theme: TSTheme.Item) => {
    dispatch(updateCurrentTheme(theme));
  };
}

// 初始化读取主题配置文件
function useInitThemeConfig() {
  const dispatch = useAppDispatch();
  const readAppConfigThemeFile = useReadAppConfigThemeFile();
  return () => {
    readAppConfigThemeFile().then((themeConfigValues) => {
      dispatch(setThemeList({ themeConfigValues }));
    });
  };
}

// 读取 appConfig 下的主题配置表文件内容
function useReadAppConfigThemeFile() {
  return () => {
    return new Promise((resolve, reject) => {
      // 获取应用地址
      getAppPath()
        .then((appPath: string) => {
          const jsonPath = path.join(appPath, 'app/renderer/appConfig/theme.config.json');
          fileAction.hasFile(jsonPath).then(async () => {
            const themeConfigValues = await fileAction.read(jsonPath, 'utf-8');
            console.log('themeConfigValues', themeConfigValues);
            resolve(JSON.parse(themeConfigValues));
          });
        })
        .catch(() => {
          reject(new Error('appConfig does not exist!'));
        });
    });
  };
}

export default {
  useGetCurrentTheme,
  useInitThemeConfig,
};
