/*
 * @Author: zyh
 * @Date: 2022-08-24 11:42:43
 * @LastEditors: zyh
 * @LastEditTime: 2022-08-26 11:14:54
 * @FilePath: /resume/app/renderer/common/components/MyInput/index.tsx
 * @Description: 封装Input组件
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import React from 'react';
import classnames from 'classnames';
import './index.less';

const TYPE = {
  text: 'text',
  textarea: 'textarea',
};

export type Type = 'text' | 'textarea' | '';
export type SizeType = 'normal' | 'large';
/**
 * Omit：以一个类型为基础支持剔除某些属性，然后返回一个新类型
 * Pick：从类型定义的属性中，选取指定一组属性，返回一个新的类型定义。
 * Omit<..., 'size'>：去除size
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  autoFocus?: boolean; // 自动获取焦点
  type?: Type; // 控件类型
  size?: SizeType; // 控件大小
  disabled?: boolean; // 是否禁用
  addonBefore?: React.ReactNode; // 设置前置标签
  addonAfter?: React.ReactNode; // 设置后置标签
  allowCount?: boolean; // 是否允许计数
  allowClear?: boolean; // 是否可以点击清除图标删除内容
  rows?: number; // textarea行数，默认3
  style?: React.CSSProperties; // 自定义样式
  value?: string | number | undefined; // 输入框内容
  placeholder?: string; // 输入框占位符
  id?: string; // 输入框id
  maxLength?: number; // 最大长度
  bgTransparent?: boolean; // 是否背景透明
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

interface InputState {
  focus: boolean;
  text: string | number;
}

export default class MyInput extends React.PureComponent<InputProps, InputState> {
  //   state: InputState;

  input: HTMLInputElement | HTMLTextAreaElement | undefined;
  constructor(props: InputProps) {
    super(props);
    this.state = {
      focus: false,
      text: props?.value || '',
    };
  }

  componentDidMount() {
    if (this.props.value) {
      this.setState({
        text: this.props.value,
      });
    }
  }

  // getDerivedStateFromProps内部访问不到this
  UNSAFE_componentWillReceiveProps(nextProps: InputProps) {
    // 检测父组件的props是否改变
    // if (nextProps.value) {
    // 修复为空的情况下不改变
    this.setState({
      text: nextProps.value || '',
    });
    // }
  }

  focus = () => {
    this.input && this.input.focus();
  };

  blur = () => {
    this.input && this.input.blur();
  };

  onFocus = () => {
    this.setState({
      focus: true,
    });
  };

  onBlur = () => {
    this.setState({
      focus: false,
    });
  };

  // 模拟change事件
  actionChange(e: any) {
    const target = this.input as any;
    const event = Object.create(e);
    // 如果是点击清除按钮，则需要改target指向input，value清空
    if (e.type === 'click') {
      target.value = '';
      event.target = target;
      event.currentTarget = target;
    }
    this.props.onChange && this.props.onChange(event);
  }

  onClear = (e: any) => {
    this.setState({
      text: '',
    });
    this.actionChange(e);
  };

  onInput = (e: any) => {
    this.setState({ text: e.target.value });
    this.actionChange(e);
  };

  saveInput = (input: HTMLInputElement | HTMLTextAreaElement) => {
    this.input = input;
  };

  renderBefore() {
    const { addonBefore } = this.props;
    return !!addonBefore && <div styleName="my-input-center">{addonBefore}</div>;
  }

  renderAfter() {
    const { addonAfter } = this.props;
    return !!addonAfter && <div styleName="my-input-center">{addonAfter}</div>;
  }

  renderClear() {
    const { allowClear } = this.props;
    return !!allowClear && this.state.text && <i styleName="my-input-clear" onClick={this.onClear} />;
  }

  renderInput() {
    const { placeholder, size = 'normal', maxLength, id, disabled, autoFocus } = this.props;
    return (
      <div
        styleName={classnames(`my-input-input`, {
          [`${size}`]: true,
        })}
      >
        <input
          {...{ placeholder, maxLength, id, disabled, autoFocus }}
          value={this.state.text}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onInput={this.onInput}
          ref={this.saveInput as any}
        />
        {this.renderClear()}
      </div>
    );
  }

  renderTextarea() {
    const { placeholder, maxLength = 1000, id, disabled, allowCount = true, autoFocus, rows } = this.props;
    const _rows = rows || 3;
    const text = this.state.text;
    return (
      <div styleName="my-input-textarea" style={{ height: 24 * _rows }}>
        <textarea
          {...{ placeholder, maxLength, id, disabled, autoFocus }}
          rows={_rows}
          value={text}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onInput={this.onInput}
          ref={this.saveInput as any}
        />
        {this.renderClear()}
        {allowCount && (
          <div styleName="my-input-textarea-footer">
            <span
              styleName={classnames({
                'max-length-text': !!maxLength && text && String(text).length >= maxLength,
              })}
            >
              {String(text).length}
            </span>
            {!!maxLength && (
              <>
                <span>/</span>
                <span>{maxLength}</span>
              </>
            )}
          </div>
        )}
      </div>
    );
  }

  render() {
    const { style, bgTransparent = false, allowClear, type } = this.props;
    return (
      <div
        style={style}
        styleName={classnames('my-input', {
          normal: !bgTransparent,
          focus: this.state.focus,
          'allow-clear': allowClear,
        })}
      >
        {this.renderBefore()}
        {TYPE.textarea === type ? this.renderTextarea() : this.renderInput()}
        {this.renderAfter()}
      </div>
    );
  }
}
