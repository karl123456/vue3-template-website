import { storage } from './storage';

type CacheType = 'session' | 'local' | 'memory';

class CacheService {
  private cacheMap: Map<string, any>;

  private storageKey = 'Cache';

  private cacheType: CacheType = 'memory';

  constructor(type: CacheType = 'memory') {
    this.cacheType = type;
    if (this.cacheType === 'memory') {
      this.cacheMap = new Map();
    } else {
      const entries = storage.getItem(this.storageKey, this.cacheType, []);
      this.cacheMap = new Map(entries);
    }
  }

  private syncStorage() {
    if (this.cacheType === 'memory') {
      return;
    }
    storage.setItem(
      this.storageKey,
      [...this.cacheMap.entries()],
      this.cacheType
    );
  }

  setValue(key: string, value: any) {
    this.cacheMap.set(key, value);
    this.syncStorage();
  }

  getValue(key: string): any {
    return this.cacheMap.get(key);
  }

  remove(key: string) {
    this.cacheMap.delete(key);
    this.syncStorage();
  }

  has(key: string): boolean {
    return this.cacheMap.has(key);
  }

  clear() {
    this.cacheMap.clear();
    this.syncStorage();
  }
}

export const cache = {
  session: new CacheService('session'),
  local: new CacheService('local'),
  memory: new CacheService('memory'),
};
