import React, { useMemo, memo, forwardRef } from 'react';
import type { Except } from 'type-fest';
import ReactSelect, { Styles, Props as ReactSelectProps, components, OptionTypeBase } from 'react-select';
import { merge } from '@ui-tools/utils';
import { color } from '../../../styles/colors';
import cx from 'classnames';

import FieldFrame, { Props as FieldFrameProps } from '../FieldFrame';
import baseStyles, { SelectStyles } from './styles';
import TagSingleValue from './TagSingleValue';
import TagOption from './TagOption';
import styl from './Select.module.scss';

export interface DefaultProps<T extends OptionTypeBase> extends Except<FieldFrameProps, 'children' | 'type'> {
  styles?: SelectStyles;
  getOptionTagLabel?: (data: T) => React.ReactNode | React.ReactElement | undefined;
  menuPortalTarget?: HTMLElement;
}

type BaseOption = { label: string; value: string };

export type Props<T = BaseOption, isMulti extends boolean = false> = DefaultProps<T> & ReactSelectProps<T, isMulti>;

const useStyles = (newStyles: SelectStyles | undefined) => {
  return useMemo(() => {
    const mergedStyles = merge(baseStyles, newStyles ?? {});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (Object.keys(mergedStyles) as Array<keyof Styles<any, any, any>>).reduce((acc, cssSelector) => {
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      acc[cssSelector] = (base: SelectStyles) => ({ ...base, ...mergedStyles[cssSelector] });
      return acc;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, {} as Styles<any, any, any>);
  }, [newStyles]);
};

function Select<T, isMulti extends boolean = false>(
  props: Props<T, isMulti>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: React.ForwardedRef<any>
): React.ReactElement<Props<T, isMulti>> {
  const {
    size,
    disabled,
    isLoading,
    className,
    containerClassName,
    label,
    hasError,
    errorMessage,
    styles,
    menuPortalTarget,
    withoutBorder,
    icon,
    iconPosition,
    withTag,
    components,
    getOptionTagLabel,
    onFocus,
    onBlur,
    ...selectProps
  } = props;
  const customStyles = useStyles(styles);

  return (
    <FieldFrame
      type="select"
      className={className}
      containerClassName={containerClassName}
      errorMessage={errorMessage}
      disabled={disabled}
      isLoading={isLoading}
      hasError={hasError}
      value={selectProps.value}
      label={label}
      size={size}
      icon={icon}
      iconPosition={iconPosition}
      withoutBorder={withoutBorder}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {({ isFocused, withLabel, className: classNameControl, ...defaultProps }) => (
        <ReactSelect<T, isMulti>
          ref={ref}
          isDisabled={disabled}
          placeholder={null}
          className={cx(classNameControl, styl.fieldControl)}
          menuPortalTarget={menuPortalTarget ?? document.body}
          // menuPosition need set to `fixed` when menuPortalTarget is not document.body
          // issue with correctly calculating position of dropdown
          menuPosition={menuPortalTarget ? 'fixed' : 'absolute'}
          theme={theme => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: color('lightBlue', 20),
              primary50: color('lightBlue', 20),
              primary25: color('lightBlue', 20),
            },
          })}
          styles={{
            ...customStyles,
            singleValue: base => ({
              ...base,
              ...baseStyles.singleValue,
              paddingTop: (isFocused || selectProps.value) && withLabel && 15,
            }),
            input: base => ({
              ...base,
              paddingTop:
                selectProps.isMulti && selectProps.value ? 0 : (isFocused || selectProps.value) && withLabel && 15,
            }),
            valueContainer: base => ({
              ...base,
              ...baseStyles.valueContainer,
              marginTop: selectProps.isMulti && label && selectProps.value?.length ? 18 : 0,
            }),
          }}
          components={{
            ...components,
            Option:
              components?.Option ??
              (optionProps => <TagOption getOptionTagLabel={getOptionTagLabel} {...optionProps} />),
            SingleValue:
              components?.SingleValue ??
              (singleValueProps => <TagSingleValue getOptionTagLabel={getOptionTagLabel} {...singleValueProps} />),
          }}
          {...defaultProps}
          {...selectProps}
        />
      )}
    </FieldFrame>
  );
}
export { components };

export default Object.assign(memo(forwardRef(Select)) as typeof Select, { displayName: 'Select' });
