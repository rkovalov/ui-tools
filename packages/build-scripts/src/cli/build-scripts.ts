/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// import { dirname, normalize, join, relative, basename, sep } from 'path';
import chalk from 'chalk';
import yargs, { Arguments } from 'yargs';
import crossSpawn from 'cross-spawn';
import paths from '../paths';
import { Target } from '../types';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version, name } = require('../../../package.json');

function printErrorAndMarkFailed(message: unknown) {
  console.error(message);
  process.exitCode = 1;
}

enum Script {
  Build = 'build',
  BuildStyles = 'build-styles',
  Start = 'start',
  Test = 'test',
}
// Object.values(MyEnum)

const scripts = Object.values(Script);
const targets = Object.values(Target);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { target } = require(paths.packageJson) as { target: Target };

function validateArgs(argv: Arguments) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [script] = argv._;
  if (!scripts.includes(script as Script)) {
    printErrorAndMarkFailed(chalk.red(`Provide script name one of ${scripts.toString()}`));
    printErrorAndMarkFailed(
      chalk.yellow(`Unknown script "${script as string}". Perhaps you need to update @ui-tools/build-scripts?`)
    );
    return false;
  }
  return true;
}

function validateTarget() {
  if (target && targets.includes(target)) {
    return true;
  }
  if (!target) {
    printErrorAndMarkFailed(chalk.red(`Target is not found in package.json, set {"target": (${targets.join('|')})}"`));
  }
  if (!targets.includes(target)) {
    printErrorAndMarkFailed(
      chalk.red(
        `Target "${target}" is not supported in package.json, set one of available {"target": (${targets.join('|')})}"`
      )
    );
  }
  return false;
}

function validateScript(argv: Arguments) {
  return validateArgs(argv) && validateTarget();
}

process.on('unhandledRejection', printErrorAndMarkFailed);

const { argv } = yargs
  .usage(`Usage: $0 <${scripts.join(' | ')}> [options]`)
  .command(Script.Build, 'Build assets depends on target of package.json (app or library)')
  .command(Script.BuildStyles, 'Build styles depends on target of package.json (app or library)')
  .command(Script.Test, 'Test assets using jest.')
  .command(Script.Start, 'Start development mode.')
  .version(`${name as string}: ${chalk.green(version)}`)
  .option('out-dir', { type: 'string', default: 'dist', description: 'Output directory' })
  .option('watch', { type: 'boolean', default: false, description: 'Watch files' })
  .option('watchAll', { type: 'boolean', default: false, description: 'Watch all test files' })
  .alias('h', 'help')
  .alias('v', 'version')
  .help();
// TODO: invistigate how to turn on strict mode with posibility to pass optional file names
// Needed for passing name of files or test for test matcher
// .strict();

const { _, 'out-dir': outDir, watch, watchAll, passWithNoTests } = argv;

if (validateScript(argv)) {
  // run script
  const [script, ...fileNames] = _;
  const result = crossSpawn.sync(
    process.execPath,
    [
      require.resolve(`./scripts/${target}/${script as string}`),
      `--out-dir=${outDir}`,
      `--watch=${String(watch)}`,
      `--watchAll=${String(watchAll)}`,
      `--passWithNoTests=${String(passWithNoTests)}`,
      ...(fileNames as string[]),
    ],
    {
      stdio: 'inherit',
    }
  );
  if (result.signal) {
    if (result.signal === 'SIGKILL') {
      console.log(
        'The build failed because the process exited too early. ' +
          'This probably means the system ran out of memory or someone called ' +
          '`kill -9` on the process.'
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    } else if (result.signal === 'SIGTERM') {
      console.log(
        'The build failed because the process exited too early. ' +
          'Someone might have called `kill` or `killall`, or the system could ' +
          'be shutting down.'
      );
    }
    process.exit(1);
  }
  process.exit(result.status as number);
}
