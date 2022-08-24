/*
 * @Author: zyh
 * @Date: 2022-08-24 15:49:55
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-24 17:33:03
 * @FilePath: /resume/app/renderer/container/Resume/ResumeToolbar/index.tsx
 * @Description: 工具条
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React, { useEffect, useState } from 'react';
import './index.less';
import RESUME_TOOLBAR_LIST from '@common/constants/resume';
import MyScrollBox from '@common/components/MyScrollBox';

function ResumeToolbar() {
  const [addToolbarList, setAddToolbarList] = useState<TSResume.SliderItem[]>([]);
  const [unAddToolbarList, setUnAddToolbarList] = useState<TSResume.SliderItem[]>([]);

  // 添加模块
  const unToAdd = (item: TSResume.SliderItem, index: number) => {
    unAddToolbarList.splice(index, 1);
    addToolbarList.push(item);
    setUnAddToolbarList([...unAddToolbarList]);
    setAddToolbarList([...addToolbarList]);
  };

  // 删除模块
  const addToUn = (item: TSResume.SliderItem, index: number) => {
    addToolbarList.splice(index, 1);
    unAddToolbarList.push(item);
    setUnAddToolbarList([...unAddToolbarList]);
    setAddToolbarList([...addToolbarList]);
  };
  useEffect(() => {
    if (RESUME_TOOLBAR_LIST.length > 0) {
      let _addToolbarList: TSResume.SliderItem[] = [];
      let _unAddToolbarList: TSResume.SliderItem[] = [];
      RESUME_TOOLBAR_LIST.forEach((item: TSResume.SliderItem) => {
        if (item.require) {
          _addToolbarList.push(item);
        } else {
          _unAddToolbarList.push(item);
        }
      });
      setAddToolbarList(_addToolbarList);
      setUnAddToolbarList(_unAddToolbarList);
    }
  }, []);

  const height = document.body.clientHeight;
  return (
    <div styleName="slider">
      <MyScrollBox maxHeight={height - 180}>
        {addToolbarList.length ? (
          <div styleName="module">
            <div styleName="title">
              <span styleName="line" />
              已添加模块
            </div>
            <div styleName="content">
              {addToolbarList.map((addToolbar: TSResume.SliderItem, index: number) => {
                return (
                  <div styleName="box" key={addToolbar.key}>
                    <div styleName="info">
                      <i styleName="icon" />
                      <div styleName="text">
                        <div styleName="name">{addToolbar.name}</div>
                        <div styleName="summary">{addToolbar.summary}</div>
                      </div>
                      {addToolbar.require && <div styleName="tips">必选项</div>}
                      {!addToolbar.require && (
                        <div styleName="action">
                          <i styleName="edit" onClick={(e: React.MouseEvent) => {}} />
                          <i styleName="delete" onClick={() => addToUn(addToolbar, index)} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        {unAddToolbarList.length ? (
          <div styleName="module">
            <div styleName="title">
              <span styleName="line" />
              未添加模块
            </div>
            <div styleName="content">
              {unAddToolbarList.map((unAddToolbar: TSResume.SliderItem, index: number) => {
                return (
                  <div styleName="box" key={unAddToolbar.key} onClick={() => unToAdd(unAddToolbar, index)}>
                    <div styleName="info">
                      <i styleName="icon" />
                      <div styleName="text">
                        <div styleName="name">{unAddToolbar.name}</div>
                        <div styleName="summary">{unAddToolbar.summary}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </MyScrollBox>
    </div>
  );
}

export default ResumeToolbar;
