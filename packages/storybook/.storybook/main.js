const { webpack } = require('@ui-tools/build-scripts');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function isStyleRule(rule) {
  const regexp = new RegExp('(style-loader|css-loader|sass-loader|postcss-loader|resolve-url-loader)');
  if (typeof rule === 'string') {
    return regexp.exec(rule);
  }
  if (rule.loader && regexp.exec(rule.loader)) {
    return true;
  } else if (rule.use) {
    return rule.use.some(isStyleRule);
  }
  return false;
}

function findStyleLoaders(rules) {
  return rules.filter(isStyleRule);
}

module.exports = {
  core: {
    builder: 'webpack5',
  },
  // solution: typescript: { reactDocgen: false },
  // https://github.com/storybookjs/storybook/issues/15336
  typescript: { reactDocgen: false },
  stories: [
    './stories-example/**/*.stories.mdx',
    './stories-example/**/*.stories.@(js|jsx|ts|tsx)',
    '../../../packages/**/src/**/*.stories.mdx',
    '../../../packages/**/src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.
    // console.log(JSON.stringify(config, null, 2));

    config.module.rules = config.module.rules.filter(f => f.test.toString() !== '/\\.css$/');

    const baseConfig = webpack.configFactory({ mode: configType.toLowerCase() });

    const styleRules = findStyleLoaders(baseConfig.module.rules);

    config.module.rules.push(...styleRules);
    const CssMinimizerPlugin =
      configType === 'PRODUCTION' &&
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      });
    config.plugins = [...config.plugins, CssMinimizerPlugin].filter(Boolean);
    config.optimization = baseConfig.optimization;

    // Return the altered config
    return config;
  },
};
