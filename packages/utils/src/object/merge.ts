import { isObject } from './object';

type Obj = { [key: string]: unknown };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TUnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function quickMerge<T extends Obj[]>(...objects: [...T]): TUnionToIntersection<T[number]> {
  const [a, b] = objects;
  if (!isObject(a)) {
    return b as TUnionToIntersection<T[number]>;
  }
  const result = { ...a };

  Object.keys(b).forEach((key: string) => {
    if (isObject(b[key])) {
      // @ts-ignore
      result[key] = quickMerge(result[key], b[key]);
    } else {
      // @ts-ignore
      result[key] = b[key];
    }
  });
  return result as TUnionToIntersection<T[number]>;
}

export function merge<T extends Obj[]>(...objects: [...T]): TUnionToIntersection<T[number]> {
  // @ts-ignore
  return objects.reduce((acc, current) => quickMerge(acc, current), {});
}
