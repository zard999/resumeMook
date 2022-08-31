/*
 * @Author: zyh
 * @Date: 2022-08-29 11:08:20
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-31 09:23:51
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
import lodash from 'lodash';
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
  const updateAppConfigThemeFile = useUpdateAppConfigThemeFile();

  return (theme: TSTheme.Item) => {
    dispatch(updateCurrentTheme(theme));
    updateAppConfigThemeFile('currentTheme', theme);
  };
}

// 初始化读取主题配置文件
function useInitThemeConfig() {
  const selectTheme = useSelectTheme();
  const readAppConfigThemeFile = useReadAppConfigThemeFile();
  return () => {
    readAppConfigThemeFile().then((themeConfigValues) => {
      selectTheme(themeConfigValues);
    });
  };
}

// 对比上一轮的选中的主题皮肤
function useSelectTheme() {
  const dispatch = useAppDispatch();
  return (themeConfigValues: any) => {
    const prevTheme = themeConfigValues?.currentTheme || '';
    const initTheme = { id: 'dark', fontColor: '#fff', backgroundColor: '#27292c' };

    let nextTheme: TSTheme.Item;
    if (themeConfigValues?.themeList.length > 0) {
      if (prevTheme) {
        nextTheme = lodash.find(themeConfigValues?.themeList, { id: prevTheme.id }) || initTheme;
      } else {
        nextTheme = themeConfigValues?.themeList[0];
      }
    } else {
      nextTheme = initTheme;
    }
    console.log('nextTheme', nextTheme);
    dispatch(
      setThemeList({
        currentTheme: nextTheme,
        themeList: themeConfigValues?.themeList,
      })
    );
  };
}

// 读取 appConfig 下的主题配置表文件内容
function useReadAppConfigThemeFile() {
  return () => {
    return new Promise((resolve, reject) => {
      // 获取应用地址
      getAppPath()
        .then((appPath: string) => {
          const jsonPath = path.join(appPath, 'appConfig/theme.config.json');
          fileAction.hasFile(jsonPath).then(async () => {
            const themeConfigValues = await fileAction.read(jsonPath, 'utf-8');
            // console.log('themeConfigValues', themeConfigValues);
            resolve(JSON.parse(themeConfigValues));
          });
        })
        .catch(() => {
          reject(new Error('appConfig does not exist!'));
        });
    });
  };
}

// 更新配置表中的用户设置信息
function useUpdateAppConfigThemeFile() {
  const readAppConfigThemeFile = useReadAppConfigThemeFile();
  return (updateKey: string, updateValues: any, callback?: () => void) => {
    // 获取应用地址
    getAppPath().then((appPath: string) => {
      const jsonPath = path.join(appPath, 'appConfig/theme.config.json');
      console.log('nextConfigContent', jsonPath);
      readAppConfigThemeFile().then((themeConfigValues: any) => {
        console.log('nextConfigContent', themeConfigValues);
        if (themeConfigValues && Object.keys(themeConfigValues).length) {
          const nextConfigContent = {
            ...themeConfigValues,
            [`${updateKey}`]: updateValues,
          };
          console.log('nextConfigContent', nextConfigContent);
          fileAction.canWrite(jsonPath).then(() => {
            fileAction.write(jsonPath, nextConfigContent, 'utf-8').then(() => {
              callback && callback();
            });
          });
        }
      });
    });
  };
}

export default {
  useGetCurrentTheme,
  useInitThemeConfig,
};
