/*
 * @Author: zyh
 * @Date: 2022-08-24 14:18:20
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-24 14:39:46
 * @FilePath: /resume/app/renderer/common/components/MyModal/MyDialog/index.tsx
 * @Description: 封装MyDialog组件
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import MyButton from '../../MyButton';
import { IDialogModal } from '../types';
import './index.less';

function MyDialog({
  title,
  width,
  className,
  showFooter,
  renderFooter,
  config = {},
  eleRef,
  children,
  childStyle,
}: IDialogModal) {
  const { cancelBtn = { isShow: true }, submitBtn = { isShow: true } } = config;
  console.log('dialog', cancelBtn);

  return (
    <div styleName="vis-mask">
      <div styleName="center">
        <div styleName="vis-dialog-box" className={className} style={{ width: width || 760 }} ref={eleRef}>
          <div styleName="vis-dialog-header">{title || 'resumePlatform 提示您'}</div>
          <div
            styleName="vis-dialog-close"
            onClick={() => {
              cancelBtn?.callback && cancelBtn.callback();
            }}
          />
          <div styleName="vis-dialog-content" style={childStyle}>
            {children}
          </div>
          {showFooter &&
            (renderFooter || (
              <div styleName="vis-dialog-footer">
                {cancelBtn?.isShow && (
                  <MyButton
                    size="middle"
                    className="vis-dialog-footer-btn vis-dialog-footer-cancel-btn"
                    onClick={() => {
                      cancelBtn?.callback && cancelBtn.callback();
                    }}
                  >
                    {cancelBtn?.text || '取消'}
                  </MyButton>
                )}
                {submitBtn?.isShow && (
                  <MyButton
                    size="middle"
                    className="vis-dialog-footer-btn vis-dialog-footer-submit-btn"
                    onClick={() => {
                      submitBtn?.callback && submitBtn.callback();
                    }}
                  >
                    {submitBtn?.text || '确定'}
                  </MyButton>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MyDialog;
