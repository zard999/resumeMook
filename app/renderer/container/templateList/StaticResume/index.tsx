/*
 * @Author: zyh
 * @Date: 2022-08-27 11:35:47
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-29 18:34:48
 * @FilePath: /resume/app/renderer/container/templateList/StaticResume/index.tsx
 * @Description: 静态模版组件
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import './index.less';
import MyScrollBox from '@common/components/MyScrollBox';
import * as TemplateList from '@src/container/templates';
import Footer from '../Footer';
import { useAppSelector } from '@store/hooks';
import { selectSelectTemplate } from '@src/container/templateList/slice';
import MyEmpty from '@common/components/MyEmpty';
import MyButton from '@common/components/MyButton';
import EmptyPng from '@assets/icon/empty.png';
import { shell } from 'electron';

// 合法且存在的模版
const VALID_TEMPLATE = [0];

function StaticResume() {
  const HEADER_HEIGHT = 76; // 距离头部距离
  const height = document.body.clientHeight;
  const selectTemplate = useAppSelector(selectSelectTemplate);

  // 判断该模版是否合法且存在组件模版
  const isIncludeTemplate = VALID_TEMPLATE.includes(selectTemplate.templateIndex);
  const isValidTemplate = selectTemplate.templateIndex >= 0;
  console.log('isIncludeTemplate', isIncludeTemplate, isValidTemplate);
  return (
    <div styleName="container">
      <MyScrollBox maxHeight={height - HEADER_HEIGHT}>
        {isValidTemplate && isIncludeTemplate && (
          <>
            {selectTemplate.templateIndex === 0 && <TemplateList.TemplateOne />}
            <Footer />
          </>
        )}
        {/* 缺省页 */}
        {isValidTemplate && !isIncludeTemplate && <LackDesc label="暂未开发此模版，欢迎点击下方按钮进行模版贡献" />}
        {!isValidTemplate && <LackDesc label="暂无模版数据，欢迎点击下方按钮进行模版贡献" />}
      </MyScrollBox>
    </div>
  );
}
export default StaticResume;

// 贡献模版
const LackDesc = React.memo(({ label }: { label: string }) => {
  return (
    <div styleName="empty">
      <MyEmpty imgSrc={EmptyPng} label={label} />
      <div styleName="footer">
        <MyButton
          size="middle"
          className="use-btn"
          onClick={() => {
            shell.openExternal('https://github.com/PDKSophia/visResumeMook/issues/4');
          }}
        >
          贡献模版
        </MyButton>
      </div>
    </div>
  );
});
