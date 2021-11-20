import { memo } from 'react';
import cx from 'classnames';
import { TabList as ReactTabList, TabListProps } from 'react-tabs';

import styles from './TabList.module.scss';

export type Props = TabListProps;

const TabList: React.FunctionComponent<Props> = ({ className, ...props }) => {
  // @ts-ignore
  return <ReactTabList className={cx(styles.tabList, className)} {...props} />;
};

export default Object.assign(memo(TabList), { tabsRole: 'TabList', displayName: 'TabList' });
