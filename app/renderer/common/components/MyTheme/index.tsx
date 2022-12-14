/*
 * @Author: zyh
 * @Date: 2022-08-29 10:49:10
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-29 14:01:20
 * @FilePath: /resume/app/renderer/common/components/MyTheme/index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import { useAppSelector } from '@store/hooks';
import { selectThemeList } from '@common/components/MyTheme/slice';
import useThemeActionHooks from '@src/hooks/useThemeActionHooks';
import './index.less';

function MyTheme() {
  const themeList = useAppSelector(selectThemeList);
  const { currentTheme, setCurrentTheme } = useThemeActionHooks.useGetCurrentTheme();
  // console.log('currentTheme', currentTheme);
  return (
    <div styleName="box">
      {themeList.length > 0 &&
        themeList.map((t: TSTheme.Item, index: number) => {
          return (
            <span
              key={index}
              style={{ backgroundColor: t.backgroundColor }}
              styleName={`${currentTheme?.id === t?.id ? 'active' : ''}`}
              onClick={() => {
                setCurrentTheme && setCurrentTheme(t);
              }}
            />
          );
        })}
    </div>
  );
}

export default MyTheme;
