/*
 * @Author: zyh
 * @Date: 2022-08-24 11:19:28
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-24 11:43:27
 * @FilePath: /resume/app/renderer/common/components/MyButton/index.tsx
 * @Description: 封装Button组件
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import classnames from 'classnames';
import './index.less';

export interface Button {
  size?: 'small' | 'middle' | 'big'; // 按钮大小
  width?: number; // 宽度
  style?: React.CSSProperties; // 自定义样式
  disabled?: boolean; // 禁止
  className?: string; // 样式名
  onClick?: Function; // 点击事件
  border?: boolean; // 是否显示边框
  children?: React.ReactNode | any; // 字组件
}

export default function MyButton({
  size = 'small',
  style,
  width,
  children,
  disabled,
  className,
  onClick,
  border = true,
}: Button) {
  return (
    <div
      style={{
        ...style,
        width,
      }}
      className={className}
      styleName={classnames('es-button', {
        [`es-button-${size}`]: true,
        'es-button-disabled': disabled,
        'es-button-border': border,
      })}
      onClick={() => onClick && onClick()}
    >
      {children}
    </div>
  );
}
