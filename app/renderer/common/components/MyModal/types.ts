/*
 * @Author: zyh
 * @Date: 2022-08-24 14:12:09
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-24 14:34:37
 * @FilePath: /resume/app/renderer/common/components/MyModal/types.ts
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
type Position = 'top' | 'bottom' | 'center';

interface BtnConfig {
  text?: string; // 按钮文本
  isShow?: boolean; // 是否显示
  callback?: () => void;
}
interface IModal {
  title?: string; // 标题
  width?: number; // 宽度
  className?: string; // 类名
  description?: string; // 描述
  position?: Position; // 弹窗位置
  showFooter?: boolean; // 是否需要显示底部
  renderFooter?: React.ReactNode; // 底部按钮自定义
  // 配置
  config?: {
    cancelBtn?: BtnConfig; // 取消按钮
    submitBtn?: BtnConfig; // 确定按钮
    deleteBtn?: BtnConfig; // 删除按钮
  };
  eleRef?: React.LegacyRef<HTMLDivElement> | undefined;
  children?: React.ReactNode; // 子组件
}

export type IConfirmModal = IModal;

export interface IDialogModal extends IModal {
  childStyle?: React.CSSProperties; // 内容区域的样式
}
