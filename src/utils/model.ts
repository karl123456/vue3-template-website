import type { AxiosRequestConfig } from 'axios';

interface SourceConfig extends AxiosRequestConfig {
  cache?: boolean;
}

export type DataSource = string | SourceConfig;

export interface AppConfig {
  app: {
    version: string;
    language?: string;
    theme?: string;
    [key: string]: any;
  };
  server: {
    base: string;
    [key: string]: any;
  };
  [key: string]: any;
}
