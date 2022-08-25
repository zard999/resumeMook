/*
 * @Author: zyh
 * @Date: 2022-08-24 15:38:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-25 11:14:00
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseTemplate/templateOne/components/Synopsis/index.tsx
 * @Description: 简单介绍
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import './index.less';
import { useSelector } from 'react-redux';
import { selectResume } from '../../../../../slice';

function Synopsis() {
  const { base, work, evaluation, evaluationList } = useSelector(selectResume);
  return (
    <div styleName="content">
      {base?.username && <p styleName="name">{base?.username}</p>}
      {work?.job && <p styleName="job">{work?.job}</p>}
      {evaluation && <p styleName="summary">{evaluationList.join('，')}</p>}
    </div>
  );
}

export default Synopsis;
