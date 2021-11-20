import { useContext, useState, useCallback } from 'react';
import { memo } from 'react';
import cx from 'classnames';
import type { NavLink, NavLinkProps } from 'react-router-dom';
import { isNavLinkComponent } from '../utils';
import Icon, { IconName } from '../../Icon';

import { SidebarContext } from '../SideBar';

import MenuLink from '../MenuLink';
import styles from './MenuItem.module.scss';

type ChildrenFunction = (api: { isCollapsed: boolean; isActive?: boolean; isHovered?: boolean }) => React.ReactNode;

interface LinkProps {
  className: string;
  children: Props['children'];
  title: string;
}
export interface Props {
  className?: string;
  children: ChildrenFunction | React.ReactNode;
  linkTo?: string;
  linkComponent?: NavLink | React.FunctionComponent<LinkProps>;
  style?: React.CSSProperties;
  title?: string;
  icon?: IconName | ChildrenFunction | React.ReactElement;
}

const MenuItem: React.FunctionComponent<Props & Partial<NavLinkProps> & React.HTMLProps<HTMLLinkElement>> = ({
  className,
  style,
  children,
  linkTo,
  linkComponent,
  title,
  icon,
  ...restProps
}) => {
  const { isCollapsed } = useContext(SidebarContext);
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const onChangeIsActive: NavLinkProps['isActive'] = useCallback(match => {
    setIsActive(!!match);
    return !!match;
  }, []);

  return (
    <div
      className={cx(styles.menuItem, { [styles.collapsed as string]: isCollapsed }, className)}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {typeof children === 'function' ? (
        (children as ChildrenFunction)({ isCollapsed, isActive, isHovered })
      ) : (
        <MenuLink
          isCollapsed={isCollapsed}
          title={isCollapsed ? title : ''}
          linkComponent={linkComponent}
          {...(isNavLinkComponent(linkComponent)
            ? {
                isActive: onChangeIsActive,
              }
            : {})}
          linkTo={linkTo}
          {...restProps}
        >
          <>
            <span className={styles.icon}>
              {typeof icon === 'string' ? (
                <Icon name={icon} color={isHovered ? '#638ECF' : isActive ? '#638ECF' : '#6d849b'} size={20} />
              ) : typeof icon === 'function' ? (
                icon({ isCollapsed, isActive, isHovered })
              ) : (
                icon
              )}
            </span>
            <span className={cx(styles.label, { [styles.collapsed as string]: isCollapsed })}>{children}</span>
          </>
        </MenuLink>
      )}
    </div>
  );
};

export default Object.assign(memo(MenuItem), { displayName: 'MenuItem' });
