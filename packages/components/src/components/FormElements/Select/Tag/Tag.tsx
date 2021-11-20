import { memo } from 'react';
import cx from 'classnames';

import styles from './Tag.module.scss';

export interface Props {
  className?: string;
  children: React.ReactNode;
}

const Tag: React.FunctionComponent<Props> = ({ children, className }) => {
  return <div className={cx(styles.tag, className)}>{children}</div>;
};

export default Object.assign(memo(Tag), { displayName: 'Tag' });
