/*
 * @Author: zyh
 * @Date: 2022-08-30 15:22:30
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-30 15:46:09
 * @FilePath: /resume/app/renderer/common/components/MyMaskHoc/index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import './index.less';
import classnames from 'classnames';
export type Position = 'top' | 'bottom' | 'center';

const MyMaskHoc =
  (WrappedComponent: React.ComponentType) => (hocProps: { position?: Position; backgroundColor?: string }) => {
    return class extends React.Component {
      getProps = () => ({
        ...this.props,
      });
      render() {
        const position = hocProps ? hocProps?.position : 'center';
        const backgroundColor = hocProps ? hocProps?.backgroundColor : 'rgba(0, 0, 0, 0.78)';

        return (
          <div styleName="vis-mask" style={{ backgroundColor: backgroundColor }}>
            <div
              styleName={classnames({
                top: position === 'top',
                center: position === 'center',
                bottom: position === 'bottom',
              })}
            >
              <WrappedComponent {...this.getProps()} />
            </div>
          </div>
        );
      }
    };
  };
export default MyMaskHoc;
