/*
 * @Author: zyh
 * @Date: 2022-08-24 15:49:55
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-24 23:05:58
 * @FilePath: /resume/app/renderer/container/Resume/ResumeToolbar/index.tsx
 * @Description: 工具条
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React, { useEffect, useState } from 'react';
import './index.less';
import RESUME_TOOLBAR_LIST from '@common/constants/resume';
import MyScrollBox from '@common/components/MyScrollBox';
import { setResumeToolbarKeys, selectResumeToolbarKeys } from '../slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import Messager, { MESSAGE_EVENT_NAME_MAPS } from '@common/message';

function ResumeToolbar() {
  const [addToolbarList, setAddToolbarList] = useState<TSResume.SliderItem[]>([]);
  const [unAddToolbarList, setUnAddToolbarList] = useState<TSResume.SliderItem[]>([]);

  const dispatch = useAppDispatch();
  const resumeToolbarKeys = [...useAppSelector(selectResumeToolbarKeys)];

  // 添加模块
  const unToAdd = (item: TSResume.SliderItem, index: number) => {
    unAddToolbarList.splice(index, 1);
    addToolbarList.push(item);
    setUnAddToolbarList([...unAddToolbarList]);
    setAddToolbarList([...addToolbarList]);

    // 添加key
    if (!resumeToolbarKeys.includes(item.key)) {
      resumeToolbarKeys.push(item.key);
      dispatch(setResumeToolbarKeys(resumeToolbarKeys));
    }
  };

  // 删除模块
  const addToUn = (item: TSResume.SliderItem, index: number) => {
    addToolbarList.splice(index, 1);
    unAddToolbarList.push(item);
    setUnAddToolbarList([...unAddToolbarList]);
    setAddToolbarList([...addToolbarList]);

    // 删除key
    let findIndex = resumeToolbarKeys.findIndex((d) => d === item.key);
    if (findIndex) {
      resumeToolbarKeys.splice(findIndex, 1);
      dispatch(setResumeToolbarKeys(resumeToolbarKeys));
    }
  };
  useEffect(() => {
    // 初始化
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

      // 向redux添加keys
      dispatch(setResumeToolbarKeys(_addToolbarList.map((item) => item.key)));
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
                  <div
                    styleName="box"
                    key={addToolbar.key}
                    onClick={() => {
                      console.log('MESSAGE_EVENT_NAME_MAPS.OPEN_FORM_MODAL', MESSAGE_EVENT_NAME_MAPS.OPEN_FORM_MODAL);
                      Messager.send(MESSAGE_EVENT_NAME_MAPS.OPEN_FORM_MODAL, {
                        form_name: addToolbar.key,
                      });
                    }}
                  >
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
