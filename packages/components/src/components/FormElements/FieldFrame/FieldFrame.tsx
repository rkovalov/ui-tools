import React, { memo, useState, useCallback } from 'react';
import cx from 'classnames';

import { BeatLoader } from '../../Loaders';

import styles from './FieldFrame.module.scss';

type Size = 'sm' | 'md' | 'lg' | 'auto';
type FrameType = 'select';

type MouseEventCallback = (e: React.MouseEvent<HTMLInputElement>) => void;

type EventFocusCallback = (e: React.FocusEvent<HTMLElement>) => void;

export interface Props {
  withoutBorder?: boolean;
  label?: string;
  icon?: React.ReactElement;
  iconPosition?: 'left' | 'right';
  hasError?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
  isLoading?: boolean;
  size?: Size;
  type?: FrameType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  children: (props: {
    disabled: boolean;
    isFocused: boolean;
    withLabel: boolean;
    className: string;
    onFocus: EventFocusCallback;
    onBlur: EventFocusCallback;
  }) => React.ReactElement | React.ReactElement[];
  onClick?: MouseEventCallback;
  onFocus?: EventFocusCallback;
  onBlur?: EventFocusCallback;
}

const FieldFrame: React.FunctionComponent<Props> = props => {
  const {
    withoutBorder,
    type,
    hasError,
    errorMessage,
    disabled,
    label,
    className,
    containerClassName,
    children,
    icon,
    iconPosition,
    isLoading,
    size,
    value,
    onFocus,
    onBlur,
    onClick,
  } = props;
  const [isFocused, setIsFocused] = useState(false);

  const _onFocus = useCallback(
    e => {
      setIsFocused(true);
      if (onFocus) {
        onFocus(e);
      }
    },
    [onFocus]
  );

  const _onBlur = useCallback(
    e => {
      setIsFocused(false);
      if (onBlur) {
        onBlur(e);
      }
    },
    [onBlur]
  );

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={cx(styles.fieldFrame, className, {
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        [styles.hasError as string]: hasError || Boolean(errorMessage),
        [styles.disabled as string]: disabled,
      })}
      onClick={onClick}
    >
      {disabled && <div className={styles.disabledOverlay} />}
      <div
        className={cx(styles.fieldContainer, containerClassName, {
          [styles.withoutBorder as string]: withoutBorder,
          [styles.disabled as string]: disabled,
        })}
      >
        {label && (
          <span
            className={cx(styles.fieldLabel, styles[size as string], {
              [styles.labelOnTop as string]: isFocused || !!value,
            })}
          >
            {label}
          </span>
        )}
        {icon && (
          <span
            className={cx(styles.fieldIcon, styles[size as string], {
              [styles.left as string]: iconPosition === 'left',
              [styles.right as string]: iconPosition === 'right',
            })}
          >
            {icon}
          </span>
        )}
        {children({
          disabled: Boolean(disabled),
          isFocused,
          withLabel: !!label,
          className: cx(styles.fieldControl, styles[size as string], {
            [styles.iconLeft as string]: icon && iconPosition === 'left',
            [styles.iconRight as string]: icon && iconPosition === 'right',
            [styles.select as string]: type === 'select',
            [styles.valueOrFocus as string]: (isFocused || !!value) && label,
          }),
          onFocus: _onFocus,
          onBlur: _onBlur,
        })}
        {isLoading && (
          <BeatLoader className={cx(styles.loading, { [styles.withIcon as string]: type === 'select' })} size={7} />
        )}
      </div>
      {errorMessage && <div className={styles.fieldError}>{errorMessage}</div>}
    </div>
  );
};

FieldFrame.defaultProps = {
  size: 'md',
  iconPosition: 'left',
};

export default Object.assign(memo(FieldFrame), { displayName: 'FieldFrame' });
