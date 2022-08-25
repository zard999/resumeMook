/*
 * @Author: zyh
 * @Date: 2022-08-24 15:38:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-25 14:33:47
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseTemplate/templateOne/components/Avatar/index.tsx
 * @Description: 头像
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import './index.less';
import { useSelector } from 'react-redux';
import { selectResume } from '../../../../../slice';
import useUpdateResumeHook from '@src/container/Resume/ResumeContent/useUpdateResumeHook';
import ImageUpload from '@common/components/MyUpload/imageUpload';
import uploadIcon from '@assets/icon/upload.png';
import MyButton from '@common/components/MyButton/index';

function Avatar() {
  const { base } = useSelector(selectResume);
  const updateResumeHook = useUpdateResumeHook();

  // 更新用户的简历头像
  const onUpdateUserAvatar = (avatarUrl: string) => {
    updateResumeHook<string>('base/avatar', avatarUrl);
  };
  return (
    <div styleName="box">
      {!base?.avatar && (
        <ImageUpload
          icon={uploadIcon}
          accept="image/*"
          multiple={false}
          onAfterChange={(files: TSUpload.File[]) => {
            onUpdateUserAvatar(files[0]?.base64URL);
          }}
        />
      )}
      {base?.avatar && (
        <div styleName="avatar">
          <img src={base?.avatar} />
          <div styleName="mask">
            <MyButton size="small" className="btn-change" onClick={() => onUpdateUserAvatar('')}>
              更换
            </MyButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default Avatar;
