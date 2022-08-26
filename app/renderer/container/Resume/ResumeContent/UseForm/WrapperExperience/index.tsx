/*
 * @Author: zyh
 * @Date: 2022-08-25 17:19:09
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-26 15:50:07
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
    onAfterFn: () => {}, // 操作之后的还想执行的回调
    tempSaveItem: {}, // 暂时保存的表单数据
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
    // 编辑状态下添加
    if (editModal?.status) {
      onToggleEditModal({
        showByCancel: true,
        onAfterFn: () => {
          const newExperienceList = onAddExperience(experienceList);
          if (newExperienceList.length > 0) {
            // 定位激活刚添加的这条数据
            setCurrentIndex(0);
            setExperienceList(newExperienceList);
            updateDataList && updateDataList(newExperienceList);
          }
        },
      });
    } else {
      const newExperienceList = onAddExperience(experienceList);
      if (newExperienceList.length > 0) {
        setCurrentIndex(0);
        setExperienceList(newExperienceList);
        updateDataList && updateDataList(newExperienceList);
      }
    }
  };

  // 5. 切换条目
  const onChangeItem = useCallback(
    (index: number) => {
      if (editModal?.status) {
        // 5.1 当前正在编辑状态
        onToggleEditModal({
          showByCancel: true,
          onAfterFn: () => setCurrentIndex(index),
        });
        console.log('不能切换');
      } else {
        setCurrentIndex(index);
      }
    },
    [editModal]
  );

  // 6. 暂时修改当前form内容
  const onChangeCurrentItem = useCallback(
    (newItem: AdapterExperienceType) => {
      // 为了暂时让Form表单显示的数据实时性和一致性
      onToggleEditModal({
        tempSaveItem: { ...newItem },
      });
      setCurrentItem(newItem);
    },
    [currentItem]
  );

  // 7. 修改编辑状态
  const onToggleEditModal = useCallback(
    (config) => {
      setEditModal((prev) => ({ ...prev, ...config }));
    },
    [editModal]
  );

  // 8. 保存编辑状态
  const onSaveEditValue = useCallback(() => {
    // editModal被缓存了，必须引入依赖项editModal
    // 1.获取暂时保存的数据
    let newItem = editModal?.tempSaveItem ? { ...editModal?.tempSaveItem } : { ...currentItem };
    // 2.获取当前数据数组
    let newList = [...experienceList];
    // 3.修改当前索引的数据
    newList[currentIndex] = newItem;
    // 4.更新
    updateDataList(newList);
    // 5.修改编辑状态
    onToggleEditModal({ status: false });
  }, [editModal?.tempSaveItem]);

  const newChildren = useMemo(() => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        // 核心在于，给字组件注入两个属性：当前条目与修改当前条目的方法
        return React.cloneElement(child, {
          currentItem,
          onChangeCurrentItem,
          isDisable: !editModal?.status,
        });
      }
      return child;
    });
  }, [children, currentItem, editModal?.status]);
  return (
    <div styleName="form">
      <div styleName="left-box">
        <Left currentIndex={currentIndex} experienceList={experienceList} onAdd={onAddItem} onChange={onChangeItem} />
      </div>
      <div styleName="right-box">
        <Right>
          <Menu
            isEdit={editModal?.status}
            currentItem={currentItem}
            onChangeEditStatus={() => onToggleEditModal({ status: true, tempSaveItem: { ...currentItem } })}
            onCancelEditValue={() => onToggleEditModal({ showByCancel: true })}
            onSaveEditValue={onSaveEditValue}
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
                onToggleEditModal({ showByCancel: false, onAfterFn: () => {} });
              },
            },
            submitBtn: {
              isShow: true,
              callback: () => {
                onToggleEditModal({ showByCancel: false, status: false });
                editModal?.onAfterFn && editModal?.onAfterFn();

                // 取消之后重新设置当前当前项以恢复之前的数据
                setCurrentItem(experienceList[currentIndex]);
              },
            },
          }}
        />
      )}
    </div>
  );
}
export default WrapperExperience;
