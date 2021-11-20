import breakpoints from './_media.js.scss';

// TODO: use https://github.com/ReactTraining/react-media
// and apply breakpoints from sass to component

export type Breakpoints = 'phone' | 'tablet' | 'desktop';
export type BreakpointsMap = {
  [key in Breakpoints]: string;
};

export const getBreakpoints = (): BreakpointsMap => {
  return breakpoints as BreakpointsMap;
};
