type StorageType = 'session' | 'local';
type StorageValue = number | string | object | null;

class StorageService {
  constructor(id: string) {
    if (!id) {
      throw new Error('Storage require an "id"');
    }
    this.id = id;
  }

  private id: string;

  private getStorageFactory(type: StorageType = 'local') {
    return type === 'session' ? sessionStorage : localStorage;
  }

  private prefixKey(key: string) {
    if (!key) {
      throw new Error('Storage item need a "key"');
    }
    return `${this.id}_${key}`;
  }

  getGlobal(type: StorageType = 'local') {
    return this.getStorageFactory(type);
  }

  getItem(key: string, type: StorageType, defaultValue?: StorageValue): any {
    let result = this.getStorageFactory(type).getItem(this.prefixKey(key));
    if (result) {
      try {
        result = JSON.parse(result);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(`${key} parse error`);
      }
    } else if (typeof defaultValue !== 'undefined') {
      result = JSON.parse(JSON.stringify(defaultValue));
    }
    return result;
  }

  setItem(key: string, value: StorageValue, type: StorageType = 'local') {
    this.getStorageFactory(type).setItem(
      this.prefixKey(key),
      JSON.stringify(value)
    );
  }

  removeItem(key: string, type: StorageType = 'local') {
    this.getStorageFactory(type).removeItem(this.prefixKey(key));
  }

  clear(type: StorageType = 'local') {
    this.getStorageFactory(type).clear();
  }
}
export const storage = new StorageService(import.meta.env.VITE_APP_ID);
