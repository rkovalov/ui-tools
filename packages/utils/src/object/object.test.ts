import { isObject } from './object';

describe('Objects utils', () => {
  it('check isObject', () => {
    expect(isObject({ a: 'any' })).toBe(true);
    expect(isObject([1, 2, 3])).toBe(false);
    expect(isObject(new Map())).toBe(false);
    expect(isObject(new Set())).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject(1)).toBe(false);
    expect(
      isObject(() => {
        console.log('func');
      })
    ).toBe(false);
    expect(isObject([{ a: 'any' }])).toBe(false);
  });
});
