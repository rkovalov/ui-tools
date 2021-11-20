import merge from 'merge2';
import gulp from 'gulp';

import config from './config';
import paths from '../paths';

import { flatten } from './utils';
import logger from './logger';

const copyImagesStreams = () =>
  [paths.distEsm, paths.distCjs].map(dist => gulp.src([paths.images]).pipe(gulp.dest(dist)));

const copyStaticStreams = () =>
  flatten(
    config.copy.map(({ src, dests, params = {} }) =>
      dests.map(dest => gulp.src(src, { ...params }).pipe(gulp.dest(dest)))
    )
  );

export const copyStaticTask = () =>
  merge(copyImagesStreams(), copyStaticStreams()).pipe(
    logger.gulpLogger({
      before: `Started Copying globs`,
      after: 'Finished copying globs',
    })
  );

export const watchCopyStaticTask = () => {
  const watcher = gulp.watch([...config.copy.map(({ src }) => src), paths.images], function reCopy(cb) {
    copyStaticTask();
    cb();
  });

  watcher.on('change', filePath => {
    // eslint-disable-next-line
    console.log(`Copy file: '${filePath}'...`);
  });
};
