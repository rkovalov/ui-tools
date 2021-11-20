import { memo } from 'react';
import cx from 'classnames';

import styles from './ColorSwatch.module.scss';

export interface Props {
  name: string;
  className?: string;
  hex: string;
  style?: React.CSSProperties;
}

const ColorSwatch: React.FunctionComponent<Props> = ({ name, hex, className, style }) => {
  return (
    <div className={cx(styles.colorSwatch, className)}>
      <div className={styles.color} style={{ backgroundColor: hex, ...style }}>
        <div className={styles.hex}>{hex}</div>
      </div>
      <div className={styles.colorName}>{name}</div>
    </div>
  );
};

export default Object.assign(memo(ColorSwatch), { displayName: 'ColorSwatch' });
