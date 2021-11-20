import { memo } from 'react';
import cx from 'classnames';

import styles from './BeatLoader.module.scss';
import { color } from '../../../styles/colors';

export interface Props {
  className?: string;
  size?: number;
  color?: string;
}

const BeatLoader: React.FunctionComponent<Props> = ({ className, size, color, ...otherProps }) => {
  const itemStyle = {
    width: size,
    height: size,
    backgroundColor: color,
  };
  return (
    <span className={cx(styles.beatLoader, className)} {...otherProps}>
      <span style={itemStyle} />
      <span style={itemStyle} />
      <span style={itemStyle} />
    </span>
  );
};

BeatLoader.defaultProps = {
  size: 15,
  color: color('blue', 80),
};

export default Object.assign(memo(BeatLoader), { displayName: 'BeatLoader' });
