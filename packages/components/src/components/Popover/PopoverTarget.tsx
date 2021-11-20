import React, { memo, forwardRef, useContext, useCallback, useEffect } from 'react';
import cx from 'classnames';
import { useHoverDirty } from 'react-use';

import Context from './Context';
import { mergeRefs } from '@ui-tools/utils';

export interface Props {
  onHover?: () => void;
  children: React.ReactElement;
}

const PopoverTarget: React.FunctionComponent<Props> = forwardRef(({ children, onHover }, ref) => {
  const { setRefTarget, refTarget, targetClassName, setIsOpen, triggers, isOpen } = useContext(Context);

  const hovered = useHoverDirty({ current: refTarget });

  const onClick = useCallback(
    event => {
      if (event) {
        event.preventDefault();
      }
      if (!isOpen && triggers.includes('click')) {
        setIsOpen(true);
      }
      children.props.onClick?.();
    },
    [children.props, setIsOpen, triggers, isOpen]
  );

  useEffect(() => {
    if (!hovered) {
      return;
    }
    if (!isOpen && triggers.includes('hover')) {
      setIsOpen(true);
    }
    onHover?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered]);

  const isChildrenHtmlElement = typeof children.type === 'string';

  return (
    <children.type
      {...children.props}
      ref={mergeRefs(setRefTarget, ref)}
      className={cx(children.props.className, targetClassName)}
      onClick={onClick}
      {...(isChildrenHtmlElement ? {} : { isActive: isOpen })}
    >
      {children.props.children}
    </children.type>
  );
});

export default Object.assign(memo(PopoverTarget), { displayName: 'PopoverTarget' });
