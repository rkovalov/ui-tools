import React, { memo } from 'react';
import cx from 'classnames';

import styles from './ModalContent.module.scss';

export interface Props {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
}

const ModalContent: React.FunctionComponent<Props> = ({ className, children, ...props }) => {
  return (
    <div className={cx(styles.modalContent, className)} {...props}>
      {children}
    </div>
  );
};

export default Object.assign(memo(ModalContent), { displayName: 'ModalContent' });
