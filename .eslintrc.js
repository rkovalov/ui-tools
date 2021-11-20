module.exports = {
  ...require('@ui-tools/build-scripts/dist/configs/.eslintrc'),
  // Limit TypeScript linting to TS/TSX
  // https://github.com/typescript-eslint/typescript-eslint/issues/1928
  overrides: [
    {
      files: ['{packages,src}/**/*.{ts,tsx}'],
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
        // DIFF between @ui-tools/build-scripts/dist/configs/.eslintrc
        project: 'packages/*/src/tsconfig.esm.json',
        // DIFF
        EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true,
      },
    },
  ],
};
