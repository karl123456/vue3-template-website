import dayjs from 'dayjs';

/**
 * 日期格式化
 * @param value
 * @param format
 * @returns
 */
export function formatDate(
  value: Date | string | number,
  format = 'YYYY-MM-DD'
): string {
  return value ? dayjs(value).format(format) : '';
}

/**
 * 日期+时间格式化
 * @param value
 * @param format
 * @returns
 */
export function formatDateTime(
  value: Date | string | number,
  format = 'YYYY-MM-DD HH:mm:ss'
): string {
  return formatDate(value, format);
}

/**
 * 数字格式化, 默认小数点后保留两位
 * @param value
 * @param option
 * @returns
 */
export function formatNumber(
  value: number,
  option: {
    decimal?: number;
    locale?: string;
  } = {}
): string {
  const { decimal = 2 } = option;
  return Number(value).toFixed(decimal);
}

/**
 * 金额格式化 千分位加 , 小数点默认显示两位
 * @param value
 * @param option
 * @returns
 */
export function formatCurrency(
  value: number,
  option: {
    decimal?: number;
    unit?: string;
    locale?: string;
  } = {}
): string {
  if(value<0){
    value= Math.abs(value)
  }

  const { decimal = 2 } = option;
  const arr = Number(value).toFixed(decimal).split('.');
  let result = `.${arr[1]}`;
  for (let i = arr[0].length; i > 0; i -= 3) {
    //
    result = `,${arr[0].slice(Math.max(i - 3, 0), i)}${result}`;
  }
  return result.slice(1);
}

/**
 * 百分比格式化
 * @param value
 * @param option
 * @returns
 */
export function formatPercent(
  value: number,
  option: {
    decimal?: number;
  } = {}
): string {
  const { decimal = 2 } = option;
  return `${(Number(value) * 100).toFixed(decimal)}'%'`;
}
