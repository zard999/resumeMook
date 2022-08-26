/*
 * @Author: zyh
 * @Date: 2022-08-24 15:06:31
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-24 15:11:48
 * @FilePath: /resume/app/renderer/common/components/MyUpload/Upload/index.tsx
 * @Description: 通用上传控件，默认自带的input样式
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React, { useRef } from 'react';
import './index.less';
import classnames from 'classnames';
import FileEvent from '../fileEvent';

function Upload({ style, accept, multiple = false, visible = true, onAfterClick, onAfterChange }: TSUpload.Input) {
  const inputSelectorRef = useRef(null);

  function onChange(e: any) {
    const fileList: any = e?.target?.files || [];
    if (e.target.value === '') {
      return;
    }
    let instance: TSUpload.File[] = [];
    // fileList 属于 [object FileList] 类型
    for (let file of fileList) {
      instance.push(new FileEvent(file));
    }
    onAfterChange && onAfterChange(instance);
  }

  return (
    <input
      type="file"
      style={style}
      accept={accept}
      multiple={multiple}
      ref={inputSelectorRef}
      onClick={onAfterClick}
      onChange={onChange}
      className={classnames('my_input_selector', {
        my_input_selector_visible: visible,
        my_input_selector_hidden: !visible,
      })}
    />
  );
}

export default Upload;
