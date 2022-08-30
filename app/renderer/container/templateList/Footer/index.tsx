/*
 * @Author: zyh
 * @Date: 2022-08-27 11:31:39
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-30 11:10:41
 * @FilePath: /resume/app/renderer/container/templateList/Footer/index.tsx
 * @Description: Footer
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import './index.less';
import MyButton from '@common/components/MyButton';
import { useHistory } from 'react-router';
import { compilePath } from '@common/utils/router';
import ROUTER from '@common/constants/router';
import { ROUTER_KEY } from '@common/constants/router';
import { useAppSelector } from '@store/hooks';
import { selectSelectTemplate } from '@src/container/templateList/slice';

function Footer() {
  const history = useHistory();
  const selectTemplate = useAppSelector(selectSelectTemplate);

  const onMadeResume = () => {
    // 跳转路由的修改
    history.push(
      compilePath(ROUTER.resume, {
        fromPath: ROUTER_KEY.templateList,
        templateId: selectTemplate?.templateId,
        templateIndex: selectTemplate?.templateIndex,
      })
    );
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
