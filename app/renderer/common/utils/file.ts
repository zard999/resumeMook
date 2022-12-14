/*
 * @Author: zyh
 * @Date: 2022-08-24 10:11:05
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-29 17:23:03
 * @FilePath: /resume/app/renderer/common/utils/file.ts
 * @Description: 对文件的操作进行统一管理
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import fs, { promises as fsPromiseAPIs } from 'fs';

const fileAction = {
  read: (path: string, encoding?: BufferEncoding): Promise<string> => {
    return fsPromiseAPIs.readFile(path, { encoding: encoding || 'utf8' });
  },
  write: (path: string, content: any, encoding?: BufferEncoding): Promise<void> => {
    let updateContext = typeof content === 'string' ? content : JSON.stringify(content);
    return fsPromiseAPIs.writeFile(path, updateContext, { encoding: encoding || 'utf8' });
  },
  rename: (oldPath: string, newPath: string) => {
    return fsPromiseAPIs.rename(oldPath, newPath);
  },
  delete: (path: string) => {
    return fsPromiseAPIs.unlink(path);
  },
  hasFile: (path: string) => {
    return fsPromiseAPIs.access(path, fs.constants.F_OK);
  },
  canWrite: (path: string) => {
    return fsPromiseAPIs.access(path, fs.constants.W_OK);
  },
  canRead: (path: string) => {
    return fsPromiseAPIs.access(path, fs.constants.R_OK);
  },
  /**
   * @description: 读取目录内容
   * @params path 路径
   * @return {*}
   */
  readDir: (path: string) => {
    return fsPromiseAPIs.readdir(path);
  },
  /**
   * @description: 创建文件夹
   * @param {string} path 创建 /a/b/c，不管'/a' 和 /a/b 是否存在
   * @return {*}
   */
  mkdirDir: (path: string) => {
    return fsPromiseAPIs.mkdir(path, { recursive: true });
  },
};

export default fileAction;
