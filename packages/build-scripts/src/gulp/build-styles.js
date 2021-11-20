import gulp from 'gulp';
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';
import merge from 'merge2';
import plumber from 'gulp-plumber';
import gulpIf from 'gulp-if';
import autoprefixer from 'autoprefixer';

import packageImporter from 'node-sass-package-importer';
import jsonImporter from 'node-sass-json-importer';

import paths from '../paths';
import config from './config';
import logger from './logger';

// eslint-disable-next-line no-unused-vars
function makeCssInputStream({ ignoreErrors }) {
  // ignoring errors for watch mode. To avoid breaking build while develop
  return gulp
    .src([paths.cssFiles])
    .pipe(gulpIf(ignoreErrors, plumber()))
    .pipe(
      sass({
        includePaths: config.sassIncludePaths,
        importer: [packageImporter(), jsonImporter()],
      })
    )
    .pipe(postcss([autoprefixer()]));
}

const copyStyles = ({ ignoreErrors }) => {
  const streams = [paths.distEsm, paths.distCjs].map(dist =>
    gulp.src([paths.cssFiles]).pipe(gulpIf(ignoreErrors, plumber())).pipe(gulp.dest(dist))
  );
  return streams;
};

function buildCss({ ignoreErrors }) {
  // const cssStreams = [paths.distEsm, paths.distCjs].map((dist) =>
  //   makeCssInputStream({ ignoreErrors }).pipe(gulp.dest(dist))
  // );
  const copyStreams = copyStyles({ ignoreErrors });
  return merge(copyStreams).pipe(
    logger.gulpLogger({
      before: 'Started Building CSS',
      after: 'Finished CSS',
    })
  );
}

export const buildCssTask = () => {
  return buildCss({ ignoreErrors: false });
};

export const watchCssTask = () => {
  const watcher = gulp.watch(paths.cssFiles, function rebuildCss(cb) {
    buildCss({ ignoreErrors: true });
    cb();
  });
  watcher.on('change', filePath => {
    // eslint-disable-next-line
    console.log(`Rebuilding css file: ${filePath}`);
  });
};
