export enum HttpProtocol {
  Http = 0,
  Https = 1,
  HttpsWithoutValidation = 2,
}

export type StorageConfigValues = {
  server: string;
  client: string;
  token: string;
  pin: string;
  protocol: HttpProtocol;
  locale: string | null;
  currentConfigVersion: string | null;
  userName: string;
  password: string;
  hasValidSettings: boolean;
  hasValidLogin: boolean;
};

export type EditableStorageConfigValues = Pick<
  StorageConfigValues,
  'server' | 'client' | 'token' | 'pin' | 'protocol' | 'locale'
>;

export type QrStorageConfigValues = {
  protocolName: string | null;
  protocolVersion: string | null;
  server: string | null;
  client: string | null;
  token: string | null;
  pin: string | null;
  protocol: HttpProtocol;
  culture: string | null;
};

export type ConfigFileValues = QrStorageConfigValues & {
  version: string | null;
};

export const DEFAULT_STORAGE_CONFIG: StorageConfigValues = {
  server: '',
  client: '',
  token: '',
  pin: '',
  protocol: HttpProtocol.Https,
  locale: null,
  currentConfigVersion: null,
  userName: '',
  password: '',
  hasValidSettings: false,
  hasValidLogin: false,
};

export function isHttpProtocol(value: unknown): value is HttpProtocol {
  return value === HttpProtocol.Http || value === HttpProtocol.Https || value === HttpProtocol.HttpsWithoutValidation;
}

export function protocolToScheme(protocol: HttpProtocol): 'http' | 'https' {
  return protocol === HttpProtocol.Http ? 'http' : 'https';
}
