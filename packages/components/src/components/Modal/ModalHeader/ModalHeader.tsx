import React, { memo } from 'react';
import cx from 'classnames';

import styles from './ModalHeader.module.scss';

export interface Props {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
}

const ModalHeader: React.FunctionComponent<Props> = ({ className, children, ...props }) => {
  return (
    <div className={cx(styles.modalHeader, className)} {...props}>
      {children}
    </div>
  );
};

export default Object.assign(memo(ModalHeader), { displayName: 'ModalHeader' });
