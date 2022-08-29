/*
 * @Author: zyh
 * @Date: 2022-08-29 10:17:30
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-29 10:30:05
 * @FilePath: /resume/app/renderer/common/components/MyRectSize/parent.tsx
 * @Description: 父组件
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import LeftComponent from './left';
import RightComponent from './right';

interface IProps {
  style?: React.CSSProperties; // 自定义样式
  children?: any;
}

class ParentComponent extends React.Component<IProps> {
  // 定义类组件的静态属性
  static Left = LeftComponent;
  static Right = RightComponent;

  defaultLeftBoxRef = React.createRef();

  getParentStyle() {
    return {
      display: 'flex',
      justifyContent: 'center',
    };
  }

  getLeftStyle() {
    return {
      position: 'absolute',
      left: 16,
    };
  }

  getRightStyle() {
    return {};
  }

  // 获取左侧容器
  get leftBoxRef() {
    const { children } = this.props;
    const leftElement = children[0];
    return leftElement.props.boxRef || this.defaultLeftBoxRef;
  }

  getChild() {
    const { children } = this.props;
    const leftElement = children[0];
    const rightElement = children[1];

    return [
      React.cloneElement(leftElement, {
        style: { ...this.getLeftStyle(), ...(leftElement.props.style || {}) },
        // 一定要给左侧组件传递
        boxRef: this.leftBoxRef,
        key: 'componentLeft',
      }),
      React.cloneElement(rightElement, {
        style: { ...this.getRightStyle(), ...(rightElement.props.style || {}) },
        key: 'componentRight',
      }),
    ];
  }

  render() {
    const { style } = this.props;
    let finialStyle = this.getParentStyle();
    return (
      <div
        className="parent-box"
        style={{
          ...finialStyle,
          ...style,
        }}
      >
        {this.getChild()}
      </div>
    );
  }
}

export default ParentComponent;
