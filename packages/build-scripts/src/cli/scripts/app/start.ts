// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

import chalk from 'chalk';
import fs from 'fs';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { prepareUrls } from 'react-dev-utils/WebpackDevServerUtils';
import openBrowser from 'react-dev-utils/openBrowser';
import { configFactory } from '../../../webpack';
import paths from '../../../paths';

// Ensure environment variables are read.
require('../../../env');

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isCompilerError(err: any): err is { message?: string } {
  return typeof err === 'object';
}

function start() {
  const useTypescript = fs.existsSync(paths.tsConfig);
  if (useTypescript) {
    console.log(chalk.green('Found tsconfig.json, will be apply ts-loader instead of babel-loader.'));
  }
  let config = configFactory({ mode: 'development', useTypescript });

  if (fs.existsSync(paths.buildConfig)) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const buildConfig = require(paths.buildConfig);
    if (buildConfig.webpack) {
      console.log(chalk.green('Found custom config in build.js'));
      config = buildConfig.webpack(config, { mode: 'development' }) as webpack.Configuration;
    }
  }
  const protocol = process.env.HTTPS === 'true' || config.devServer?.https ? 'https' : 'http';
  const HOST = config.devServer?.host ?? '0.0.0.0';
  const port: number = Number(config.devServer?.port) || 3000;
  // @ts-ignore
  // prepareUrls take pathname as 4 argument, but types is not correct
  const urls = prepareUrls(protocol, HOST, port, config.output?.publicPath);
  // "Compiler" is a low-level interface to webpack.
  // It lets us listen to some events and provide our own custom messages.
  let compiler;
  try {
    compiler = webpack(config);
  } catch (err) {
    console.log(chalk.red('Failed to compile.'));
    if (isCompilerError(err)) {
      console.log(err.message ?? err);
    }
    process.exit(1);
  }

  const devServer = new WebpackDevServer(compiler, config.devServer);

  // Launch WebpackDevServer.
  devServer.listen(port, HOST, err => {
    if (err) {
      console.log(chalk.red(err));
    }
    console.log(chalk.cyan('Starting the development server...\n'));
    openBrowser(urls.localUrlForBrowser);
  });

  ['SIGINT', 'SIGTERM'].forEach(sig => {
    process.on(sig as 'SIGINT' | 'SIGTERM', function () {
      devServer.close();
      process.exit();
    });
  });

  if (process.env.CI !== 'true') {
    // Gracefully exit when stdin ends
    process.stdin.on('end', function () {
      devServer.close();
      process.exit();
    });
  }
}

void start();
