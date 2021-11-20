import { memo } from 'react';
import ReactCountryFlag from 'react-country-flag';
import cx from 'classnames';

import styles from './CountryFlag.module.scss';

export interface Props {
  code: string;
  className?: string;
  label?: string;
}

const CountryFlag: React.FunctionComponent<Props> = ({ code, label, className }) => {
  return (
    <div className={cx(styles.countryFlag, className)}>
      <ReactCountryFlag
        svg
        countryCode={code}
        className={styles.flag}
        style={
          {
            width: '14px',
            height: '14px',
          } as React.CSSProperties
        }
      />
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
};
export default Object.assign(memo(CountryFlag), { displayName: 'CountryFlag' });
