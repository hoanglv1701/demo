import { AxiosError, CustomParamsSerializer } from 'axios';
import { isString } from 'lodash';
import { nanoid } from 'nanoid';
import { stringify } from 'qs';
import { AxiosRetry } from './http/axiosRetry';
import { joinTimestamp, setObjToUrlParams } from './http/helper';
import { Http } from './http/http';
import { HttpRequestConfig } from './http/types';
import { LOCAL_STORAGE, REQUEST_METHOD, STATUS } from '@/constants/common';
import { logoutExpired } from '@/utilities/auth';
import { deepMerge } from '@/utilities/object';

export const qtudApiUrl = `${import.meta.env.VITE_USER_API_URL}`;
export const notificationUrl = `${import.meta.env.VITE_NOTIFICATION_API_URL}`;

/**
 ***********
 ** axios **
 ***********
 */

const isSessionExpired = false;
let failedRequestsQueue: any[] = [];
// let isRefreshing = false;

const defaultConfig: HttpRequestConfig = {
  // request timeout
  timeout: 1000 * 60 * 5,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept-Language': 'vi'
  },

  // Array format parameter serialization（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer
  },
  transformResponseHook: (res, options) => {
    const { isTransformResponse, isReturnNativeResponse } = options;

    // Whether to return the original response header For example: use this attribute when you need to get the response header
    if (isReturnNativeResponse) {
      return res;
    }

    // Binary data is returned directly
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
      return res.data;
    }

    // do not do any processing, return directly
    // It is used when the page code may need to directly obtain code, data, and message information
    if (!isTransformResponse) {
      return res.data;
    }

    const { data } = res;

    return data;
  },
  requestInterceptors: (config) => {
    const handleConfig = { ...config };
    if (handleConfig.headers) {
      const token = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN) || '';
      if (token && handleConfig.requestOptions?.withToken) {
        handleConfig.headers.Authorization = `${token}`;
        handleConfig.headers.traceId = `${nanoid(36)}`;
      } else {
        delete handleConfig.headers.Authorization;
      }
    }

    return config;
  },
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinTime = true, urlPrefix, joinParamsToUrl } = options;

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }

    const params = config.params || {};
    const data = config.data || false;

    if (config.method?.toUpperCase() === 'GET') {
      if (!isString(params)) {
        // Add a timestamp parameter to the get request to avoid getting data from the cache.
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // Compatible with restful style
        config.url = `${config.url}${params}${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        if (
          Reflect.has(config, 'data') &&
          config.data &&
          (Object.keys(config.data).length > 0 || config.data instanceof FormData)
        ) {
          config.data = data;
          config.params = params;
        } else {
          // For Non-GET requests, if no data is provided, params will be treated as data
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(config.url as string, Object.assign({}, config.params, config.data));
        }
      } else {
        // Compatible with restful style
        config.url = `${config.url}${params}`;
        config.params = undefined;
      }
    }

    return config;
  },
  responseInterceptorsCatch: (axiosInstance, httpError) => {
    const { config } = (httpError || {}) as { config: HttpRequestConfig };
    const errorCode = (httpError as AxiosError).response?.status;
    if (errorCode === 401) {
      logoutExpired();
      return;
    }

    //TODO: refreshToken
    // const originalRequest = (httpError as AxiosError).config as any;
    // if (errorCode === 401 && !originalRequest._retry) {
    //   if (isRefreshing) {
    //     return new Promise((resolve, reject) => {
    //       failedRequestsQueue.push({ resolve, reject, originalRequest });
    //     })
    //       .then((access_token) => {
    //         originalRequest.headers['Authorization'] = access_token;
    //         return axios(originalRequest);
    //       })
    //       .catch((err) => {
    //         return Promise.reject(err);
    //       });
    //   }

    //   originalRequest._retry = true;
    //   isRefreshing = true;

    //   const response = await axios.post('/refresh-token');
    //   const access_token = response.data.access_token;
    //   axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
    //   _processQueue(access_token);
    //   isRefreshing = false;
    //   return axios(originalRequest);
    // }

    // show error
    // handleAxiosError(httpError as AxiosError, requestOptions?.errorMessageMode);

    // retry axios when error
    const retryRequest = new AxiosRetry();
    const { isOpenRetry } = config.requestOptions?.retryRequest || {};
    config.method?.toUpperCase() === 'GET' && isOpenRetry && retryRequest.retry(axiosInstance, httpError);

    // All response exceptions differentiate the source as cancellation request/non-cancellation request
    return Promise.reject(httpError);
  },
  requestOptions: {
    // Add prefix to url by default
    joinPrefix: true,
    // Whether to return the original response header For example: use this property when you need to get the response header
    isReturnNativeResponse: false,
    // Need to process the returned data
    isTransformResponse: true,
    // Add parameters to url when post request
    joinParamsToUrl: false,
    // message prompt type
    errorMessageMode: 'notification',
    // interface address
    apiUrl: '',
    // interface stitching address
    urlPrefix: '',
    // whether to add timestamp
    joinTime: true,
    // ignore duplicate requests
    ignoreDuplicateRequest: true,
    // whether to carry token
    withToken: true,
    retryRequest: {
      isOpenRetry: false,
      count: 5,
      waitTime: 2000
    }
  }
};

function _processQueue(access_token: string) {
  failedRequestsQueue.forEach((request) => {
    request.resolve(access_token);
  });
  failedRequestsQueue = [];
}

function createHttp(opt?: Partial<HttpRequestConfig>) {
  return new Http(deepMerge(defaultConfig, opt || {}));
}

const customConfig = {
  baseURL: `${import.meta.env.VITE_API_URL}`
};

export const webHttp = createHttp(customConfig);

export const webHttpLoading = createHttp(customConfig);

export const WebHttp8701 = createHttp({
  baseURL: `${import.meta.env.VITE_USER_API_URL}`
});

export const WebHttpBase =
  window.location.hostname == 'localhost'
    ? createHttp({
        baseURL: `${import.meta.env.VITE_USER_API_URL}`
      })
    : createHttp({
        baseURL: `${window.location.origin}`
      });

// quan tri he thing
export const userHttp = createHttp({
  baseURL: `${import.meta.env.VITE_USER_API_URL}`
});

// danh muc
export const categoryHttp = createHttp({
  baseURL: `${import.meta.env.VITE_CATEGORY_API_URL}`
});

export const personHttp = createHttp({
  baseURL: `${qtudApiUrl}`
});

export const notificationHttp = createHttp({
  baseURL: `${notificationUrl}`
});

export const qtudHttp = createHttp({
  baseURL: `${qtudApiUrl}`
});

/**
 ***********
 ** fetch **
 ***********
 */
function parseJSON(response: Response): Promise<any> {
  return response.json();
}

function statusCode(response: Response): Response {
  if (response.status === 401) {
    localStorage.clear();
    window.location.replace('/login');
  }
  return response;
}

function request(url: string, options: RequestInit): Promise<any> {
  const accessToken = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
  if (!accessToken) {
    localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, '');
  }
  const newHeaders = Object.assign(
    {
      Authorization: accessToken ? `${accessToken}` : '',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    options?.headers
  );
  options.headers = newHeaders;

  return fetch(url, options).then(statusCode).then(parseJSON);
}

export const getData = async (url: string, options?: RequestInit) => {
  try {
    const req = await request(url, {
      method: REQUEST_METHOD.GET,
      ...options
    });
    if (req.code === STATUS.SUCCESS) {
      return req;
    }
  } catch (error) {
    console.log(error);
  }
};

export const postData = async (url: string, body: any, options?: RequestInit) => {
  try {
    const req = await request(url, {
      method: REQUEST_METHOD.POST,
      body: JSON.stringify(body),
      ...options
    });
    if (req.code === STATUS.SUCCESS) {
      return req;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteData = async (url: string) => {
  try {
    const req = await request(url, {
      method: REQUEST_METHOD.DELETE
    });
    if (req.code === STATUS.SUCCESS) {
      return req;
    }
  } catch (error) {
    console.log(error);
  }
};
