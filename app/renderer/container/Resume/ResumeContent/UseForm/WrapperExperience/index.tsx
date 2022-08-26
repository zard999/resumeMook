/*
 * @Author: zyh
 * @Date: 2022-08-25 17:19:09
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-26 11:37:53
 * @FilePath: /resume/app/renderer/container/Resume/ResumeContent/UseForm/WrapperExperience/index.tsx
 * @Description: 封装复杂Form
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React, { useCallback, useState, useMemo, useEffect } from 'react';
import Left from './Left';
import Right from './Right';
import Menu from './Right/Menu';
import './index.less';
import { AdapterExperienceType } from './adapter';
import { onAddExperience } from './utils';
import MyModal from '@common/components/MyModal';
interface IProps {
  dataList: any[];
  children: React.ReactNode;
  updateDataList: (newDataList: any[]) => void;
}

function WrapperExperience({ children, dataList, updateDataList }: IProps) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentItem, setCurrentItem] = useState<AdapterExperienceType>({});
  const [experienceList, setExperienceList] = useState<AdapterExperienceType[]>([]);

  // 编辑状态
  const [editModal, setEditModal] = useState({
    status: false, // 编辑状态
    showByCancel: false, // 编辑状态下的取消弹窗
  });

  // 1. 初次当条目列表不为空，默认选中第一条
  useEffect(() => {
    if (dataList && dataList?.length > 0) {
      setCurrentIndex(0);
    }
  }, []);

  // 2. 当条目数据列表修改更新时更新数据
  useEffect(() => {
    if (dataList && dataList?.length > 0) {
      setExperienceList(dataList);
    } else {
      setExperienceList([]);
    }
  }, [dataList]);

  // 3. 当条目索引发生变化，更新当前选中的条目数据
  useEffect(() => {
    if (currentIndex >= 0) {
      setCurrentItem(experienceList[currentIndex]);
    }
  }, [currentIndex, experienceList]);

  // 4. 添加条目
  const onAddItem = () => {
    const newExperienceList = onAddExperience(experienceList);
    if (newExperienceList.length > 0) {
      setCurrentIndex(0);
      setExperienceList(newExperienceList);
      updateDataList && updateDataList(newExperienceList);
    }
  };

  const onChangeCurrentItem = useCallback(
    (newValue) => {
      // 当条数据源更新，同步更新整个数组，执行updateDataList方法
    },
    [currentItem]
  );

  // 修改编辑状态
  const onToggleEditModal = useCallback(
    (config) => {
      setEditModal((prev) => ({ ...prev, ...config }));
    },
    [editModal]
  );

  const newChildren = useMemo(() => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        // 核心在于，给字组件注入两个属性：当前条目与修改当前条目的方法
        return React.cloneElement(child, {
          currentItem,
          onChangeCurrentItem,
        });
      }
      return child;
    });
  }, [children, currentItem]);
  return (
    <div styleName="form">
      <div styleName="left-box">
        <Left currentIndex={currentIndex} experienceList={experienceList} onAdd={onAddItem} />
      </div>
      <div styleName="right-box">
        <Right>
          <Menu
            isEdit={editModal?.status}
            currentItem={currentItem}
            onChangeEditStatus={() => onToggleEditModal({ status: true })}
            onCancelEditValue={() => onToggleEditModal({ showByCancel: true })}
          />
          {newChildren}
        </Right>
      </div>

      {editModal?.showByCancel && (
        <MyModal.Confirm
          title="确定放弃编辑的笔记内容？"
          description="放弃后将无法回复哦～"
          config={{
            cancelBtn: {
              isShow: true,
              callback: () => {
                onToggleEditModal({ showByCancel: false });
              },
            },
            submitBtn: {
              isShow: true,
              callback: () => {
                onToggleEditModal({ showByCancel: false, status: false });
              },
            },
          }}
        />
      )}
    </div>
  );
}
export default WrapperExperience;
