import { memo } from 'react';
import cx from 'classnames';
import { Tab as ReactTab, TabProps } from 'react-tabs';

import styles from './Tab.module.scss';

export interface Props extends TabProps {
  hasError?: boolean;
  count?: number | string;
}

const Tab: React.FunctionComponent<Props> = function Tab({ hasError, className, children, count, ...props }) {
  return (
    // @ts-ignore
    <ReactTab
      className={cx(styles.tab, className)}
      selectedClassName={styles.selected}
      disabledClassName={styles.disabled}
      {...props}
    >
      <div className={cx(styles.content, { [styles.errors as string]: hasError })}>
        {children} {count && <span className={styles.count}>{count}</span>}
      </div>
    </ReactTab>
  );
};

export default Object.assign(memo(Tab), { tabsRole: 'Tab', displayName: 'Tab' });
