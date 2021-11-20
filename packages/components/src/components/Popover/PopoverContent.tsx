import React, { useContext, memo, useCallback } from 'react';
import cx from 'classnames';
import { useOnClickOutside } from '../../hooks';
import Portal from '../Portal';
import Context from './Context';
import type { ColorName } from '../../styles/colors';

import _styles from './PopoverContent.module.scss';

export interface Props {
  className?: string;
  children: React.ReactNode | React.FunctionComponent<{ onClose: () => void }>;
  color?: ColorName | 'white';
  style?: React.CSSProperties;
}

const PopoverContent: React.FunctionComponent<Props> = ({ children, className, style, color = 'white' }) => {
  const { styles, attributes, setRefContent, refContent, setIsOpen, isOpen, targetClassName, setRefArrow } =
    useContext(Context);
  useOnClickOutside(
    { current: refContent },
    () => {
      setIsOpen(false);
    },
    { ignoreClassNames: [targetClassName] }
  );

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return isOpen ? (
    <Portal>
      <div ref={setRefContent} className={_styles.popover} style={styles.popper} {...attributes.popper}>
        <div className={cx(_styles.popoverContent, _styles[color], className)} style={style}>
          {typeof children === 'function' ? children({ onClose }) : children}
        </div>
        <div ref={setRefArrow} className={cx(_styles.arrow, _styles[color])} style={styles.arrow} />
      </div>
    </Portal>
  ) : null;
};

export default Object.assign(memo(PopoverContent), { displayName: 'PopoverContent' });
