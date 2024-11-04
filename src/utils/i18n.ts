import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en-gb';

import { createI18n } from 'vue-i18n';
import type { I18n } from 'vue-i18n';

import zhCNMessage from '@/assets/i18n/zh-CN.json';
import enGBMessage from '@/assets/i18n/en-GB.json';

class I18nService {
  private i18n: I18n;

  constructor() {
    this.i18n = createI18n({
      allowComposition: true,
      legacy: true,
      fallbackLocale: 'zh-CN',
      messages: {
        'zh-CN': zhCNMessage,
        'en-GB': enGBMessage,
      },
    });
  }

  get core() {
    return this.i18n;
  }

  useLocale(locale: string) {
    if (!locale) {
      return;
    }
    this.i18n.global.locale = locale;
    dayjs.locale(locale.toLowerCase());
    document.querySelector('html')?.setAttribute('lang', locale);
  }
}

export const i18n = new I18nService();

export const LOCALE_LIST = [
  { label: '简体中文', key: 'zh-CN' },
  { label: '英文', key: 'en-GB' },
];
