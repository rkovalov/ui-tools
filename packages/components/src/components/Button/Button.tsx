import React, { memo, forwardRef } from 'react';
import cx from 'classnames';
import styles from './Button.module.scss';
import { ClipLoader } from '../Loaders';
import type { ColorName } from '../../styles/colors';

export interface Props {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactElement | React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  color?: ColorName;
  isLoading?: boolean;
  secondary?: boolean;
  outlined?: boolean;
}

type ButtonProps = Props & React.HTMLAttributes<HTMLButtonElement>;

// eslint-disable-next-line react/display-name
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      disabled,
      color = 'blue',
      size = 'md',
      secondary = false,
      outlined = false,
      className,
      type,
      children,
      isLoading,
      ...btnProps
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cx(
          styles.btn,
          styles[size],
          styles[color],
          { [styles.secondary as string]: secondary },
          { [styles.outlined as string]: outlined },
          className
        )}
        {...btnProps}
      >
        <span>{children}</span>
        {isLoading && <ClipLoader size={20} color="inherit" className={styles.loader} />}
      </button>
    );
  }
);

export default Object.assign(memo(Button), { displayName: 'Button' });
