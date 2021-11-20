import { memo, useEffect, useMemo, useCallback } from 'react';
import cx from 'classnames';
import ReactDatePicker, { registerLocale, ReactDatePickerProps } from 'react-datepicker';
import { format as dateFormat } from 'date-fns';
import enGB from 'date-fns/locale/en-GB';
import frCA from 'date-fns/locale/fr-CA';

import FieldFrame, { Props as FieldFrameProps } from '../FieldFrame';
import Popover from '../../Popover';

import calendarIcon from './calendar.svg';

import styles from './DatePicker.module.scss';

export interface Props extends Omit<FieldFrameProps, 'children'> {
  placeholder?: string;
  className?: string;
  locale?: string; // "en-GB"
  value?: Date | [Date | null, Date | null] | null;
  size?: 'sm' | 'md' | 'lg';
  format?: string;
  withTime?: boolean;
  onChange?: (data: Date | [Date | null, Date | null] | null, event: React.SyntheticEvent<unknown> | undefined) => void;
}

// TODO: make dateRange picker depends on value if array that is range
const DatePicker: React.FunctionComponent<Omit<ReactDatePickerProps, 'value'> & Props> = ({
  className,
  errorMessage,
  hasError,
  disabled,
  label,
  value,
  size = 'md',
  locale = 'en-GB',
  format,
  placeholder = 'DD / MM / YYYY',
  withTime = false,
  onChange,
  ...datePickerProps
}) => {
  useEffect(() => {
    registerLocale('en-GB', enGB);
    registerLocale('fr-CA', frCA);
  }, []);

  const formattedValue = useMemo(() => {
    if (value instanceof Date) {
      return dateFormat(value, format ?? `dd / MM / yyyy ${withTime ? 'hh:mm' : ''}`);
    }
    return undefined;
  }, [format, value, withTime]);

  const _onChange = useCallback(
    ({ onClose }) =>
      (date: Date | null, event: React.SyntheticEvent<unknown> | undefined) => {
        onChange?.(date, event);
        onClose();
      },
    [onChange]
  );

  return (
    <FieldFrame
      label={label}
      className={cx(className, styles.datePicker)}
      errorMessage={errorMessage}
      hasError={hasError}
      disabled={disabled}
      size={size}
      value={value}
      icon={<img src={calendarIcon} alt="calendar-icon" />}
    >
      {({ isFocused, withLabel, ...defaultProps }) => (
        <Popover>
          <Popover.Target>
            <input
              className={cx(defaultProps.className, styles.dateControl)}
              readOnly
              value={formattedValue}
              placeholder={placeholder}
            />
          </Popover.Target>
          <Popover.Content className={styles.popoverContent}>
            {popoverProps => {
              return (
                <div className={styles.datePicker}>
                  {!Array.isArray(value) ? (
                    <ReactDatePicker
                      inline
                      showTimeInput={withTime}
                      selected={value instanceof Date ? value : undefined}
                      locale={locale}
                      onChange={_onChange(popoverProps)}
                      {...datePickerProps}
                    />
                  ) : (
                    <>
                      {/* TODO make range range picker by design */}
                      <ReactDatePicker
                        inline
                        showTimeInput={withTime}
                        selected={value[0] instanceof Date ? value[0] : undefined}
                        locale={locale}
                        selectsStart
                        startDate={value[0] instanceof Date ? value[0] : undefined}
                        endDate={value[1] instanceof Date ? value[1] : undefined}
                        // eslint-disable-next-line @typescript-eslint/no-empty-function
                        onChange={() => {}}
                        {...datePickerProps}
                      />
                      <ReactDatePicker
                        inline
                        showTimeInput={withTime}
                        selected={value[1] instanceof Date ? value[1] : undefined}
                        locale={locale}
                        selectsEnd
                        startDate={value[0] instanceof Date ? value[0] : undefined}
                        endDate={value[1] instanceof Date ? value[1] : undefined}
                        // eslint-disable-next-line @typescript-eslint/no-empty-function
                        onChange={() => {}}
                        {...datePickerProps}
                      />
                    </>
                  )}
                </div>
              );
            }}
          </Popover.Content>
        </Popover>
      )}
    </FieldFrame>
  );
};

export default Object.assign(memo(DatePicker), { displayName: 'DatePicker' });
