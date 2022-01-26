/* eslint-disable @typescript-eslint/no-unsafe-return */
import { createProvider, CancellablePromise } from './provider';

// function isErrorResponse(err: any): err is Response<any> {
//   return typeof err === 'object';
// }

const getProvider = (successCb?: ReturnType<typeof jest.fn>, errorCb?: ReturnType<typeof jest.fn>) =>
  createProvider<string>(
    () =>
      new Promise(resolve => {
        setTimeout(() => resolve({ data: 'response' }), 0);
      })
        .then(r => {
          if (successCb) successCb();
          return r;
        })
        .catch(e => {
          if (errorCb) {
            errorCb();
          }
          return e;
        }) as CancellablePromise<string>
  );

describe('Provider', () => {
  it('correct create provider', async () => {
    const provider = getProvider();
    const { data } = await provider();
    expect(provider).toBeInstanceOf(Function);
    expect(provider.mock).toBeInstanceOf(Function);
    expect(data).toBe('response');
  });

  it('correct cancel promise', async () => {
    const successFirstCb = jest.fn();
    const errorFirstCb = jest.fn();
    const successSecondCb = jest.fn();
    const errorSecondCb = jest.fn();
    const promise = getProvider(successFirstCb, errorFirstCb)();
    promise.cancel();
    await promise.then(successSecondCb).catch(errorSecondCb);
    expect(successFirstCb).not.toBeCalled();
    expect(errorFirstCb).not.toBeCalled();
    expect(successSecondCb).not.toBeCalled();
    expect(errorSecondCb).toBeCalledTimes(1);
    expect(errorSecondCb).toBeCalledWith({ isCancelled: true });
  });

  it('set and unset Mock Data.', async () => {
    const provider = getProvider();
    const clearMock = provider.mock({ data: 'Mock Data' });
    const { data, statusCode } = await provider();
    expect(data).toBe('Mock Data');
    expect(statusCode).toBe(200);
    clearMock();
    const { data: data2 } = await provider();
    expect(data2).toBe('response');
  });

  it('should not send request and resolve data from cache.', async () => {
    const fetcher = jest.fn().mockResolvedValue({ data: 'response' });
    const provider = createProvider(fetcher, { cacheTime: 10 });
    const { data } = await provider();
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(data).toBe('response');
    const { data: data2 } = await provider();
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(data2).toBe('response');
  });

  it('should set cache time.', async () => {
    const fetcher = jest.fn().mockResolvedValue({ data: 'response' });
    const provider = createProvider(fetcher, { cacheTime: 10 });
    void provider();
    expect(fetcher).toHaveBeenCalledTimes(1);
    void provider();
    expect(fetcher).toHaveBeenCalledTimes(1);
    await new Promise(resolve => {
      setTimeout(() => resolve(provider()), 10);
    });
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it('get data from cache if invokes fetcher with params', async () => {
    const fetcher = jest.fn().mockImplementation((params?: { name?: string }) => {
      if (params?.name) {
        return Promise.resolve({
          data: `response with param name: '${params.name}'`,
        });
      }
      return Promise.resolve({ data: 'response' });
    });
    const provider = createProvider<string>(params => fetcher(params), {
      cacheTime: 10,
    });
    const { data } = await provider();
    expect(data).toBe('response');
    expect(fetcher).toBeCalledTimes(1);
    const { data: data2 } = await provider({ name: 'Test' });
    expect(data2).toBe("response with param name: 'Test'");
    expect(fetcher).toBeCalledTimes(2);
    await provider();
    expect(fetcher).toBeCalledTimes(2);
    await provider({ name: 'Test' });
    expect(fetcher).toBeCalledTimes(2);
  });

  it('set mock with Error statusCode', async () => {
    const provider = getProvider();
    provider.mock({ statusCode: 500 });
    try {
      await provider();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      expect(error.statusCode).toBe(500);
    }
  });
  it('set mock with successful statusCode', async () => {
    const provider = getProvider();
    provider.mock({ statusCode: 201 });
    const { statusCode } = await provider();
    expect(statusCode).toBe(201);
  });

  it('should send request again when use cache and got error', async () => {
    // Test with promise rejection should be the last in the file
    const fetcher = jest.fn().mockImplementationOnce(() =>
      Promise.reject({
        data: 'response',
        statusCode: 500,
      })
    );
    const provider = createProvider(fetcher, { cacheTime: 30000 });

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const makeRequest = () => new Promise(resolve => provider().then(resolve).catch(resolve));

    await makeRequest();
    expect(fetcher).toHaveBeenCalledTimes(1);
    await makeRequest();
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  xit('set mocker', () => {});
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  xit('remove mocker', () => {});
});
