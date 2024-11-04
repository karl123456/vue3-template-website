import { cache } from './cache';

const TOKEN_KEY = 'Token';

export const getToken = () => {
  return cache.local.getValue(TOKEN_KEY);
};

export const setToken = (val: string) => {
  cache.local.setValue(TOKEN_KEY, val);
};

export const removeToken = () => {
  cache.local.remove(TOKEN_KEY);
};
