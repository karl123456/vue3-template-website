import { get, set } from 'lodash';
import type { AppConfig } from './model';
import { cache } from './cache';

interface ConfigOption {
  url: string;
}

export class ConfigService {
  private meta: AppConfig = {
    app: {
      version: '',
      language: '',
      theme: '',
    },
    server: {
      base: '',
    },
  };

  private url = './config.json';

  private load(): Promise<AppConfig> {
    return fetch(this.url, {
      method: 'GET',
      cache: 'no-cache',
    }).then((response) => response.json());
  }

  get data() {
    return { ...this.meta };
  }

  init(option?: ConfigOption): Promise<AppConfig> {
    if (option && option.url) {
      this.url = option.url;
    }
    return this.load().then((data: any) => {
      const localConfig = cache.local.getValue('Config');
      if (localConfig) {
        // 版本不一致，
        // 清除所有缓存,并重新加载
        if (localConfig.app?.version !== data.app?.version) {
          cache.local.clear();
          cache.session.clear();
          cache.memory.clear();
          window.location.reload();
          throw new Error('Reload to update');
        }
        this.meta = data;
      } else {
        this.meta = data;
        cache.local.setValue('Config', this.data);
      }
      return this.data;
    });
  }

  get(path: string) {
    return get(this.data, path);
  }

  set(path: string, value: any) {
    set(this.data, path, value);
    cache.local.setValue('Config', this.data);
  }
}

export const config = new ConfigService();
