import { memo } from 'react';
import cx from 'classnames';

import styles from './SideBarHeader.module.scss';

export interface Props {
  className?: string;
  children: React.ReactNode;
}

const SideBarHeader: React.FunctionComponent<Props> = ({ className, children }) => {
  return <div className={cx(styles.sidebarHeader, className)}>{children}</div>;
};

export default Object.assign(memo(SideBarHeader), { displayName: 'SideBarHeader' });
