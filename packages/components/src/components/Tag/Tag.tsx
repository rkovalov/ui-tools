import { memo } from 'react';
import cx from 'classnames';
import { ColorName, isColorFromPalette, color as getColor } from '../../styles/colors';

import styles from './Tag.module.scss';

type Size = 'sm' | 'md' | 'lg';
export interface Props {
  className?: string;
  outlined?: boolean;
  size?: Size;
  children: React.ReactNode;
  color?: ColorName | string;
  backgroundColor?: ColorName | string;
  style?: React.CSSProperties;
}

const Tag: React.FunctionComponent<Props> = ({
  className,
  children,
  outlined = false,
  color = 'blue',
  size = 'md',
  backgroundColor = 'blue',
  style = {},
}) => {
  return (
    <div
      className={cx(styles.tag, styles[size], { [styles.outlined as string]: outlined }, className)}
      style={
        {
          '--color': isColorFromPalette(color) ? getColor(color) : color,
          '--background-color': isColorFromPalette(backgroundColor) ? getColor(backgroundColor, 10) : backgroundColor,
          ...style,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};

export default Object.assign(memo(Tag), { displayName: 'Tag' });
