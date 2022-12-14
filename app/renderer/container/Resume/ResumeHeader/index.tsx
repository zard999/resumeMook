/*
 * @Author: zyh
 * @Date: 2022-08-24 15:49:07
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-31 10:50:45
 * @FilePath: /resume/app/renderer/container/Resume/ResumeHeader/index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import ROUTER from '@common/constants/router';
import './index.less';
import MyButton from '@common/components/MyButton/index';
import { toPrintPdf } from '@common/utils/htmlToPdf';
import { useAppSelector } from '@store/hooks';
import { selectResume } from '@src/container/Resume/slice';
import MyModal from '@common/components/MyModal';
import { useReadGlobalConfigFile, useUpdateGlobalConfigFile } from '@src/hooks/useGlobalConfigActionHooks';
import { intToDateString } from '@common/utils/time';
import { createUID } from '@common/utils';
import fileAction from '@common/utils/file';
import { getUserStoreDataPath } from '@common/utils/appPath';
import { compilePath } from '@common/utils/router';
import { ROUTER_KEY } from '@common/constants/router';
import useClickAway from '@common/hooks/useClickAway';

function ResumeHeader() {
  const history = useHistory();
  const resume = useAppSelector(selectResume);
  const { base, work, education } = resume;
  const { ref, componentVisible, setComponentVisible } = useClickAway(false);
  // console.log('resume', resume);
  // 引入读取更新本地配置文件
  const readGlobalConfigFile = useReadGlobalConfigFile();
  const updateGlobalConfigFile = useUpdateGlobalConfigFile();

  // 接收的路由参数
  const routerParams = useParams<{
    fromPath: string;
    templateId: string;
    templateIndex: string;
  }>();

  // 返回首页
  const onBack = () => {
    console.log('onBack', routerParams.fromPath, ROUTER_KEY.root);
    if (routerParams.fromPath === ROUTER_KEY.root) {
      history.push(compilePath(ROUTER.root));
    } else if (routerParams.fromPath === ROUTER_KEY.templateList) {
      history.push(compilePath(ROUTER.templateList));
    } else {
      console.log('here');
    }
  };

  // 导出PDF，格式为：姓名+学校+岗位
  const onExport = () => {
    toPrintPdf(`${base?.username}+${education?.school}+${work?.job}`);
    setComponentVisible(false);

    readGlobalConfigFile().then((value: { [key: string]: any }) => {
      console.log('resumeSavePath', value);
      if (value?.resumeSavePath) {
        saveResumeJson(value?.resumeSavePath);
      } else {
        // 不存在默认路径，则设置默认路径并更新文件内容
        getUserStoreDataPath().then((appPath: string) => {
          updateGlobalConfigFile('resumeSavePath', `${appPath}/resumeCache`);
          saveResumeJson(`${appPath}/resumeCache`);
        });
      }
    });
  };

  // 存储数据json
  const saveResumeJson = (resumeSavePath: string) => {
    const date = intToDateString(new Date().valueOf(), '_');
    const prefix = `${date}_${base?.username}_${education?.school}_${work?.job}_${createUID()}.json`;
    console.log('resumeSavePath', resumeSavePath);

    if (resumeSavePath && resumeSavePath.search('resumeCache') > -1) {
      fileAction
        .canRead(resumeSavePath)
        .then(() => {
          fileAction?.write(`${resumeSavePath}/${prefix}`, resume, 'utf8');
        })
        .catch(() => {
          fileAction
            .mkdirDir(resumeSavePath)
            .then(() => {
              fileAction.write(`${resumeSavePath}/${prefix}`, resume, 'utf8');
            })
            .catch(() => {
              console.log('创建文件夹失败');
            });
        });
    } else {
      // 如果路径不存在 resumeCache 文件夹，则默认创建此文件夹
      fileAction
        ?.mkdirDir(`${resumeSavePath}/resumeCache`)
        .then((path) => {
          if (path) {
            fileAction?.write(`${resumeSavePath}/resumeCache/${prefix}`, resume, 'utf8');
          }
        })
        .catch(() => {
          console.log('创建文件夹失败');
        });
    }
  };

  return (
    <div styleName="header">
      <div styleName="back" onClick={onBack}>
        返回
      </div>
      <MyButton size="middle" className="export-btn" onClick={() => setComponentVisible(true)}>
        导出PDF
      </MyButton>
      {componentVisible && (
        <MyModal.Confirm
          eleRef={ref}
          title="确定要打印简历吗？"
          description="请确保信息的正确，目前仅支持单页打印哦～"
          config={{
            cancelBtn: {
              isShow: true,
              callback: () => setComponentVisible(false),
            },
            submitBtn: {
              isShow: true,
              callback: onExport,
            },
          }}
        />
      )}
    </div>
  );
}
export default ResumeHeader;
