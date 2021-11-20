import { memo } from 'react';
import cx from 'classnames';
import type { NavLink } from 'react-router-dom';

import MenuItem from '../MenuItem';
import MenuLink from '../MenuLink';

import styles from './UserMenuItem.module.scss';

import UserIcon from '../../UserIcon';
import { useOnlineStatus } from '../../../hooks';

interface LinkProps {
  className: string;
  children: Props['children'];
  title: string;
  href?: string;
  to?: string;
}
export interface Props {
  title?: string;
  className?: string;
  firstName?: string;
  lastName?: string;
  children?: React.ReactNode | React.ReactElement;
  linkTo?: string;
  href?: string;
  linkComponent?: NavLink | React.FunctionComponent<LinkProps>;
}

const UserMenuItem: React.FunctionComponent<Props> = ({
  children,
  firstName,
  linkComponent,
  linkTo,
  href,
  lastName,
  className,
  ...restProps
}) => {
  const isOnline = useOnlineStatus();

  return (
    <MenuItem {...restProps} className={cx(styles.userMenuItem, className)}>
      {({ isCollapsed }) => (
        <MenuLink isCollapsed={isCollapsed} href={href} linkTo={linkTo} linkComponent={linkComponent}>
          <UserIcon firstName={firstName} lastName={lastName} isDisabled={!isOnline} />
          {!isCollapsed && (
            <div className={styles.details}>
              <div className={styles.label}>{children}</div>
              <div className={styles.status}>{isOnline ? 'Online' : 'Offline'}</div>
            </div>
          )}
        </MenuLink>
      )}
    </MenuItem>
  );
};

export default Object.assign(memo(UserMenuItem), { displayName: UserMenuItem });
