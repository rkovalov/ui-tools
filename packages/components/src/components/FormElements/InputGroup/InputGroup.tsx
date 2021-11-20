import React, { memo, Children, isValidElement, cloneElement } from 'react';
import DefaultInput, { Props as InputProps } from '../Input';
import DefaultSelect, { Props as SelectProps } from '../Select';
import DefaultSelectCountry, { Props as SelectCountryProps, CountryOption } from '../SelectCountry';
import DefaultButton, { Props as ButtonProps } from '../../Button';
import type { Except } from 'type-fest';
import cx from 'classnames';
import FieldFrame, { Props as FieldFrameProps } from '../FieldFrame';

import styles from './InputGroup.module.scss';

export interface Props extends Except<FieldFrameProps, 'children'> {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
}

interface InputGroupControlProps {
  fieldControlClassname?: string;
}

const Input: React.FunctionComponent<InputProps & InputGroupControlProps> = ({
  className,
  // omit fieldControlClassname
  fieldControlClassname,
  ...props
}) => <DefaultInput withoutBorder className={cx(styles.input, className)} {...props} />;

function Select<T, isMulti extends boolean = false>({
  className,
  // omit fieldControlClassname
  fieldControlClassname,
  ...props
}: SelectProps<T, isMulti> & InputGroupControlProps): React.ReactElement<SelectProps<T, isMulti>> {
  return <DefaultSelect<T, isMulti> className={cx(styles.select, className)} withoutBorder {...props} />;
}

function SelectCountry<T extends CountryOption = CountryOption, isMulti extends boolean = false>({
  className,
  // omit fieldControlClassname
  fieldControlClassname,
  ...props
}: SelectCountryProps<T, isMulti> & InputGroupControlProps): React.ReactElement<SelectCountryProps<T, isMulti>> {
  return <DefaultSelectCountry<T, isMulti> className={cx(styles.select, className)} withoutBorder {...props} />;
}

const Item: React.FunctionComponent<
  {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    align?: 'left' | 'right' | 'center';
  } & InputGroupControlProps
> = ({ className, children, style, align = 'center', fieldControlClassname }) => (
  <div className={cx(styles.item, styles[align], fieldControlClassname, className)} style={style}>
    <div className={styles.itemContent}>{children}</div>
  </div>
);

const Button: React.FunctionComponent<ButtonProps & InputGroupControlProps> = ({
  size,
  className,
  // omit fieldControlClassname
  fieldControlClassname,
  ...props
}) => (
  <div className={styles.buttonContainer}>
    <DefaultButton className={cx(styles.button, className)} {...props} />
  </div>
);

const InputGroup: React.FunctionComponent<Props> = ({ size, className, children, ...restProps }) => {
  return (
    <FieldFrame
      size={size}
      className={cx(styles.inputGroup, className)}
      containerClassName={styles.container}
      {...restProps}
    >
      {({ disabled, className: fieldControlClassname }) => (
        <>
          {Children.map(Array.isArray(children) ? children : [children], child =>
            isValidElement(child) ? cloneElement(child, { size, fieldControlClassname, disabled }) : child
          )}
        </>
      )}
    </FieldFrame>
  );
};

export default Object.assign(memo(InputGroup), {
  displayName: 'InputGroup',
  Input,
  Select,
  SelectCountry,
  Item,
  Button,
});
