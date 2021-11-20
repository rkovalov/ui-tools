import { Cache } from './cache';

describe('Cache', () => {
  it('set cache', () => {
    const cache = new Cache();
    const key = JSON.stringify([['customParam']]);
    cache.add(key, 'customData');
    expect(cache.get(key)).toBe('customData');
  });

  it('set cache with expireTime.', () => {
    const expireTime = 10;
    const cache = new Cache({ expireTime });
    const key = JSON.stringify([['customParam']]);
    cache.add(key, 'customData');
    setTimeout(() => {
      expect(cache.get(key)).toBe(undefined);
    }, 10);
  });

  it('delete data from cache', () => {
    const cache = new Cache();
    const key = JSON.stringify([['customParam']]);
    cache.add(key, 'customData');
    expect(cache.get(key)).toBe('customData');
    cache.delete(key);
    expect(cache.get(key)).toBe(undefined);
  });

  it('get keys of data', () => {
    const cache = new Cache();
    cache.add('key1', 'customData1');
    cache.add('key2', 'customData2');
    expect(cache.getKeys()).toEqual(['key1', 'key2']);
    cache.delete('key1');
    expect(cache.getKeys()).toEqual(['key2']);
  });
});
