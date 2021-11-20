import { memo, useState, useEffect } from 'react';
import cx from 'classnames';

import Tag from '../Tag';
import { color } from '../../styles/colors';
import styles from './StatusBar.module.scss';

export interface Props {
  className?: string;
  activeStatus: string;
  style?: React.CSSProperties;
  statuses: Array<{
    label: string;
    color: string;
  }>;
}

interface LabelProps {
  isActive?: boolean;
  children: React.ReactNode;
  style: React.CSSProperties;
}

const StatusLabel: React.FunctionComponent<LabelProps> = ({ isActive, children, style }) => {
  return (
    <li className={cx(styles.status, { [styles.active as string]: isActive })} style={style}>
      <div className={styles.step}>
        <div className={styles.point} />
        <div className={styles.label}>
          <div className={styles.labelContainer}>{children}</div>
          <div className={styles.labelPlaceholder}>{children}</div>
        </div>
      </div>
    </li>
  );
};

const StatusBar: React.FunctionComponent<Props> = ({ className, statuses, activeStatus, style }) => {
  const [statusMatrix, setStatusMatrix] = useState<Props['statuses'][]>([[], []]);

  useEffect(() => {
    const activeIndex = statuses.findIndex(s => activeStatus === s.label);
    if (activeIndex > -1) {
      setStatusMatrix([statuses.slice(0, activeIndex + 1), statuses.slice(activeIndex + 1)]);
    } else {
      setStatusMatrix([statuses, []]);
    }
  }, [activeStatus, statuses]);

  return (
    <ol className={cx(styles.statusBar, className)} style={style}>
      {statusMatrix[0]?.map((status, index) => {
        const isActive = Boolean(activeStatus && statusMatrix[0] && statusMatrix[0].length - 1 === index);
        return (
          <StatusLabel
            key={status.label}
            isActive={isActive}
            style={
              {
                '--status-color': isActive ? status.color : color('gray', 70), //'#93A3C3',
              } as React.CSSProperties
            }
          >
            {isActive ? (
              <Tag outlined color={status.color}>
                {status.label}
              </Tag>
            ) : (
              <span className={styles.tag} style={{ color: color('black') }}>
                {status.label}
              </span>
            )}
          </StatusLabel>
        );
      })}
      {statusMatrix[1]?.map(status => (
        <StatusLabel key={status.label} style={{ '--status-color': '#E1E4EC' } as React.CSSProperties}>
          <span className={styles.tag} style={{ color: color('black', 30) }}>
            {status.label}
          </span>
        </StatusLabel>
      ))}
    </ol>
  );
};

export default Object.assign(memo(StatusBar), { displayName: 'StatusBar' });
