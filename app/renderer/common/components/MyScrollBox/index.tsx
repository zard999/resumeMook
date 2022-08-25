/*
 * @Author: zyh
 * @Date: 2022-08-24 14:52:21
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-24 14:55:45
 * @FilePath: /resume/app/renderer/common/components/MyScrollBox/index.tsx
 * @Description: 封装Scroll组件
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import './index.less';

interface IProps {
  children: React.ReactNode | any; // 子组件
  maxHeight?: number; // 最大高度，默认200
  style?: React.CSSProperties; //  根div样式
  innerStyle?: React.CSSProperties; // 最内部的div样式
  onScrollTop?: (scrollTop: number) => void; // 开启了滚动事件之后，回调得到滚动的top
}
function MyScrollBox({ children, maxHeight = 200, style = {}, innerStyle = {}, onScrollTop }: IProps) {
  function onScroll(e: any) {
    const _event = e.target || e.currentTarget;
    onScrollTop && onScrollTop(_event.scrollTop);
  }
  let _style = { ...style };
  if (maxHeight) {
    _style = { ..._style, maxHeight: `${maxHeight}px` };
  }
  return (
    <div className="scroll-box-outer" style={_style} onScroll={onScroll}>
      <div className="scroll-box-hidden" style={{ maxHeight: `${maxHeight}px` }}>
        <div className="scroll-box-inter" style={innerStyle}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default MyScrollBox;
