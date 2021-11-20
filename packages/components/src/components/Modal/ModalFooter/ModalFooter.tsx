import React, { memo } from 'react';
import cx from 'classnames';

import styles from './ModalFooter.module.scss';

export interface Props {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
}

const ModalFooter: React.FunctionComponent<Props> = ({ className, children, ...props }) => {
  return (
    <div className={cx(styles.modalFooter, className)} {...props}>
      {children}
    </div>
  );
};

export default Object.assign(memo(ModalFooter), { displayName: 'ModalFooter' });
