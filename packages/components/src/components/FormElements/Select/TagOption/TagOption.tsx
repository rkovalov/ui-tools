import { memo, useMemo } from 'react';
import cx from 'classnames';
import { components, OptionProps, GroupTypeBase, OptionTypeBase } from 'react-select';
import Tag from '../Tag';

import styles from './TagOption.module.scss';

export type Props<T, isMulti extends boolean = false> = OptionProps<T, isMulti, GroupTypeBase<T>> & {
  getOptionTagLabel?: (data: T) => React.ReactNode | React.ReactElement | undefined;
};

function TagOption<T extends OptionTypeBase, isMulti extends boolean>({
  className,
  data,
  children,
  getOptionTagLabel,
  ...rest
}: Props<T, isMulti>) {
  const tag = useMemo(() => {
    if (getOptionTagLabel) {
      return getOptionTagLabel(data);
    }
    return data.tag?.label as string | undefined;
  }, [data, getOptionTagLabel]);

  return (
    <components.Option className={cx(className, styles.tagOption)} data={data} {...rest}>
      <div className={styles.content}>
        <div>{children}</div>
        {tag && <Tag>{tag}</Tag>}
      </div>
    </components.Option>
  );
}

export default Object.assign(memo(TagOption) as typeof TagOption, { displayName: 'TagOption' });
