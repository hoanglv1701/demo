import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface RequestOptions {
  // Splicing request parameters to url
  joinParamsToUrl?: boolean;
  // Whether to process the request result
  isTransformResponse?: boolean;
  // Whether to return native response headers
  // For example: use this attribute when you need to get the response headers
  isReturnNativeResponse?: boolean;
  // Whether to join url
  joinPrefix?: boolean;
  // Interface address, use the default apiUrl if you leave it blank
  apiUrl?: string;
  // Request splicing path
  urlPrefix?: string;
  // Error message prompt type
  errorMessageMode?: Service.ErrorMessageMode;
  // Success message prompt type
  successMessageMode?: Service.SuccessMessageMode;
  // Whether to add a timestamp
  joinTime?: boolean;
  // ignore duplicate requests
  ignoreDuplicateRequest?: boolean;
  // Whether to send token in header
  withToken?: boolean;
  // request retry mechanism
  retryRequest?: RetryRequest;
}

export interface RetryRequest {
  isOpenRetry: boolean;
  count: number;
  waitTime: number;
}

export interface HttpError extends Error {
  config: HttpRequestConfig;
}

// export interface HttpResponse extends AxiosResponse {
//   config: HttpRequestConfig;
// }

export interface HttpRequestConfig extends AxiosRequestConfig {
  requestOptions?: RequestOptions;
  transformResponseHook?: (res: AxiosResponse, options: RequestOptions) => any;
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;
  requestInterceptors?: (request: HttpRequestConfig) => void;
  responseInterceptors?: (response: AxiosResponse) => Promise<AxiosResponse>;
  responseInterceptorsCatch?: (axiosInstance: AxiosInstance, error: HttpError) => any;
}

export default class Http {
  request<T>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
  post<T>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
  get<T>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
  put<T>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
  delete<T>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
}

export interface UploadFileParams {
  // Other parameters
  data?: Recordable<any>;
  // File parameter interface field name
  name?: string;
  // file name
  filename?: string;
  [key: string]: any;
}
