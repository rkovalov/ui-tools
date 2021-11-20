import hash from 'object-hash';
import camelCase from 'just-camel-case';
import snakeCase from 'just-snake-case';

type Obj = { [key: string]: unknown };

export function sortKeys(obj: Obj): Obj {
  return Object.keys(obj)
    .sort()
    .reduce((r, k) => ((r[k] = obj[k]), r), {} as { [key: string]: unknown });
}

// get<TObject extends object, TKey extends keyof TObject>(object: TObject, path: TKey | [TKey]): TObject[TKey];
export function get(obj: Obj, path: string): Obj | unknown | undefined {
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return path.split('.').reduce((acc, p) => acc[p], { ...obj });
}

export function camelizeKeys(object: Obj | Obj[] | undefined): Obj | Obj[] | undefined {
  if (!object || typeof object !== 'object' || object instanceof Date) {
    return object;
  }

  if (Array.isArray(object)) {
    // @ts-ignore
    return object.map(element => camelizeKeys(element));
  }

  return Object.keys(object).reduce((result, fieldName) => {
    const camelKey = camelCase(fieldName);
    if (camelKey && camelKey in result) {
      throw new Error(`Camelcased key ${camelKey as string} would overwrite existing key of the given object`);
    }
    return {
      ...result,
      [camelKey]: camelizeKeys(object[fieldName] as Obj),
    };
  }, {});
}

export function snakelizeKeys(object: Obj | Obj[] | undefined): Obj | Obj[] | undefined {
  if (!object || object instanceof Date || object instanceof FormData || typeof object !== 'object') {
    return object;
  }

  if (Array.isArray(object)) {
    // @ts-ignore
    return object.map(element => snakelizeKeys(element));
  }

  return Object.keys(object).reduce((result, fieldName) => {
    const snakeKey = snakeCase(fieldName);
    if (snakeKey && snakeKey in result) {
      throw new Error(`Snakecased key ${snakeKey} would overwrite existing key of the given object`);
    }
    return {
      ...result,
      [snakeKey]: snakelizeKeys(object[fieldName] as Obj),
    };
  }, {});
}

export const getHashId = (object: Obj): string => hash(object);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isObject(o: any | undefined): boolean {
  if (!o || Array.isArray(o) || o instanceof Set || o instanceof Map) {
    return false;
  }
  return typeof o === 'object';
}
