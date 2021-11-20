/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cache } from '../cache';
import { isPromise } from '../promise';

type MockCleaner = () => void;

export type Response<T> = { data?: T; statusCode?: number | undefined };
export type MockResponse<T> = { data?: T; statusCode?: number; delayMs?: number };

export interface Provider<T, P extends any[]> {
  (...params: P): CancellablePromise<T>;
  mock: (response: MockResponse<T>, ...params: P) => MockCleaner;
  setMocker: (mocker: (...params: P) => MockResponse<T> | Promise<MockResponse<T>>) => MockCleaner;
  mocker?: (...params: P) => MockResponse<T> | Promise<MockResponse<T>>;
}

type Fetcher<T, P extends any[]> = (...params: P) => Promise<Response<T>>;

interface FetcherOptions {
  cacheTime?: number;
}
export interface CancellablePromise<T> extends Promise<Response<T>> {
  cancel: () => void;
  isCancelled: boolean;
}

function makeCancellablePromise<T>(promise: Promise<Response<T>>): CancellablePromise<T> {
  let rejectFn: (reason: { isCancelled: boolean }) => void;
  const cPromise = new Promise((resolve, reject) => {
    rejectFn = reject;
    Promise.resolve(promise).then(resolve).catch(reject);
  }) as CancellablePromise<T>;
  cPromise.isCancelled = false;
  cPromise.cancel = () => {
    rejectFn({ isCancelled: true });
    cPromise.isCancelled = true;
  };
  return cPromise;
}

const createPromiseMock = <T>(promiseOrData: MockResponse<T> | Promise<MockResponse<T>>): CancellablePromise<T> => {
  const resolveOrRejectData = (resolve: (v: any) => void, reject: (v: any) => void) => (data: MockResponse<T>) => {
    const { statusCode, ...rest } = data;
    const code = statusCode ?? 200;
    if (code >= 200 && code < 400) {
      setTimeout(() => resolve({ ...rest, statusCode: code }), data.delayMs ?? 0);
    } else {
      setTimeout(() => reject({ ...rest, statusCode }), data.delayMs ?? 0);
    }
  };

  return makeCancellablePromise(
    new Promise((resolve, reject) => {
      if (isPromise(promiseOrData)) {
        void promiseOrData.then(resolveOrRejectData(resolve, reject));
      } else {
        resolveOrRejectData(resolve, reject)(promiseOrData);
      }
    })
  );
};

export function createProvider<T, P extends any[] = any>(
  fetcher: Fetcher<T, P>,
  fetcherOptions: FetcherOptions = {}
): Provider<T, P> {
  const withCache = typeof fetcherOptions.cacheTime === 'number' && fetcherOptions.cacheTime > 0;
  const expireTime = fetcherOptions.cacheTime;

  const cache = new Cache<CancellablePromise<T>>({ expireTime });
  const mockedData = new Cache<CancellablePromise<T>>();

  const provider: Provider<T, P> = (...params: P) => {
    const key = JSON.stringify(params.filter(p => p !== null && p !== undefined));
    if (provider.mocker) {
      // Return promise with custom mocker
      return createPromiseMock(provider.mocker(...params));
    }
    // return mock data if exist
    const mockPromise = mockedData.get(key);
    if (mockPromise) {
      return mockPromise;
    }
    const cachePromise = cache.get(key);

    if (withCache && cachePromise) {
      return cachePromise;
    }

    const promise = makeCancellablePromise(fetcher(...params));
    if (withCache) {
      cache.add(key, promise);
      promise.catch((...response) => {
        cache.delete(key);
        void Promise.reject(...response);
      });
    }

    return promise;
  };

  provider.mock = (data, ...params) => {
    const key = JSON.stringify(params);
    mockedData.add(key, createPromiseMock(data));

    return () => {
      mockedData.delete(key);
    };
  };

  provider.setMocker = mocker => {
    provider.mocker = mocker;

    return () => {
      provider.mocker = undefined;
    };
  };
  return provider;
}
