/*
 * @Author: zyh
 * @Date: 2022-08-25 17:19:09
 * @LastEditors: zyh
 * @LastEditTime: 2022-09-21 17:57:10
 * @FilePath: /resumeMook/app/renderer/container/Resume/ResumeContent/UseForm/WrapperExperience/index.tsx
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
import { onAddExperience, onDeleteExperience } from './utils';
import MyModal from '@common/components/MyModal';
interface IProps {
  dataList: any[];
  children: React.ReactNode;
  updateDataList: (newDataList: any[]) => void;
}

function WrapperExperience({ children, dataList, updateDataList }: IProps) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentItem, setCurrentItem] = useState<Partial<AdapterExperienceType>>({});
  const [experienceList, setExperienceList] = useState<Partial<AdapterExperienceType>[]>([]);

  const [editModal, setEditModal] = useState({
    status: false, // 编辑状态
    showByCancel: false, // 编辑状态下的取消弹窗
    onAfterFn: () => {}, // 操作之后的还想执行的回调
    tempSaveItem: {}, // 暂时保存的表单数据
  });

  const [deleteModal, setDeleteModal] = useState({
    show: false,
    index: -1,
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
      // 这只是修改了当前form的值，并没有修改redux中的值，所以后面取消的时候直接拿redux中的值即可，redux中的值只能靠 updateDataList 修改
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
    // 4.更新redux中的值
    updateDataList(newList);
    // 5.修改编辑状态
    onToggleEditModal({ status: false });
  }, [editModal?.tempSaveItem]);

  // 9. 删除当前项
  const onDeleteItem = (index: number) => {
    setDeleteModal({
      show: true,
      index,
    });
  };

  // 10. 取消删除当前项
  const onDeleteCancel = useCallback(() => setDeleteModal({ show: false, index: -1 }), [currentIndex, deleteModal]);

  // 11. 成功删除当前项
  const onDeleteOk = useCallback(() => {
    const newList = onDeleteExperience(deleteModal?.index, experienceList);
    if (newList.length > 0) setCurrentIndex(0);
    else setCurrentIndex(-1);
    setDeleteModal({ show: false, index: -1 });
    setExperienceList(newList);
    updateDataList && updateDataList(newList);
  }, [currentIndex, deleteModal]);

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
        <Left
          currentIndex={currentIndex}
          experienceList={experienceList}
          onAdd={onAddItem}
          onChange={onChangeItem}
          onDelete={onDeleteItem}
        />
      </div>
      <div styleName="right-box">
        {experienceList.length > 0 && (
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
        )}
      </div>

      {deleteModal?.show && (
        <MyModal.Confirm
          title="确定删除条目吗？"
          description="删除后将无法恢复哦～"
          config={{
            cancelBtn: {
              isShow: true,
              callback: onDeleteCancel,
            },
            submitBtn: {
              isShow: true,
              callback: onDeleteOk,
            },
          }}
        />
      )}

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
