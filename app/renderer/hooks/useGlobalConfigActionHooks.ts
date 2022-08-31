/*
 * @Author: zyh
 * @Date: 2022-08-29 16:20:43
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-31 09:23:31
 * @FilePath: /resume/app/renderer/hooks/useGlobalConfigActionHooks.ts
 * @Description: 对存储路径的相关操作
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import path from 'path';
import { getAppPath } from '@common/utils/appPath';
import fileAction from '@common/utils/file';

// 读取全局配置文件的内容
export function useReadGlobalConfigFile() {
  return () => {
    return new Promise((resolve: (values: { [key: string]: any }) => void, reject: (value: Error) => void) => {
      getAppPath()
        .then((appPath: string) => {
          // 获取配置文件路径
          const jsonPath = path.join(appPath, 'appConfig/global.config.json');
          fileAction.hasFile(jsonPath).then(async () => {
            const result = await fileAction.read(jsonPath, 'utf-8');
            resolve(JSON.parse(result));
          });
        })
        .catch(() => {
          reject(new Error('appConfig does not exist!'));
        });
    });
  };
}

// 更新配置文件
export function useUpdateGlobalConfigFile() {
  const readGlobalConfigFile = useReadGlobalConfigFile();
  return (updateKey: string, updateValues: any, callback?: () => void) => {
    getAppPath().then((appPath: string) => {
      const jsonPath = path.join(appPath, 'appConfig/global.config.json');
      readGlobalConfigFile().then((values) => {
        if (values && !!Object.keys(values).length) {
          const nextConfigContent = {
            ...values,
            [`${updateKey}`]: updateValues,
          };
          fileAction.canWrite(jsonPath).then(() => {
            fileAction.write(jsonPath, nextConfigContent, 'utf-8').then(() => {
              callback && callback();
            });
          });
        }
      });
    });
  };
}
