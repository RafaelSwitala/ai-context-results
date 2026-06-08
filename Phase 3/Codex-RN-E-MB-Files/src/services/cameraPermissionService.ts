import { PermissionsAndroid, Platform } from 'react-native';

export async function requestBarcodeScannerPermission(): Promise<boolean> {
  if (Platform.OS !== 'android') {
    return true;
  }

  const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
  return result === PermissionsAndroid.RESULTS.GRANTED;
}
