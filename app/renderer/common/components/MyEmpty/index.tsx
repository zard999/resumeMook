/*
 * @Author: zyh
 * @Date: 2022-08-29 18:11:55
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-29 18:13:23
 * @FilePath: /resume/app/renderer/common/components/MyEmpty/index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import './index.less';

interface IEmptyProps {
  imgSrc: string;
  size?: string;
  style?: React.CSSProperties;
  label?: string;
}

function MyEmpty({ imgSrc, size = 'small', style, label }: IEmptyProps) {
  return (
    <div styleName="empty">
      <img src={imgSrc} style={style} styleName={`img-${size}`} />
      {label && <p styleName="label">{label}</p>}
    </div>
  );
}
export default MyEmpty;
