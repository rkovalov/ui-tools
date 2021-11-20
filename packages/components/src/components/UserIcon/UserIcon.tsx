import cx from 'classnames';
import styles from './UserIcon.module.scss';

export interface Props {
  firstName?: string;
  lastName?: string;
  className?: string;
  isSelected?: boolean;
  isDisabled?: boolean;
}

const UserIcon: React.FunctionComponent<Props> = ({ className, firstName, lastName, isDisabled, isSelected }) => {
  return (
    <div
      className={cx(
        styles.userIcon,
        { [styles.disabled as string]: isDisabled, [styles.selected as string]: isSelected },
        className
      )}
    >
      <div className={styles.content}>
        {firstName?.charAt(0)}
        {lastName?.charAt(0)}
      </div>
    </div>
  );
};

export default UserIcon;
