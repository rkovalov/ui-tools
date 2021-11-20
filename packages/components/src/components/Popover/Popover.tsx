import React, { useState, memo } from 'react';
import { usePopper } from 'react-popper';

import { useUniqueId } from '../../hooks';
import Context from './Context';

export interface Props {
  children: React.ReactNode;
  triggers?: Array<'click' | 'hover'>;
  offset?: number;
  defaultIsOpen?: boolean;
  placement?:
    | 'top-start'
    | 'top'
    | 'top-end'
    | 'right-start'
    | 'right'
    | 'right-end'
    | 'bottom-start'
    | 'bottom'
    | 'bottom-end'
    | 'left-start'
    | 'left'
    | 'left-end';
}

const Popover: React.FunctionComponent<Props> = ({
  children,
  triggers = ['click'],
  placement = 'bottom',
  offset = 5,
  defaultIsOpen = false,
}) => {
  const targetClassName = useUniqueId(`popover-target`);
  const [refTarget, setRefTarget] = useState<HTMLElement | null>(null);
  const [refContent, setRefContent] = useState<HTMLElement | null>(null);
  const [refArrow, setRefArrow] = useState<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(defaultIsOpen);
  const { styles, attributes } = usePopper(refTarget, refContent, {
    placement,
    modifiers: [
      { name: 'arrow', options: { element: refArrow } },
      {
        name: 'offset',
        options: {
          offset: [0, offset + 6],
        },
      },
    ],
  });

  const context = {
    setRefTarget,
    setRefContent,
    setRefArrow,
    setIsOpen,
    refArrow,
    refTarget,
    refContent,
    styles,
    attributes,
    triggers,
    targetClassName,
    isOpen,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export default Object.assign(memo(Popover), { displayName: 'Popover' });
