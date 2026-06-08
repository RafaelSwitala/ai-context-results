import { useMemo, useState } from 'react';
import { BackHandler } from 'react-native';

import { ROUTE_NAMES } from './navigation.constants';
import BarcodeScannerScreen from '../screens/BarcodeScannerScreen';
import LicenseScreen from '../screens/LicenseScreen';
import LoginScreen from '../screens/LoginScreen';
import PinGateScreen from '../screens/PinGateScreen';
import QRCodeScannerScreen from '../screens/QRCodeScannerScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WebViewScreen from '../screens/WebViewScreen';
import { requestBarcodeScannerPermission } from '../services/cameraPermissionService';
import { EditableStorageConfigValues } from '../types/storageConfig';

type RouteName = (typeof ROUTE_NAMES)[keyof typeof ROUTE_NAMES];

export default function AppNavigator() {
  const [route, setRoute] = useState<RouteName>(ROUTE_NAMES.login);
  const [qrImport, setQrImport] = useState<Partial<EditableStorageConfigValues> | null>(null);
  const [webviewUrl, setWebviewUrl] = useState<string | null>(null);
  const [barcodeReturnUrl, setBarcodeReturnUrl] = useState<string | null>(null);

  const navigation = useMemo(
    () => ({
      openLogin: () => setRoute(ROUTE_NAMES.login),
      openSettings: () => setRoute(ROUTE_NAMES.settings),
      openPin: () => setRoute(ROUTE_NAMES.pin),
      openQrScanner: () => setRoute(ROUTE_NAMES.qrScanner),
      openLicense: () => setRoute(ROUTE_NAMES.license),
      openWebView: (url: string) => {
        setWebviewUrl(url);
        setRoute(ROUTE_NAMES.webview);
      },
      openBarcodeScanner: async (returnUrl: string) => {
        const granted = await requestBarcodeScannerPermission();
        if (!granted) {
          setWebviewUrl(returnUrl);
          setRoute(ROUTE_NAMES.webview);
          return;
        }

        setBarcodeReturnUrl(returnUrl);
        setRoute(ROUTE_NAMES.barcodeScanner);
      },
      closeApp: () => {
        BackHandler.exitApp();
      },
      finishQrScanner: (values: Partial<EditableStorageConfigValues>) => {
        setQrImport(values);
        setRoute(ROUTE_NAMES.settings);
      },
    }),
    [],
  );

  if (route === ROUTE_NAMES.qrScanner) {
    return <QRCodeScannerScreen onCancel={navigation.openSettings} onImport={navigation.finishQrScanner} />;
  }

  if (route === ROUTE_NAMES.pin) {
    return <PinGateScreen onCancel={navigation.openLogin} onSuccess={navigation.openSettings} />;
  }

  if (route === ROUTE_NAMES.settings) {
    return (
      <SettingsScreen
        importedValues={qrImport}
        onCancel={navigation.openLogin}
        onOpenScanner={navigation.openQrScanner}
        onSaved={navigation.openLogin}
      />
    );
  }

  if (route === ROUTE_NAMES.barcodeScanner && barcodeReturnUrl) {
    return (
      <BarcodeScannerScreen
        returnUrl={barcodeReturnUrl}
        onCancel={navigation.openWebView}
        onInvalidAuth={navigation.openLogin}
        onScanResult={navigation.openWebView}
      />
    );
  }

  if (route === ROUTE_NAMES.webview && webviewUrl) {
    return (
      <WebViewScreen
        url={webviewUrl}
        onBarcodeRequest={(returnUrl) => {
          void navigation.openBarcodeScanner(returnUrl);
        }}
        onCloseApp={navigation.closeApp}
        onLogout={navigation.openLogin}
        onReturnToLogin={navigation.openLogin}
      />
    );
  }

  if (route === ROUTE_NAMES.license) {
    return <LicenseScreen onClose={navigation.openLogin} />;
  }

  return (
    <LoginScreen
      onOpenLicense={navigation.openLicense}
      onOpenSettings={navigation.openSettings}
      onOpenPin={navigation.openPin}
      onLoginSuccess={navigation.openWebView}
    />
  );
}
