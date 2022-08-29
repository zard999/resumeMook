/*
 * @Author: zyh
 * @Date: 2022-08-27 11:00:56
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-29 10:12:24
 * @FilePath: /resume/app/renderer/container/templateList/Navigation/index.tsx
 * @Description: 侧边栏
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import './index.less';
import TemplateCoverOne from '@assets/template/template1.jpg';
import TemplateCoverTwo from '@assets/template/template2.jpg';
import UseIcon from '@assets/icon/use.png';

import MyButton from '@common/components/MyButton';
import { useAppSelector } from '@store/hooks';
import { selectTemplateList, selectSelectTemplate } from '../slice';

function Navigation() {
  const templateList = useAppSelector(selectTemplateList);
  const selectTemplate = useAppSelector(selectSelectTemplate);
  console.log('templateList', templateList);
  return (
    <div styleName="navigation">
      {templateList &&
        templateList.length > 0 &&
        templateList.map((template: TSTemplate.Item) => (
          <div styleName="template" key={template.templateId}>
            <img styleName="cover" src={template.templateCover} />
            <div styleName="mask">
              {selectTemplate?.templateId === template?.templateId ? (
                <img styleName="use" src={UseIcon} />
              ) : (
                <MyButton
                  size="middle"
                  className="view-btn"
                  onClick={() => {
                    console.log(1);
                  }}
                >
                  预览模版
                </MyButton>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
export default Navigation;
