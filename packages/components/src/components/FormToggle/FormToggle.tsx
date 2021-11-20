import React, { memo } from 'react';
import cx from 'classnames';
import Toggle, { Props as ToggleProps } from '../Toggle';

import styles from './FormToggle.module.scss';

export interface Props extends ToggleProps {
  title: string;
  description?: string;
}

const FormToggle: React.FunctionComponent<Props> = ({ title, description, className, disabled, ...props }) => {
  return (
    <div className={cx(styles.formToggleFrame, className)}>
      <div className={cx(styles.formToggleContent, { [styles.disabled as string]: disabled })}>
        <p>{title}</p>
        <Toggle disabled={disabled} {...props} />
      </div>
      {description && (
        <p className={cx(styles.formToggleDescription, { [styles.disabled as string]: disabled })}>{description}</p>
      )}
    </div>
  );
};

export default Object.assign(memo(FormToggle), { displayName: 'FormToggle' });
