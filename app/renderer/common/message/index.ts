/*
 * @Author: zyh
 * @Date: 2022-08-24 22:48:38
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-24 22:57:25
 * @FilePath: /resume/app/renderer/common/message/index.ts
 * @Description: 发布订阅者
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
export const MESSAGE_EVENT_NAME_MAPS = {
  OPEN_FORM_MODAL: 'open_form_modal', // 简历模块选择
};

/**
     * @description 发送事件
     * @summary 简历选择工具-选中模块
     * // 注册事件并发送数据
     * Messager.send(MESSAGE_EVENT_NAME_MAPS.xxx, {
        data: 'xxx'
       });
       // 在具体组件监听此事件并接收数据
       useEffect(() => {
        document.addEventListener(MESSAGE_EVENT_NAME_MAPS.xxx, onReceive);
        return () => {
          document.removeEventListener(MESSAGE_EVENT_NAME_MAPS.xxx, onReceive);
        };
      }, []);
      const onReceive = (e: any) => {
        Messager.receive(e, (data: any) => {
          console.log(data);
        });
      };
     */
class Messager {
  send = (eventName: string, payload: any) => {
    document.dispatchEvent(
      new CustomEvent(eventName, {
        detail: {
          payload: payload,
        },
      })
    );
  };
  receive = (e: any, messageHandler: Function) => {
    if (messageHandler) {
      const payload = e?.detail?.payload;
      messageHandler(payload);
    }
  };
}

export default new Messager();
