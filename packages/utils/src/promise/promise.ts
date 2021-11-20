/* eslint-disable @typescript-eslint/no-explicit-any */
export function isPromise<T>(p: any): p is Promise<T>;
export function isPromise(p: any): p is Promise<any>;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isPromise<T>(promise: any): promise is Promise<T> {
  return (
    !!promise && (typeof promise === 'object' || typeof promise === 'function') && typeof promise.then === 'function'
  );
}
