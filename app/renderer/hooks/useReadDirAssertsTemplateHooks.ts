/*
 * @Author: zyh
 * @Date: 2022-08-29 09:15:08
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-31 09:31:29
 * @FilePath: /resume/app/renderer/hooks/useReadDirAssertsTemplateHooks.ts
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import fileAction from '@common/utils/file';
import { getAppPath } from '@common/utils/appPath';
import { createUID } from '../common/utils/index';
import { addTemplateList } from '@src/container/templateList/slice';
import { useAppDispatch } from '@src/store/hooks';

export default function () {
  const dispatch = useAppDispatch();
  // 直接写'./index.tsx'是不行的，得写绝对路径
  //   getAppPath().then((rootPath: string) => {
  //     console.log('rootPath', rootPath);
  //     fileAction.read(`${rootPath}app/renderer/container/resume/index.tsx`).then((data) => {
  //       console.log('data1111', data);
  //     });
  //   });
  return () => {
    // 1. 先获取应用地址
    getAppPath().then((appPath: string) => {
      console.log('appPath', appPath);
      // 2. 从assets读取模版图片信息，构造模版列表
      fileAction
        .readDir(`${appPath}/assets/template`)
        .then(async (files: string[]) => {
          const templateList: TSTemplate.Item[] = [];
          // 3. 构造模版函数
          if (files.length > 0) {
            console.log('该目录有以下图片', files);
            // 不能使用forEach，异步问题会导致更新不了
            // files.forEach(async (fileName: string) => {});
            // 为了模版侧边栏跟右边模版一一对应，暂时使用索引
            // for (const fileName of files) {
            for (let idx = 0; idx < files.length; idx++) {
              const base64URL = await fileAction.read(`${appPath}/assets/template/${files[idx]}`, 'base64');
              templateList.push({
                templateName: files[idx],
                // 添加索引
                templateIndex: idx,
                templateId: createUID(),
                templateCover: `data:image/png;base64,${base64URL}`,
              });
              // console.log('base64URL', base64URL);
            }
          }
          // 4. 存入到 redux 中，并默认选中第一条
          dispatch(
            addTemplateList({
              templateList: templateList,
            })
          );
        })
        .catch((err: NodeJS.ErrnoException) => {
          throw new Error(err.message);
        });
    });
  };
}
