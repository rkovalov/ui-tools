import { memo } from 'react';
import cx from 'classnames';

import styles from './SideBarContent.module.scss';

export interface Props {
  className?: string;
  children: React.ReactNode;
}

const SideBarContent: React.FunctionComponent<Props> = ({ className, children }) => {
  return <div className={cx(styles.sidebarContent, className)}>{children}</div>;
};

export default Object.assign(memo(SideBarContent), { displayName: 'SideBarContent' });
