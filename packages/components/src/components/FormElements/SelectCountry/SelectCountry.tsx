import React, { memo } from 'react';
import cx from 'classnames';
import type { OptionProps, SingleValueProps, GroupTypeBase } from 'react-select';
import CountryFlag from '../../CountryFlag';
import Select, { SelectComponents, Props } from '../Select';

import styles from './SelectCountry.module.scss';

export { Props };

export interface CountryOption {
  code: string;
  label?: string;
  value?: string;
}

const CountryLabel: React.FunctionComponent<{ code: string; children: React.ReactNode }> = ({ code, children }) => {
  return (
    <>
      <CountryFlag code={code} className={styles.flag} />
      <span>{children}</span>
    </>
  );
};

function Option<T, isMulti extends boolean = false>({ children, className, data, ...rest }: OptionProps<T, isMulti>) {
  return (
    <SelectComponents.Option className={cx(className, styles.option)} data={data} {...rest}>
      <CountryLabel code={data.code ?? data.value}>{children}</CountryLabel>
    </SelectComponents.Option>
  );
}

function SingleValue<T extends CountryOption = CountryOption>({
  children,
  className,
  data,
  ...rest
}: SingleValueProps<T, GroupTypeBase<T>>) {
  return (
    <SelectComponents.SingleValue className={cx(className, styles.option)} data={data} {...rest}>
      <CountryLabel code={data.code ?? data.value}>{children}</CountryLabel>
    </SelectComponents.SingleValue>
  );
}

function SelectCountry<T extends CountryOption = CountryOption, isMulti extends boolean = false>(
  props: Props<T, isMulti>
): React.ReactElement<Props<T, isMulti>> {
  return <Select<T, isMulti> {...props} components={{ Option, SingleValue }} />;
}

export default Object.assign(memo(SelectCountry) as typeof SelectCountry, { displayName: 'SelectCountry' });
