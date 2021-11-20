import { memo, useMemo } from 'react';
import cx from 'classnames';
import { components, SingleValueProps, GroupTypeBase, OptionTypeBase } from 'react-select';

import Tag from '../Tag';

import styles from './TagSingleValue.module.scss';

export type Props<T> = SingleValueProps<T, GroupTypeBase<T>> & {
  getOptionTagLabel?: (data: T) => React.ReactNode | React.ReactElement | undefined;
};

function TagSingleValue<T extends OptionTypeBase>({ className, data, children, getOptionTagLabel, ...rest }: Props<T>) {
  const tag = useMemo(() => {
    if (getOptionTagLabel) {
      return getOptionTagLabel(data);
    }
    return data.tag?.label as string | undefined;
  }, [data, getOptionTagLabel]);

  return (
    <components.SingleValue className={cx(className, styles.tagSingleValue)} data={data} {...rest}>
      <div className={styles.content}>
        <div className={styles.label}>{children}</div>
        {tag && <Tag>{tag}</Tag>}
      </div>
    </components.SingleValue>
  );
}

export default Object.assign(memo(TagSingleValue) as typeof TagSingleValue, { displayName: 'TagSingleValue' });
