module.exports = {
  testEnvironment: 'node',

  testMatch: ['**/__tests__/**/*.test.ts?(x)'],

  moduleNameMapper: {
    '^react-native$': '<rootDir>/src/__tests__/mocks/reactNative.ts',
    '^@react-native-async-storage/async-storage$': '<rootDir>/src/__tests__/mocks/asyncStorage.ts',
    '^expo-secure-store$': '<rootDir>/src/__tests__/mocks/secureStore.ts',
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },

  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|expo|expo-modules-core|expo-secure-store|@react-native-async-storage)/)',
  ],

  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/__tests__/**',
  ],

  verbose: true,
};
