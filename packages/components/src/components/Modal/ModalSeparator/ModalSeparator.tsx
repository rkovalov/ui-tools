import React, { memo } from 'react';
import cx from 'classnames';

import styles from './ModalSeparator.module.scss';

export interface Props {
  className?: string;
}

const ModalSeparator: React.FunctionComponent<Props> = ({ className, children, ...props }) => {
  return <div className={cx(styles.modalSeparator, className)} {...props} />;
};

export default Object.assign(memo(ModalSeparator), { displayName: 'ModalSeparator' });
