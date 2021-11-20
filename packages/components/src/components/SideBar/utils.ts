import type { NavLink } from 'react-router-dom';

export const isNavLinkComponent = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  c: undefined | string | Record<string, any> | NavLink | React.FunctionComponent<any>
): c is NavLink => {
  if (!c) {
    return false;
  }
  if (typeof c === 'function') {
    // return c.name === 'NavLink' || c.displayName === 'NavLink';
    return true;
  }
  if (typeof c === 'object') {
    // return from memo or forwardRef functions
    // name is cutt
    // return [c.render?.name, c.render?.displayName, c.type?.name, c.type?.displayName].includes('NavLink');
    return typeof c.render === 'function';
  }
  return false;
};
