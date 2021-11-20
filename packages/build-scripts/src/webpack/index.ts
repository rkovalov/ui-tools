import type { Configuration } from 'webpack';
import chalk from 'chalk';
import createDevConfig from './webpack.config.dev';
import createProdConfig from './webpack.config.prod';

interface Config extends Configuration {
  useTypescript?: boolean;
  mode?: 'development' | 'production';
}

export const configFactory = ({ mode = 'development', ...config }: Config): Configuration => {
  console.log(chalk.yellow(`Webpack config was created for '${mode}' mode`));
  if (mode === 'production') {
    return createProdConfig(config) as Configuration;
  }
  return createDevConfig(config) as Configuration;
};
