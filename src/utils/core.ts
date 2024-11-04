import { isPlainObject } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import type { ObjectDiffItem } from './model';
/**
 * 判断是否是空值
 * 空数组、空对象判断为空值
 * @param value
 * @returns boolean
 */
export const isEmpty = (value: any): boolean => {
  return (
    value === '' ||
    value === null ||
    value === undefined ||
    (Array.isArray(value) && value.length === 0) ||
    JSON.stringify(value) === '{}'
  );
};

/**
 * 深度清除Object内空值
 * 返回新的对象
 * @param obj
 * @returns
 */
export const cleanObject = (obj: {
  [key: string]: any;
}): { [key: string]: any } => {
  if (isPlainObject(obj)) {
    const result: { [key: string]: any } = {};
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (!isEmpty(value)) {
        if (isPlainObject(obj)) {
          result[key] = cleanObject(value);
        } else {
          result[key] = value;
        }
      }
    });
    return result;
  }
  return obj;
};

/**
 * 获取文本字节长度
 * @param text
 * @returns
 */
export const getTextByteLength = (text: string) => {
  return (
    text
      .toString()
      .split('')
      .map((word) => (word.charCodeAt(0) < 299 ? 1 : 2)) as number[]
  ).reduce((prev: number, current: number) => prev + current);
};

// 文件下载
export const downloadFile = (src: string, filename: string) => {
  const a = document.createElement('a');
  a.setAttribute('download', filename || '');
  a.href = src;
  a.target = '_blank';
  a.click();
  a.remove();
};

export const saveFile = (file: Blob, type: string, filename: string) => {
  const blob = new Blob([file], {
    type,
  });
  const src = window.URL.createObjectURL(blob);
  downloadFile(src, filename);
};

export const openLink = (href: string) => {
  const a = document.createElement('a');
  a.href = href;
  a.referrerPolicy = 'no-referer';
  a.target = '_blank';
  a.click();
  a.remove();
};

/**
 * 比较两个对象的属性浅
 * 返回属性：true-相同；false-不同
 * @param obj
 * @returns
 */
export const compareObjectsKey = (
  objA: { [key: string]: any },
  objB: { [key: string]: any },
  tag: string
): { [key: string]: string } => {
  const result: { [key: string]: string } = {};
  if (!objA || !objB) {
    return result;
  }
  const entriesA = Object.entries(objA);
  const entriesB = Object.entries(objB);
  entriesA.forEach(([key, obj]) => {
    if (objB[key] === undefined || objA[key] !== objB[key]) {
      result[key] = tag;
    }
  });
  entriesB.forEach(([key, obj]) => {
    if (objB[key] === undefined || objA[key] !== objB[key]) {
      result[key] = tag;
    }
  });
  return result;
};

/**
 * 比较两个数组的属性浅
 * 返回属性：true-相同；false-不同
 * @param list
 * @returns
 */
export const compareListObjectsKey = (
  listA: { [key: string]: any }[],
  listB: { [key: string]: any }[],
  tags: string[], // [0]-删除[1]-改变[2]-新增
  itemKey: string // 每一项的key
): ObjectDiffItem[] => {
  // 处理list中的每一项key
  const itemHandler = (item: { [x: string]: any }) => {
    const key: string = item[itemKey] || uuidv4();
    const jtem = {
      ...item,
      [itemKey]: key,
    } as { [key: string]: any };
    return jtem;
  };
  // 处理list每一项key,并转map
  const mapA = {} as { [key: string]: any };
  const mapB = {} as { [key: string]: any };
  const listAx = listA.map((item) => {
    const jtem = itemHandler(item);
    mapA[jtem[itemKey]] = jtem;
    return jtem;
  });
  const listBx = listB.map((item) => {
    const jtem = itemHandler(item);
    mapB[jtem[itemKey]] = jtem;
    return jtem;
  });
  // 数组A每项结果
  const resultAList: ObjectDiffItem[] = listAx.map((item) => {
    // 数据项改变
    const value = compareObjectsKey(item, mapB[item[itemKey]], tags[1]);
    // 如果B没有该项
    const tag = mapB[item[itemKey]] === undefined ? tags[0] : '';
    // 数组A每项结果
    return {
      tag: Object.keys(value).length > 0 ? tags[1] : tag,
      value,
    };
  });
  // 数组B每项结果
  const resultBList: ObjectDiffItem[] = listBx.map((item) => {
    // 数据项改变
    const value = compareObjectsKey(item, mapA[item[itemKey]], tags[1]);
    // 如果A没有该项
    const tag = mapA[item[itemKey]] === undefined ? tags[2] : '';
    // 数组B每项结果
    return {
      tag: Object.keys(value).length > 0 ? tags[1] : tag,
      value,
    };
  });
  const result = [] as ObjectDiffItem[];
  result.push({
    value: resultAList,
  });
  result.push({
    value: resultBList,
  });
  return result;
};

export const generateUUID = () => {
  let d = new Date().getTime();
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now(); // use high-precision timer if available
  }
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 || 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r && 0x3) || 0x8).toString(16);
  });
  return uuid;
};
