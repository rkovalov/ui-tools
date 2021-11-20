import { memo } from 'react';
import cx from 'classnames';

import styles from './SideBarFooter.module.scss';

export interface Props {
  className?: string;
  children: React.ReactNode;
}

const SideBarFooter: React.FunctionComponent<Props> = ({ className, children }) => {
  return <div className={cx(styles.sidebarFooter, className)}>{children}</div>;
};

export default Object.assign(memo(SideBarFooter), { displayName: 'SideBarFooter' });
