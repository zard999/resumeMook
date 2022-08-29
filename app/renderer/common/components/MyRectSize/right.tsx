/*
 * @Author: zyh
 * @Date: 2022-08-29 10:17:44
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-29 10:31:54
 * @FilePath: /resume/app/renderer/common/components/MyRectSize/right.tsx
 * @Description: 右侧组件
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';

interface IProps {
  /**
   * @description 自定义样式
   */
  style?: React.CSSProperties;
  children?: React.ReactNode;
  key?: string;
}

class RightComponent extends React.PureComponent<IProps> {
  render() {
    const { key = 'componentRight', style = {}, children } = this.props;
    return (
      <div key={key} className="right-box" style={style}>
        {children}
      </div>
    );
  }
}

export default RightComponent;
