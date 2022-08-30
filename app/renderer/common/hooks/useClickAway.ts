/*
 * @Author: zyh
 * @Date: 2022-08-30 15:04:17
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-30 15:52:55
 * @FilePath: /resume/app/renderer/common/hooks/useClickAway.ts
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { useEffect, useRef, useState } from 'react';

/**
 * @description: 点击元素之外区域关闭
 * @param {boolean} initIsVisible
 * @return {*}
 */
function useClickAway(initIsVisible: boolean) {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  //   const ref = useRef<HTMLDivElement>();
  const [componentVisible, setComponentVisible] = useState(initIsVisible);

  useEffect(() => {
    // true代表事件句柄在捕获阶段执行
    document.addEventListener('click', onClickOutSide, true);
    return () => document.removeEventListener('click', onClickOutSide, true);
  });

  // 点击元素之外触发的函数
  const onClickOutSide = (event: any) => {
    // contains：包含
    if (ref.current && !ref.current.contains(event.target)) {
      setComponentVisible(false);
    }
  };

  return { ref, componentVisible, setComponentVisible };
}

export default useClickAway;
