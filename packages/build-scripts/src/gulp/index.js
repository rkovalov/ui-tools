import gulp from 'gulp';
import { buildJsTask, watchJsTask } from './build-js';
import { copyStaticTask, watchCopyStaticTask } from './build-static';
import { buildCssTask, watchCssTask } from './build-styles';

export { buildCssTask, copyStaticTask };

export const buildTask = cb => {
  const resultTask = gulp.series(gulp.parallel(copyStaticTask, buildCssTask, buildJsTask));
  resultTask(cb);
};

export const watchTask = cb => {
  const resultTask = gulp.parallel(watchCopyStaticTask, watchCssTask, watchJsTask);
  resultTask(cb);
};
