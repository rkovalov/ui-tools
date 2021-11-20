import React, { memo } from 'react';
import cx from 'classnames';
import ReactModal, { Props as ReactModalProps } from 'react-modal';

import styles from './Modal.module.scss';

export interface Props extends ReactModalProps {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
}

const Modal: React.FunctionComponent<Props> = ({ className, children, ...props }) => {
  return (
    <ReactModal
      ariaHideApp={false}
      className={cx(styles.modal, className)}
      overlayClassName={cx(styles.overlay)}
      {...props}
    >
      {children}
    </ReactModal>
  );
};

export default Object.assign(memo(Modal), { displayName: 'Modal' });
