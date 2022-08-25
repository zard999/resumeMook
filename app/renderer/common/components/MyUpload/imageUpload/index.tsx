/*
 * @Author: zyh
 * @Date: 2022-08-24 15:05:27
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-24 15:11:35
 * @FilePath: /resume/app/renderer/common/components/MyUpload/imageUpload/index.tsx
 * @Description: 上传图片组件,基于 Input 二次封装
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import './index.less';
import Upload from '../Upload';

interface IProps extends TSUpload.Input {
  icon?: any; // 图标
  text?: any; // 文本
  preventInputManager?: boolean; // 是否阻止input点击之后显示文件管理器
}

const ImageUpload: React.FC<IProps> = ({
  icon,
  text = '上传头像',
  preventInputManager = false,
  onAfterClick = () => {},
  ...otherProps
}) => {
  return (
    <div className="my_input_image_upload_wrapper" onClick={onAfterClick}>
      {!preventInputManager && (
        <div className="my_input_image_upload_input">
          <Upload {...otherProps} onAfterClick={() => {}} style={{ width: '112px', height: '152px' }} />
        </div>
      )}
      <div className="my_input_image_upload_box">
        <img src={icon} className="my_input_image_upload__icon" />
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ImageUpload;
