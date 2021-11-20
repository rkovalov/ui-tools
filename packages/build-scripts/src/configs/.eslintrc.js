module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  extends: [
    // base eslint config
    'eslint:recommended',
    // turn of rules from base config
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'react-hooks', 'jsx-a11y', 'no-only-tests', 'testing-library', 'prettier'],
  env: {
    es6: true,
    jest: true,
    browser: true,
    node: true,
  },
  // Limit TypeScript linting to TS/TSX
  // https://github.com/typescript-eslint/typescript-eslint/issues/1928
  overrides: [
    {
      files: ['{src,typings}/**/*.{ts,tsx}'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      rules: {
        // All the @typescript-eslint/* rules here...
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unnecessary-type-arguments': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: './',
        project: './tsconfig.json',
        EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true,
      },
    },
  ],
  rules: {
    // disable rules for support both js and ts files
    '@typescript-eslint/*': 'off',
    'react/react-in-jsx-scope': 'off',
    // TODO: check if proptypes needed
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'prettier/prettier': 'error',
    'no-unused-vars': 'warn',
    'one-var': 'off',
    'no-debugger': 'warn',
    'no-plusplus': 'off',
    'one-var-declaration-per-line': 'off',
    'function-paren-newline': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react/forbid-prop-types': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'import/no-named-as-default': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'max-len': [
      1,
      120,
      2,
      {
        ignoreComments: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'object-curly-newline': [
      'off',
      {
        ObjectExpression: 'always',
        ObjectPattern: {
          minProperties: 2,
        },
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
