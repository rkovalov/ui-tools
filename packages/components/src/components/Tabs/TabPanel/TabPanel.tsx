import { memo } from 'react';
import cx from 'classnames';
import { TabPanel as ReactTabPanel, TabPanelProps } from 'react-tabs';

import styles from './TabPanel.module.scss';

export type Props = TabPanelProps;

const TabPanel: React.FunctionComponent<Props> = ({ className, children, ...props }) => {
  return (
    // @ts-ignore
    <ReactTabPanel className={cx(styles.tabPanel, className)} selectedClassName={styles.selected} {...props}>
      {children}
    </ReactTabPanel>
  );
};

export default Object.assign(memo(TabPanel), { tabsRole: 'TabPanel', displayName: 'TabPanel' });
