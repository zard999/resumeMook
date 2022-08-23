/*
 * @Author: zyh
 * @Date: 2022-08-23 15:14:22
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-23 15:16:00
 * @FilePath: /resume/app/renderer/Title/index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from "react";
interface IProps {
  text: string;
  styles?: React.CSSProperties;
}

function Title({ text, styles }: IProps) {
  return <div style={styles}>{text}</div>;
}

export default Title;
