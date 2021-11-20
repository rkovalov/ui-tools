import React, { memo, useCallback } from 'react';
import cx from 'classnames';
import styles from './LabeledToggle.module.scss';

type Option<T = Record<string, unknown>> = T & {
  label: string;
  value: string;
};

export interface Props<T> {
  size?: 'sm' | 'md' | 'lg';
  value?: Option<T>;
  options: readonly Option<T>[];
  onChange?: (option: Option<T>) => void;
  disabled?: boolean;
}

function LabeledToggle<T = Option>({ size = 'md', value, onChange, options }: Props<T>): React.ReactElement<Props<T>> {
  const onClick = useCallback((o: Option<T>) => () => onChange?.(o), [onChange]);
  return (
    <div className={cx(styles.labeledToggle, [styles[size as string]])}>
      {options.map(o => (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          key={o.value}
          className={cx(styles.option, { [styles.selected as string]: value?.value === o.value })}
          onClick={onClick(o)}
        >
          {o.label}
        </div>
      ))}
    </div>
  );
}
export default Object.assign(memo(LabeledToggle) as typeof LabeledToggle, {
  displayName: 'LabeledToggle',
});
