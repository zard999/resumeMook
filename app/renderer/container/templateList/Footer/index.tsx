/*
 * @Author: zyh
 * @Date: 2022-08-27 11:31:39
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-27 11:33:24
 * @FilePath: /resume/app/renderer/container/templateList/Footer/index.tsx
 * @Description: Footer
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import './index.less';
import MyButton from '@common/components/MyButton';
import { useHistory } from 'react-router';

function Footer() {
  const history = useHistory();
  const onMadeResume = () => {
    history.push('/resume');
  };
  return (
    <div styleName="footer">
      <MyButton size="middle" className="use-btn" onClick={onMadeResume}>
        以此模版前往制作简历
      </MyButton>
    </div>
  );
}
export default Footer;
