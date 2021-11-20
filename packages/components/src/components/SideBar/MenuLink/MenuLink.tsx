import { memo, createElement } from 'react';
import type { NavLink, NavLinkProps } from 'react-router-dom';
import cx from 'classnames';
import { isNavLinkComponent } from '../utils';

import styles from './MenuLink.module.scss';

interface LinkProps {
  className: string;
  children: Props['children'];
  title: string;
  href?: string;
  to?: string;
}

export interface Props {
  className?: string;
  children: React.ReactNode;
  isCollapsed: boolean;
  linkTo?: string | NavLinkProps['to'];
  href?: string;
  linkComponent?: NavLink | React.FunctionComponent<LinkProps>;
  title?: string;
  withoutHover?: boolean;
}

const MenuLink: React.FunctionComponent<Props & Partial<NavLinkProps> & React.HTMLProps<HTMLLinkElement>> = ({
  children,
  linkComponent,
  linkTo,
  title,
  href,
  className,
  isCollapsed,
  withoutHover,
  ...restProps
}) => {
  const LinkComponent = linkComponent ? linkComponent : href ?? linkTo ? 'a' : 'div';

  const classNames = cx(styles.link, className, {
    [styles.collapsed as string]: isCollapsed,
    [styles.withoutHover as string]: withoutHover,
  });
  if (LinkComponent === 'a') {
    return createElement<React.HTMLProps<HTMLLinkElement>>(
      LinkComponent,
      {
        className: classNames,
        href,
        ...(title ? { title } : {}),
        ...restProps,
      },
      children
    );
  }
  if (LinkComponent === 'div') {
    return createElement<React.HTMLProps<HTMLDivElement>>(
      LinkComponent,
      {
        className: classNames,
        ...(title ? { title } : {}),
        ...(restProps as Partial<React.HTMLProps<HTMLDivElement>>),
      },
      children
    );
  }
  if (isNavLinkComponent(LinkComponent)) {
    const { to, ...restLinkProps } = restProps;
    return createElement<NavLinkProps>(
      LinkComponent,
      {
        className: classNames,
        to: linkTo as NavLinkProps['to'],
        activeClassName: styles.active,
        ...(title ? { title } : {}),
        ...restLinkProps,
      },
      children
    );
  }
  return null;
};

export default Object.assign(memo(MenuLink), { displayName: 'MenuLink' });
