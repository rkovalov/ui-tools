import chalk from 'chalk';
import paths, { moduleFileExtensions } from '../paths';

export default () => {
  const config = {
    roots: ['<rootDir>/src'],
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
    setupFiles: [require.resolve('react-app-polyfill/jsdom')],

    setupFilesAfterEnv: [require.resolve('./setupTests.js')],
    testMatch: ['<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}', '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'],
    testEnvironment: 'jsdom',
    testRunner: require.resolve('jest-circus/runner'),
    transform: {
      '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': require.resolve('./transformers/babelTransform.js'),
      '^.+\\.(css|scss)$': require.resolve('./transformers/cssTransform.js'),
    },
    transformIgnorePatterns: [
      '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
      '^.+\\.module\\.(css|sass|scss)$',
    ],
    modulePaths: [],
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        require.resolve('./__mocks__/fileMock.js'),
      '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    },
    moduleFileExtensions: [...moduleFileExtensions, 'node'],
    watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
    resetMocks: true,
  };

  const overrides = Object.assign({}, require(paths.packageJson).jest);
  const supportedKeys = [
    'clearMocks',
    'collectCoverageFrom',
    'coveragePathIgnorePatterns',
    'coverageReporters',
    'coverageThreshold',
    'displayName',
    'extraGlobals',
    'globalSetup',
    'globalTeardown',
    'moduleNameMapper',
    'resetMocks',
    'resetModules',
    'restoreMocks',
    'snapshotSerializers',
    'testMatch',
    'transform',
    'transformIgnorePatterns',
    'watchPathIgnorePatterns',
  ];
  if (overrides) {
    supportedKeys.forEach(key => {
      if (Object.prototype.hasOwnProperty.call(overrides, key)) {
        if (Array.isArray(config[key]) || typeof config[key] !== 'object') {
          // for arrays or primitive types, directly override the config key
          config[key] = overrides[key];
        } else {
          // for object types, extend gracefully
          config[key] = Object.assign({}, config[key], overrides[key]);
        }

        delete overrides[key];
      }
    });
    const unsupportedKeys = Object.keys(overrides);
    if (unsupportedKeys.length) {
      const isOverridingSetupFile = unsupportedKeys.indexOf('setupFilesAfterEnv') > -1;

      if (isOverridingSetupFile) {
        console.error(
          chalk.red(
            'We detected ' +
              chalk.bold('setupFilesAfterEnv') +
              ' in your package.json.\n\n' +
              'Remove it from Jest configuration'
          )
        );
      } else {
        console.error(
          chalk.red(
            '\nOut of the box, only supports overriding ' +
              'these Jest options:\n\n' +
              supportedKeys.map(key => chalk.bold('  \u2022 ' + key)).join('\n') +
              '.\n\n' +
              'These options in your package.json Jest configuration ' +
              'are not currently supported:\n\n' +
              unsupportedKeys.map(key => chalk.bold('  \u2022 ' + key)).join('\n')
          )
        );
      }

      process.exit(1);
    }
  }
  return config;
};
