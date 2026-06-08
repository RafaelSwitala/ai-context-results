import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

/** Web/dev fallback when expo-secure-store native module is unavailable (see docs/web-platform.md). */

let secureStoreAvailable: boolean | null = null;

async function canUseSecureStore(): Promise<boolean> {
  if (secureStoreAvailable === null) {
    secureStoreAvailable = await SecureStore.isAvailableAsync();
  }
  return secureStoreAvailable;
}

export async function getSecureItemAsync(key: string): Promise<string | null> {
  if (await canUseSecureStore()) {
    return SecureStore.getItemAsync(key);
  }
  return AsyncStorage.getItem(key);
}

export async function setSecureItemAsync(key: string, value: string): Promise<void> {
  if (await canUseSecureStore()) {
    await SecureStore.setItemAsync(key, value);
    return;
  }
  await AsyncStorage.setItem(key, value);
}

export async function deleteSecureItemAsync(key: string): Promise<void> {
  if (await canUseSecureStore()) {
    await SecureStore.deleteItemAsync(key);
    return;
  }
  await AsyncStorage.removeItem(key);
}
