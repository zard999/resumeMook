/*
 * @Author: zyh
 * @Date: 2022-08-24 15:49:07
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-26 18:22:05
 * @FilePath: /resume/app/renderer/container/Resume/ResumeHeader/index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import ROUTER from '@common/constants/router';
import './index.less';
import MyButton from '@common/components/MyButton/index';
import { toPrintPdf } from '@common/utils/htmlToPdf';
import { useAppSelector } from '@store/hooks';
import { selectResume } from '@src/container/Resume/slice';
import MyModal from '@common/components/MyModal';

function ResumeHeader() {
  const history = useHistory();
  const { base, work, education } = useAppSelector(selectResume);
  const [showModal, setShowModal] = useState(false);

  // 返回首页
  const onBack = () => history.push(ROUTER.root);

  // 导出PDF，格式为：姓名+学校+岗位
  const onExport = () => {
    toPrintPdf(`${base?.username}+${education?.school}+${work?.job}`);
  };

  return (
    <div styleName="header">
      <div styleName="back" onClick={onBack}>
        返回
      </div>
      <MyButton size="middle" className="export-btn" onClick={() => setShowModal(true)}>
        导出PDF
      </MyButton>
      {showModal && (
        <MyModal.Confirm
          title="确定要打印简历吗？"
          description="请确保信息的正确，目前仅支持单页打印哦～"
          config={{
            cancelBtn: {
              isShow: true,
              callback: () => setShowModal(false),
            },
            submitBtn: {
              isShow: true,
              callback: () => {
                onExport();
                setShowModal(false);
              },
            },
          }}
        />
      )}
    </div>
  );
}
export default ResumeHeader;
