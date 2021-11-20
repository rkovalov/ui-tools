export default {
  presets: [
    [
      '@babel/env',
      {
        useBuiltIns: 'entry',
        corejs: 3,
      },
    ],
    [
      '@babel/react',
      {
        runtime: 'automatic',
      },
    ],
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
};
