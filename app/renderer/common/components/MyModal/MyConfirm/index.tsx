/*
 * @Author: zyh
 * @Date: 2022-08-24 14:02:24
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-24 14:17:40
 * @FilePath: /resume/app/renderer/common/components/MyModal/MyConfirm/index.tsx
 * @Description: 封装Confirm组件
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import MyButton from '../../MyButton';
import { IConfirmModal } from '../types';
import './index.less';

function MyConfirm({ title, width, className, description, renderFooter, config = {}, eleRef }: IConfirmModal) {
  const { deleteBtn = { isShow: false }, cancelBtn = { isShow: true }, submitBtn = { isShow: true } } = config;
  return (
    <div styleName="vis-mask">
      <div styleName="center">
        <div styleName="vis-confirm-box" className={className} style={{ width: width || 440 }} ref={eleRef}>
          <div styleName="vis-confirm-content">
            <p styleName="vis-confirm-content-title">{title || '友情提示'}</p>
            {description && <p styleName="vis-confirm-content-desc">{description}</p>}
          </div>
          {renderFooter || (
            <div styleName="vis-confirm-footer">
              {cancelBtn?.isShow && (
                <MyButton
                  size="middle"
                  className="vis-confirm-footer-btn vis-confirm-footer-cancel-btn"
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
                  className="vis-confirm-footer-btn vis-confirm-footer-submit-btn"
                  onClick={() => {
                    submitBtn?.callback && submitBtn.callback();
                  }}
                >
                  {submitBtn?.text || '确定'}
                </MyButton>
              )}
              {deleteBtn?.isShow && (
                <MyButton
                  size="middle"
                  className="vis-confirm-footer-btn vis-confirm-footer-delete-btn"
                  onClick={() => {
                    deleteBtn?.callback && deleteBtn.callback();
                  }}
                >
                  {deleteBtn?.text || '退出'}
                </MyButton>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default MyConfirm;
