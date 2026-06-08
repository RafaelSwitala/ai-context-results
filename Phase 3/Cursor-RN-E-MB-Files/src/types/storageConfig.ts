/** Protocol enum — STOR-003, STOR-007, MAP-021 */
export enum HttpProtocol {
  Http = 0,
  Https = 1,
  HttpsWithoutValidation = 2,
}

export type StorageConfigFormState = {
  server: string;
  client: string;
  protocol: HttpProtocol;
  token: string;
  pin: string;
  locale: string | null;
};

export type StoredLoginPreferences = StorageConfigFormState & {
  userName: string;
  password: string;
  hasValidSettings: boolean;
  hasValidLogin: boolean;
  currentConfigVersion: string | null;
};

export type QrCodeSettings = {
  protocol: string | null;
  protocolVersion: string | null;
  server: string | null;
  client: string | null;
  securityProtocol: HttpProtocol;
  token: string | null;
  pin: string | null;
  culture: string | null;
};

export type ConfigFilePayload = {
  protocol: string;
  protocolVersion: string;
  version: string;
  server: string;
  mandant: string;
  https: string;
  token: string;
  culture: string;
  pin: string;
};

export type ConfigFileSettings = {
  version: string;
  protocol: string;
  protocolVersion: string;
  server: string;
  client: string;
  securityProtocol: HttpProtocol;
  culture: string;
  token: string;
  pin: string;
};

export type CheckAccessResult = {
  ok: boolean;
  status: number;
};

export type HttpFetchFn = (
  url: string,
  init?: RequestInit,
) => Promise<{ status: number }>;
