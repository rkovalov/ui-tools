import { memo } from 'react';
import cx from 'classnames';

import styles from './ClipLoader.module.scss';
import { color } from '../../../styles/colors';

export interface Props {
  className?: string;
  size?: number;
  color?: string;
}

const ClipLoader: React.FunctionComponent<Props> = ({ className, size, color, ...otherProps }) => {
  const style: React.CSSProperties = {
    width: size,
    height: size,
    borderColor: color,
    borderBottomColor: 'transparent',
  };

  return <span className={cx(styles.clipLoader, className)} style={style} {...otherProps} />;
};

ClipLoader.defaultProps = {
  size: 30,
  color: color('blue', 80),
};

export default Object.assign(memo(ClipLoader), { displayName: 'ClipLoader' });
