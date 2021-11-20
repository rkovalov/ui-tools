import React, { memo } from 'react';
import cx from 'classnames';
import Switch from 'rc-switch';

import styles from './Toggle.module.scss';

export interface Props {
  className?: string;
  defaultChecked?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  checked?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (
    checked: boolean,
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
}

const heights = {
  sm: '12px',
  md: '16px',
  lg: '24px',
};

const Toggle: React.FunctionComponent<Props> = ({ className, size = 'md', ...props }) => {
  return (
    <div className={cx(styles.toggleFrame, className)}>
      <Switch
        className="toggle"
        prefixCls="toggle"
        {...props}
        style={
          {
            '--height': heights[size],
          } as React.CSSProperties
        }
      />
    </div>
  );
};

export default Object.assign(memo(Toggle), { displayName: 'Toggle' });
