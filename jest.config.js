export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
    }],
  },
  moduleNameMapper: {
    '^.+\\.svg$': '<rootDir>/src/__mocks__/svgMock.js',
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
};