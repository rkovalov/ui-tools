import React, { memo, useCallback } from 'react';
import cx from 'classnames';
import markSvg from './mark.svg';
import minusSvg from './minus.svg';

import styles from './Checkbox.module.scss';

export interface Props {
  className?: string;
  disabled?: boolean;
  intermediate?: boolean;
  checked?: boolean;
  name?: string;
  onChange?: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
}

const Checkbox: React.FunctionComponent<Props> = ({
  className,
  disabled,
  size = 'md',
  name,
  checked,
  intermediate,
  onChange,
}) => {
  const toggle = useCallback(
    e => {
      e.preventDefault();
      if (disabled) {
        return;
      }
      return onChange?.(!checked);
    },
    [disabled, onChange, checked]
  );

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <label onClick={toggle} className={cx(styles.label, className)}>
      <div
        className={cx(styles.checkbox, styles[size], {
          [styles.checked as string]: checked,
          [styles.disabled as string]: disabled,
        })}
      >
        <input type="checkbox" name={name} checked={checked} onChange={toggle} disabled={disabled} hidden />
        {checked && <img src={intermediate ? minusSvg : markSvg} alt="checkmark" className={styles.icon} />}
      </div>
    </label>
  );
};

export default Object.assign(memo(Checkbox), { displayName: 'Checkbox' });
