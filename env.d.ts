/// <reference types="vite/client" />
declare module 'crypto-js';
declare module 'lodash';
declare module 'file-saver';
declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<unknown, unknown, any>;
  export default component;
}

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_APP_ID: string;
  readonly VITE_BASE_API: string;
  readonly VITE_SERVER_URL: string;
  readonly VITE_PUBLIC_PATH: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
