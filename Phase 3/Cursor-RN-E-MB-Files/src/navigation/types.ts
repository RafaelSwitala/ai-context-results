import { HttpProtocol } from '../types/storageConfig';

export type RootStackParamList = {
  Login: undefined;
  Settings: {
    qrPayload?: {
      server: string;
      client: string;
      protocol: HttpProtocol;
      token: string;
      pin: string;
      locale: string;
    };
  } | undefined;
  Pin: undefined;
  QRCodeScanner: undefined;
  WebView: { url: string };
  BarcodeScanner: { returnUrl: string };
  License: undefined;
};
