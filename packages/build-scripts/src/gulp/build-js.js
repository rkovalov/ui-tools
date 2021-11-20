import babel from 'gulp-babel';
import { src, dest, parallel, watch } from 'gulp';
import logger from './logger';
import paths from '../paths';

import babelConfig from '../babelrc';

function makeJsInputStream() {
  return src(paths.jsFiles, { sourcemaps: true });
}

const getBabelConfig = ({ modules, renameSass }) => {
  // transform-react-handled-props,  Who did use this plugin ?
  return {
    presets: [
      [
        '@babel/env',
        {
          useBuiltIns: 'entry',
          corejs: 3,
          modules,
        },
      ],
      ['@babel/react', { runtime: 'automatic' }],
    ],
    plugins: [
      ...babelConfig.plugins,
      renameSass && ['transform-rename-import', { original: '^(.+?)\\.scss$', replacement: '$1.css' }],
    ].filter(Boolean),
  };
};

function buildEsmTask() {
  const stream = makeJsInputStream();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return stream
    .pipe(babel(getBabelConfig({ modules: false, renameSass: false })))
    .pipe(dest(paths.distEsm))
    .pipe(
      logger.gulpLogger({
        before: `Started Building ESM modules`,
        after: 'Finished Building ESM modules',
      })
    );
}

function buildCjsTask() {
  const stream = makeJsInputStream();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return stream
    .pipe(babel(getBabelConfig({ modules: 'cjs', renameSass: false })))
    .pipe(dest(paths.distCjs))
    .pipe(
      logger.gulpLogger({
        before: `Started Building CJS modules`,
        after: 'Finished Building CJS modules',
      })
    );
}

function buildJsTask(cb) {
  const resultTask = parallel(buildEsmTask, buildCjsTask);
  return resultTask(cb);
}

function watchJsTask() {
  const watcher = watch([paths.jsFiles], function rebuildJs(cb) {
    // TODO, try to run only esm modules (should be faster), need test with storybook
    buildJsTask(cb);
  });

  watcher.on('change', filePath => {
    // eslint-disable-next-line
    console.log(`Rebuilding js file: '${filePath}'...`);
  });
}

module.exports = {
  buildJsTask,
  watchJsTask,
};
