import React, { memo } from 'react';
import cx from 'classnames';

import styles from './ModalTitle.module.scss';

export interface Props {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
}

const ModalTitle: React.FunctionComponent<Props> = ({ className, children, ...props }) => {
  return (
    <div className={cx(styles.modalTitle, className)} {...props}>
      {children}
    </div>
  );
};

export default Object.assign(memo(ModalTitle), { displayName: 'ModalTitle' });
