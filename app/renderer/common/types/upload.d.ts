/*
 * @Author: zyh
 * @Date: 2022-08-24 15:08:35
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-24 15:10:15
 * @FilePath: /resume/app/renderer/common/types/upload.d.ts
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
declare namespace TSUpload {
  // 上传框
  export interface Input {
    style?: React.CSSProperties; // 样式
    accept?: string; // 上传的文件类型
    multiple?: boolean; // 支持多选文件
    visible?: boolean; // 输入框是否可见
    onAfterClick?: () => void; // 点击后回调事件
    onAfterChange?: (fileList: File[]) => void; // 回调事件，回传选中的文件列表
  }

  // 文件
  export interface File {
    uuid: string; // 文件标识
    file: any; // 文件
    fileType: string; // 文件类型
    base64URL: string; // 文件本地预览
    revokeFileBase64URL: (base64URL: string) => void; //  释放本地预览URL
    upload?: () => void; // 文件上传
    cancel?: () => void; // 取消上传
    retry?: () => void; // 重传
  }
}
