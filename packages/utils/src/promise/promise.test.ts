import { isPromise } from './promise';

async function asyncFn() {
  return await Promise.resolve('async');
}

describe('Promise', () => {
  it('isPromise', () => {
    expect(isPromise(1)).toBeFalse();
    expect(isPromise({})).toBeFalse();
    expect(isPromise('no')).toBeFalse();

    expect(isPromise(new Promise(() => ''))).toBeTrue();
    expect(isPromise(asyncFn())).toBeTrue();
  });
});
