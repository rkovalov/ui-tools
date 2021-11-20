import { memo } from 'react';
import cx from 'classnames';
import styles from './Icon.module.scss';

export type IconName =
  | 'settings'
  | 'dashboard'
  | 'assignment'
  | 'apps'
  | 'bell'
  | 'arrow-down'
  | 'arrow-up'
  | 'arrow-up-small'
  | 'arrow-down-small'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-left-small'
  | 'arrow-right-small'
  | 'arrow-start'
  | 'arrow-end'
  | 'bin'
  | 'book'
  | 'calendar-empty'
  | 'calendar'
  | 'check-circle'
  | 'check'
  | 'close'
  | 'container'
  | 'criteria'
  | 'desktop'
  | 'laptop'
  | 'download'
  | 'export'
  | 'import'
  | 'edit'
  | 'filter'
  | 'inspection'
  | 'link'
  | 'list'
  | 'risk-profile'
  | 'arrow-down-long'
  | 'arrow-up-long'
  | 'mobile'
  | 'dots-horizontal'
  | 'dots-vertical'
  | 'multi'
  | 'offline'
  | 'online'
  | 'package'
  | 'plus'
  | 'postal'
  | 'upload'
  | 'rail'
  | 'unknown-transport'
  | 'road'
  | 'sea'
  | 'other-transport'
  | 'internal-navigation'
  | 'search'
  | 'delivery'
  | 'air'
  | 'shield-check'
  | 'shield'
  | 'tablet'
  | 'sync'
  | 'refresh'
  | 'unsync'
  | 'card-view'
  | 'payments'
  | 'transactions';

export interface Props {
  className?: string;
  activeClassName?: string;
  name: IconName;
  prefix?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  isSpin?: boolean;
}

const Icon: React.FunctionComponent<Props> = ({
  className,
  isSpin,
  prefix = 'wf-icon',
  name,
  style,
  // color = '#6d849b',
  color = 'inherit',
  hoverColor,
  size = 20,
}) => {
  const activeColor = hoverColor ?? color;
  return (
    <i
      className={cx(prefix, `${prefix}-${name}`, { [styles.spin as string]: isSpin }, styles.icon, className)}
      style={
        {
          fontSize: size,
          width: size,
          '--color': color,
          '--hover-color': activeColor,
          ...style,
        } as React.CSSProperties
      }
    />
  );
};

export default Object.assign(memo(Icon), { displayName: 'Icon' });
