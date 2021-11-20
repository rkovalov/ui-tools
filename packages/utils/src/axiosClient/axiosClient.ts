import axios, { AxiosError, AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosTransformer } from 'axios';
// import { camelizeKeys, snakelizeKeys } from '../object';

type Error = {
  errors?: string[];
  statusCode?: number;
  isTimeout?: boolean;
  internalError?: string;
};

const TIMEOUT_CODE = 'ECONNABORTED';

const isTimeout = (code: string | undefined) => code === TIMEOUT_CODE;
const isUnauthorized = (statusCode: number) => statusCode === 401;

const onError = (error: AxiosError): Promise<Error> => {
  if (isTimeout(error.code)) {
    return Promise.reject({ isTimeout: true });
  }
  if (!error.response) {
    // invoke when something broken inside promise

    console.log(`%c axios.onError:`, 'color: red; font-weight: 600');
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`%c ${error}`, 'color: red');
    return Promise.reject({ internalError: error });
  }

  if (isUnauthorized(error.response.status)) {
    window.location.reload();
  }
  return Promise.reject({
    errors: error.response.data,
    statusCode: error.response.status,
  });
};

interface Options extends AxiosRequestConfig {
  interceptors?: {
    response?: Array<(v: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>>;
    request?: Array<(v: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>>;
  };
  transformers?: {
    response?: AxiosTransformer[];
    request?: AxiosTransformer[];
  };
}

export const createAxiosClient = ({ interceptors, transformers, ...options }: Options = {}): AxiosInstance => {
  const instance = axios.create({
    timeout: 15000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Requested-With': 'XMLHttpRequest',
      Pragma: 'no-cache',
    },
    paramsSerializer: params => {
      const parts: string[] = [];
      Object.keys(params || {}).forEach(key => {
        let val = params[key];
        if (val !== null && typeof val === 'object') {
          val = JSON.stringify(val);
        }
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
      });
      return parts.join('&');
    },
    // `transformRequest` allows changes to the request data before it is sent to the server
    // This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
    // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
    // FormData or Stream
    // You may modify the headers object.

    transformRequest: [...(transformers?.request ?? [])].concat(axios.defaults.transformRequest ?? []),

    // `transformResponse` allows changes to the response data to be made before
    // it is passed to then/catch
    transformResponse: [
      ...(Array.isArray(axios.defaults.transformResponse) ? axios.defaults.transformResponse : []),
    ].concat(...(transformers?.request ?? [])),
    ...options,
  });

  if (interceptors?.response) {
    interceptors.response.forEach(i => {
      instance.interceptors.response.use(i);
    });
  }

  if (interceptors?.request) {
    interceptors.request.forEach(i => {
      instance.interceptors.request.use(i);
    });
  }

  instance.interceptors.response.use(resp => resp, onError);

  return instance;
};
