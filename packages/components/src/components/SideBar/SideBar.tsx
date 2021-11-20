import React, { forwardRef, createContext, useCallback, useState } from 'react';
import cx from 'classnames';

import ArrowIcon from './icons/Arrow';
import styles from './SideBar.module.scss';

export type Props = React.HTMLAttributes<HTMLElement> & {
  isDefaultCollapsed?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export interface SidebarContext {
  isCollapsed: boolean;
  onToggle?: (value: boolean) => void;
}

export const SidebarContext = createContext<SidebarContext>({
  isCollapsed: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onToggle: () => {},
});

const SideBar: React.ForwardRefRenderFunction<unknown, Props> = ({ children, className, isDefaultCollapsed }, ref) => {
  const sidebarRef: React.RefObject<HTMLElement> =
    (ref as React.RefObject<HTMLElement>) || React.createRef<HTMLElement>();

  const [sidebarState, setSidebarState] = useState({
    isCollapsed: Boolean(isDefaultCollapsed),
  });

  const onToggle = useCallback(() => {
    setSidebarState(state => ({ ...state, isCollapsed: !state.isCollapsed }));
  }, []);

  const { isCollapsed } = sidebarState;

  return (
    <SidebarContext.Provider value={sidebarState}>
      <aside ref={sidebarRef} className={cx(styles.asideBar, className, { [styles.collapsed as string]: isCollapsed })}>
        <div className={styles.layout}>{children}</div>
        <div className={cx(styles.toggle, { [styles.collapsed as string]: isCollapsed })}>
          {/*  eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div className={cx(styles.toggleIcon)} onClick={onToggle}>
            <ArrowIcon className={styles.arrowIcon} />
          </div>
        </div>
      </aside>
    </SidebarContext.Provider>
  );
};

export default Object.assign(forwardRef<unknown, Props>(SideBar), { displayName: 'SideBar' });
