import React, { memo, forwardRef, InputHTMLAttributes } from 'react';
import type { Except } from 'type-fest';
import cx from 'classnames';

import FieldFrame, { Props as FieldFrameProps } from '../FieldFrame';

import styles from './Input.module.scss';

export interface Props
  extends Except<FieldFrameProps, 'children' | 'type'>,
    Except<InputHTMLAttributes<HTMLInputElement>, 'onFocus' | 'onBlur' | 'onClick' | 'size'> {
  textarea?: boolean;
  style?: React.CSSProperties;
  placeholder?: string;
  value?: string | number;
}

const Input: React.FunctionComponent<Props> = forwardRef(function Input(props, ref) {
  const {
    className,
    textarea,
    label,
    errorMessage,
    hasError,
    disabled,
    size,
    style,
    icon,
    iconPosition,
    isLoading,
    withoutBorder,
    onFocus,
    onBlur,
    ...inputProps
  } = props;
  return (
    <FieldFrame
      label={label}
      className={cx(className, styles.input)}
      isLoading={isLoading}
      withoutBorder={withoutBorder}
      errorMessage={errorMessage}
      hasError={hasError}
      disabled={disabled}
      value={inputProps.value}
      size={size}
      icon={icon}
      iconPosition={iconPosition}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {({ isFocused, withLabel, ...defaultProps }) =>
        React.createElement(textarea ? 'textarea' : 'input', {
          style,
          ...defaultProps,
          ...inputProps,
          ref,
        })
      }
    </FieldFrame>
  );
});

Input.defaultProps = {
  style: {},
};

export default Object.assign(memo(Input), { displayName: 'Input' });
