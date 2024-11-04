import dayjs from 'dayjs';
import { request } from '@/utils/request';
import { MD5 } from 'crypto-js';
import { generateUUID } from '@/utils/core';

console.log('generateUUID', generateUUID());


// 获取网格架构图
export const getGridImg = () => {
  return request({
    url: '/app/grid',
    method: 'GET',
    params: {
      state: generateUUID(),
    },
  });
};

// 获取网格架构信息
export const getGridData = (data: any) => {
  return request({
    url: '/app/grid/gridMerchant/pageList',
    method: 'POST',
    data,
    params: {
      state: generateUUID(),
    },
  });
};

// 获取网格人员信息
export const getGridPerson = () => {
  return request({
    url: '/app/grid/gridUser',
    method: 'GET',
    params: {
      state: generateUUID(),
    },
  });
};

// 获取网格商家详情
export const getGridDetail = (id: string) => {
  return request({
    url: '/app/grid/gridMerchant',
    method: 'GET',
    params: {
      id,
      state: generateUUID(),
    },
  });
};
