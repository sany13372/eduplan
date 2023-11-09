const defaultConfig = require('@baldrick/jest/dist/jest.config');
const path = require('path');

module.exports = {
  ...defaultConfig,
  setupFiles: ['dotenv/config', ...(defaultConfig?.setupFiles ?? [])],
  testRegex: [defaultConfig.testRegex, '__tests__/.*.test.(j|t)sx?$'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/__mocks__/svg.ts',
    '\\.mp4': '<rootDir>/__mocks__/mp4.ts',
    '^@(src|components|constants|utils)/.*\\.(css|scss|svg|png)$': 'identity-obj-proxy',
    ...defaultConfig.moduleNameMapper,
  },
  transformIgnorePatterns: [
    '/node_modules/?!(@baldrick|@pcbl-ui-v4|@sber-universe|@kit-edu|switch-new|tooltip-new).+(js|jsx)$',
  ],
  setupFilesAfterEnv: [path.join(__dirname, 'jest.setup.js')],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist', '/__tests__'],
};
