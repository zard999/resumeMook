/*
 * @Author: zyh
 * @Date: 2022-08-25 17:19:09
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-26 09:18:37
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseForm/WrapperExperience/index.tsx
 * @Description: 封装复杂Form
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React, { useCallback, useState, useMemo } from 'react';
import Left from './Left';
import Right from './Right';
import Menu from './Right/Menu';
import './index.less';
interface IProps {
  dataList: any[];
  children: React.ReactNode;
  updateDataList: (newDataList: any[]) => void;
}

function WrapperExperience({ children, dataList, updateDataList }: IProps) {
  // 1. 内部维护currentIndex，根据索引从输入 dataList 中获取数据
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentItem, setCurrentItem] = useState(null);

  // 2. 定义 Form 组件中修改当前条目数据源的方法
  const onChangeCurrentItem = useCallback(
    (newValue) => {
      // 当条数据源更新，同步更新整个数组，执行updateDataList方法
    },
    [currentItem]
  );

  const newChildren = useMemo(() => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        // 3. 核心在于，给字组件注入两个属性：当前条目与修改当前条目的方法
        return React.cloneElement(child, {
          currentItem,
          onChangeCurrentItem,
        });
      }
      return child;
    });
  }, [children, currentItem]);
  return (
    <div styleName="form">
      <div styleName="left-box">
        <Left />
      </div>
      <div styleName="right-box">
        <Right>
          <Menu />
          {newChildren}
        </Right>
      </div>
    </div>
  );
}
export default WrapperExperience;
