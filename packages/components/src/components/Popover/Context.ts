import React, { createContext } from 'react';

interface Context {
  setRefTarget: (el: HTMLElement | null) => void;
  setRefContent: (el: HTMLElement | null) => void;
  setRefArrow: (el: HTMLElement | null) => void;
  setIsOpen: (isOpen: boolean) => void;
  refArrow: HTMLElement | null;
  refTarget: HTMLElement | null;
  refContent: HTMLElement | null;
  styles: { [key: string]: React.CSSProperties };
  attributes: { [key: string]: { [key: string]: string } | undefined };
  triggers: Array<'click' | 'hover'>;
  targetClassName: string;
  isOpen: boolean;
}
export default createContext<Context>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setRefTarget: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setRefContent: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setRefArrow: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsOpen: () => {},
  refArrow: null,
  refTarget: null,
  refContent: null,
  styles: {},
  attributes: {},
  triggers: ['click'],
  targetClassName: '',
  isOpen: false,
});
