const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const logger = require('gulp-logger');

const directory = fs.realpathSync(process.cwd());
const resolve = relativePath => path.resolve(directory, relativePath);

function copyConfigs() {
  return gulp
    .src(resolve('src/configs/**/*'), { dot: true })
    .pipe(
      logger({
        before: 'Starting Copying Configs...',
        after: 'Copying complete!',
      })
    )
    .pipe(gulp.dest(resolve('dist/configs/')));
}

function defaultTask(cb) {
  copyConfigs();
  cb();
}

exports.default = defaultTask;
