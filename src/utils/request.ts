import axios, { type AxiosRequestConfig } from 'axios';
import { saveAs } from 'file-saver';

import { MD5 } from 'crypto-js';
import { global } from '@/utils/global';
import { getToken } from '@/utils/auth';
import { errorHandler } from '@/utils/errorHandler';
import { cache as cacheService } from '@/utils/cache';
import { config } from '@/utils/config';
import { cleanObject } from '@/utils/core';
import type { DataSource } from '@/utils/model';

const md5Key = '123qweas123';
const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD ? '/' : import.meta.env.VITE_BASE_API,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    ContentType: 'application/json',
  },
  validateStatus: () => {
    return true;
  },
  timeoutErrorMessage: '系统接口请求超时',
});

axiosInstance.interceptors.request.use(
  (requestConfig) => {
    const option = { ...requestConfig };
    const headers = { ...option.headers };

    // headers.lang = config.get('app.language');
    console.log('import.meta.env.PROD', import.meta.env.PROD);
    console.log(config.get('server.base'));

    if (import.meta.env.PROD) {
      let url = option.url as string;
      if (!/^(http|https):\/\//.test(url)) {
        url = config.get('server.base') + `/${url}`.replace(/\/+/g, '/');
      }
      option.url = url;
    }

    const token = getToken();
    if (token) {
      headers.token = token;
    }
    // const { user } = global.store.state.value;
    // if (user.activedSystem?.systemCode) {
    //   headers.systemCode = user.activedSystem.systemCode;
    // }

    // 清除空数据
    const { data } = option;
    if (data) {
      option.data = cleanObject(data);
    }

    const { params } = option;
    // if (params) {
    //   option.params = cleanObject(params);
    // }
    // 参数加密 接口验签
    let sign = '';
    if (params && Object.keys(params).length) {
      Object.keys(params).forEach((k) => {
        sign += `${k}=${params[k]}&`;
      });
    }
    sign += `key=${md5Key}&`;
    if (data) {
      sign += JSON.stringify(data);
    }
    console.log('sign', sign);

    headers.sign = MD5(sign);
    option.headers = headers;

    return option;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(async (response) => {
  const { data, status, request } = response;
  if (status !== 200) {
    throw new Error(data.message || 'Request Failed');
  }
  if (
    request.responseType === 'blob' ||
    request.responseType === 'arraybuffer'
  ) {
    return data;
  }

  if (!data) {
    throw Error('System Error');
  }
  let { code = 200 } = data;
  code = Number(code);
  if (code !== 200) {
    if (code === 401) {
      await global.store.user.logout();
      throw new Error('请重新登录');
    }
    throw new Error(data.msg || '系统错误');
  }
  return data;
});

export const request = (options: DataSource) => {
  let requestConfig: DataSource = {};
  if (typeof options === 'string') {
    requestConfig.url = options;
  } else {
    requestConfig = options;
  }

  const { url } = requestConfig;

  if (!url) {
    return Promise.reject(Error('请求地址不能为空'));
  }

  const { cache, ...others } = requestConfig;

  // 如果标明持续缓存，则不清除缓存请求
  const cachekey = `Request_${JSON.stringify(others)}`;
  if (cacheService.memory.has(cachekey)) {
    return cacheService.memory.getValue(cachekey);
  }

  const task = axiosInstance(requestConfig)
    .then((res) => {
      if (!cache) {
        setTimeout(() => {
          cacheService.memory.remove(cachekey);
        }, 600);
      }

      return res;
    })
    .catch((error) => {
      // 出错情况下，清除缓存
      setTimeout(() => {
        cacheService.memory.remove(cachekey);
      }, 600);
      errorHandler(error);
      return Promise.reject(error.message);
    });
  cacheService.memory.setValue(cachekey, task);
  return task;
};

// 通用下载方法
export function download(
  url: string,
  params: { [key: string]: any },
  filename: string,
  options: AxiosRequestConfig = {}
) {
  const { layout } = global.store;
  layout.toggleLoading(true, '正在下载数据，请稍候');
  return request({
    url,
    method: 'POST',
    data: params,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    responseType: 'blob',
    ...options,
  })
    .then(async (data: any) => {
      const isBlob = data && data.type !== 'application/json';
      if (isBlob) {
        const blob = new Blob([data]);
        saveAs(blob, filename);
      } else {
        const responseText = await data.text();
        const responseObject = JSON.parse(responseText);
        const errMsg = responseObject.msg;
        errorHandler(new Error(errMsg));
      }
      layout.toggleLoading(false);
    })
    .catch((error: Error) => {
      errorHandler(
        new Error(error.message || '下载文件出现错误，请联系管理员！')
      );
      layout.toggleLoading(false);
    });
}

export const uploadFile = (file: File, options: AxiosRequestConfig = {}) => {
  const { url, data = {}, method = 'post' } = options;
  const formData = new FormData();
  formData.append('file', file);
  Object.keys(data).forEach((key) => {
    if (key !== 'file') {
      formData.append(key, data[key]);
    }
  });
  return request({
    url,
    method,
    data: formData,
  });
};

export const uploadRequest = (options: any) => {
  const {
    action,
    headers,
    data,
    file,
    filename,
    method,
    onError,
    onProgress,
    onSuccess,
  } = options;
  const key = method.toUpperCase() === 'POST' ? 'data' : 'params';
  const formData = new FormData();
  formData.append(filename, file);
  Object.keys(data).forEach((item) => {
    formData.append(item, data[item]);
  });
  return request({
    url: action,
    headers: {
      ...headers,
    },
    method,
    [key]: formData,
    onUploadProgress: (e: ProgressEvent) => {
      onProgress(e);
    },
  })
    .then((res: any) => {
      onSuccess(res);
      return res;
    })
    .catch((error: Error) => {
      onError(error);
    });
};
