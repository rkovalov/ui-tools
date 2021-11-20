import chalk from 'chalk';
import gulp from 'gulp';
import { buildCssTask, copyStaticTask } from '../../../gulp';
// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Ensure environment variables are read.
require('../../../env');

async function build(): Promise<unknown> {
  console.log(chalk.green('Building styles...'));

  return await new Promise(resolve => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    gulp.series(gulp.parallel(buildCssTask, copyStaticTask), cb => {
      console.log(chalk.green('Building styles... Done'));
      cb();
    })(resolve);
  });
}

build().catch(err => {
  if (err) {
    console.log(chalk.red(typeof err === 'string' ? err : JSON.stringify(err, null, 2)));
  }
  process.exit(1);
});
