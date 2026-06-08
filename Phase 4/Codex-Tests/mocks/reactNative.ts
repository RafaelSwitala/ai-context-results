import { jest } from '@jest/globals';

export const Platform = {
  OS: 'ios',
  select: <T>(values: { ios?: T; android?: T; web?: T; default?: T }): T | undefined =>
    values.ios ?? values.default,
};

export const BackHandler = {
  addEventListener: jest.fn(() => ({ remove: jest.fn() })),
  exitApp: jest.fn(),
};

export const AppState = {
  addEventListener: jest.fn(() => ({ remove: jest.fn() })),
};

export const Linking = {
  openURL: jest.fn(() => Promise.resolve()),
};

export const StyleSheet = {
  create: <T extends object>(styles: T): T => styles,
};

export const ActivityIndicator = 'ActivityIndicator';
export const Pressable = 'Pressable';
export const ScrollView = 'ScrollView';
export const Text = 'Text';
export const TextInput = 'TextInput';
export const View = 'View';
