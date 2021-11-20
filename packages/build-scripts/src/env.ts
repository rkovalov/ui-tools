/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import GitRevisionPlugin from 'git-revision-webpack-plugin';

import { addTrailingSlash } from './utils/common';
import paths from './paths';

const packageJson = require(paths.packageJson) as { version: string };

const gitRevision = new GitRevisionPlugin({
  versionCommand: 'describe --tags',
  branch: true,
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const VERSION = packageJson.version;
const BRANCH = gitRevision.branch();
const COMMITHASH = gitRevision.commithash();

console.log(chalk.yellow('VERSION: ' + chalk.green(VERSION)));
console.log(chalk.yellow('BRANCH: ' + chalk.green(BRANCH)));
console.log(chalk.yellow('COMMITHASH: ' + chalk.green(COMMITHASH)));

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  throw new Error('The NODE_ENV environment variable is required but was not specified.');
}

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
  `${paths.dotenv}.${NODE_ENV}.local`,
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  NODE_ENV !== 'test' && `${paths.dotenv}.local`,
  `${paths.dotenv}.${NODE_ENV}`,
  paths.dotenv,
].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile as string)) {
    require('dotenv-expand')(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      require('dotenv').config({
        path: dotenvFile,
      })
    );
  }
});

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebook/create-react-app/issues/253.
// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/apwi/modules.html#modules_loading_from_the_global_folders
// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of webpack shims.
// https://github.com/facebook/create-react-app/issues/1023#issuecomment-265344421
// We also resolve them to make sure all tools using them work consistently.

const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH ?? '')
  .split(path.delimiter)
  .filter(folder => folder && !path.isAbsolute(folder))
  .map(folder => path.resolve(appDirectory, folder))
  .join(path.delimiter);

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in webpack configuration.
const REACT_APP = /^REACT_APP_/i;

interface EnvVars {
  NODE_ENV: string;
  PUBLIC_URL: string;
  PUBLIC_PATH: string;
  WDS_SOCKET_HOST: string;
  WDS_SOCKET_PATH: string;
  WDS_SOCKET_PORT: string;
  VERSION: string;
  BRANCH: string;
  COMMITHASH: string;
  [key: string]: string | undefined;
}
type StringifiedEnv = { 'process.env': EnvVars };

export function getClientEnvironment(): { raw: EnvVars; stringified: StringifiedEnv } {
  const raw = Object.keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce(
      (env, key: string) => {
        env[key] = process.env[key];
        return env;
      },
      {
        // Useful for determining whether we’re running in production mode.
        // Most importantly, it switches React into the correct mode.
        NODE_ENV: process.env.NODE_ENV ?? 'development',
        // Useful for resolving the correct path to static assets in `public`.
        // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
        // This should only be used as an escape hatch. Normally you would put
        // images into the `src` and `import` them in code to get their paths.
        PUBLIC_URL: addTrailingSlash(process.env.PUBLIC_URL),
        PUBLIC_PATH: addTrailingSlash(process.env.PUBLIC_PATH),
        // We support configuring the sockjs pathname during development.
        // These settings let a developer run multiple simultaneous projects.
        // They are used as the connection `hostname`, `pathname` and `port`
        // in webpackHotDevClient. They are used as the `sockHost`, `sockPath`
        // and `sockPort` options in webpack-dev-server.
        WDS_SOCKET_HOST: process.env.WDS_SOCKET_HOST,
        WDS_SOCKET_PATH: process.env.WDS_SOCKET_PATH,
        WDS_SOCKET_PORT: process.env.WDS_SOCKET_PORT,

        VERSION,
        BRANCH,
        COMMITHASH,
      } as EnvVars
    );
  // Stringify all values so we can feed into webpack DefinePlugin
  const stringified: StringifiedEnv = {
    'process.env': Object.keys(raw).reduce((env, key: string) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {} as EnvVars),
  };

  return { raw, stringified };
}
