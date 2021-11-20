// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

import fs from 'fs';
import webpack from 'webpack';
import chalk from 'chalk';

import paths from '../../../paths';
import { configFactory } from '../../../webpack';

// Ensure environment variables are read.
require('../../../env');

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

type WebpackError = {
  stack?: string;
  details?: string;
};

interface CustomWebpackConfig extends webpack.Configuration {
  buildFor?: string;
}

interface Compiler extends webpack.Compiler {
  buildFor?: string;
}

function formatInfo(info?: webpack.StatsCompilation): { errors: string; warnings: string } {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const errorMessages = (info?.errors ?? []).map(({ message }): string => message);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const warnMessages = (info?.warnings ?? []).map(({ message }): string => message);
  return {
    errors: ['Errors:', ...errorMessages].join(' \n\n- '),
    warnings: ['Warnings:', ...warnMessages].join(' \n\n- '),
  };
}

function getCompilers(configs: CustomWebpackConfig[]): Compiler[] {
  return configs.map(({ buildFor, ...config }) => {
    const compiler = webpack(config) as Compiler;
    compiler.buildFor = buildFor;
    return compiler;
  });
}

async function build(): Promise<unknown> {
  console.log(chalk.green('Creating an optimized production build...'));
  const useTypescript = fs.existsSync(paths.tsConfig);
  if (useTypescript) {
    console.log(chalk.green('Found tsconfig.json, will be apply ts-loader instead of babel-loader.'));
  }
  let config = configFactory({ mode: 'production', useTypescript });
  if (fs.existsSync(paths.buildConfig)) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const buildConfig = require(paths.buildConfig);
    if (buildConfig.webpack) {
      console.log(chalk.green('Found custom webpack config in build.js'));
      config = buildConfig.webpack(config, { mode: 'production' }) as webpack.Configuration;
    }
  }
  // Config could be array;
  const compilers = getCompilers(Array.isArray(config) ? config : [config]);

  console.log(chalk.green(`Webpack version: ${compilers[0]?.webpack.version ?? 'undefined'}`));
  const promises = compilers.map(async compiler => {
    const buildFor = compiler.buildFor ?? 'app';

    return await new Promise((resolve, reject) => {
      try {
        compiler.run((err?: WebpackError, stats?: webpack.Stats) => {
          console.log(chalk.green(`Webpack build for: "${buildFor}"`));
          if (err) {
            console.log(chalk.red(`Webpack build error: ${buildFor}`));
            if (err.details) {
              console.log(chalk.red(err.details));
            }
            reject(err.stack ?? err);
          }
          const info = stats?.toJson();
          const formattedInfo = formatInfo(info);

          if (stats?.hasErrors()) {
            console.log(chalk.red(`Webpack build error: "${buildFor}"`));
            reject(formattedInfo.errors);
          }

          if (stats?.hasWarnings()) {
            console.log(chalk.yellow(`Webpack warnings for: "${buildFor}"`));
            console.warn(chalk.yellow(formattedInfo.warnings));
          }
          resolve(stats);
        });
      } catch (e) {
        reject(e);
      }
    });
  });

  return Promise.all(promises).catch(e => Promise.reject(e));
}

build().catch(err => {
  if (err) {
    console.log(chalk.red(typeof err === 'string' ? err : JSON.stringify(err, null, 2)));
  }
  process.exit(1);
});
