import chalk from 'chalk';
import through from 'through2';

function formatDate(date) {
  const parts = [date.getHours(), date.getMinutes(), date.getSeconds()];
  return parts
    .map(p => {
      let s = p.toString();
      if (s.length === 1) {
        s = `0${s}`;
      }
      return s;
    })
    .join(':');
}

export function log(str, color = 'cyan') {
  const timeStr = formatDate(new Date());
  const res = chalk`{blue [${timeStr}]} ${chalk[color](str)}`;
  console.log(res);
}

export function gulpLogger(options) {
  let beforeComplete = false,
    afterComplete = false;

  function loggerEndHandler(flushCallback) {
    if (options.after && !afterComplete) {
      log(options.after, 'green');
      afterComplete = true;
    }

    flushCallback();
  }

  return through.obj((file, ext, streamCallback) => {
    if (options.before && !beforeComplete) {
      log(options.before);
      beforeComplete = true;
    }
    if (options.logFiles && file.relative) {
      log(chalk`file: ${file.relative}`);
    }

    streamCallback(null, file);
  }, loggerEndHandler);
}

export default {
  log,
  gulpLogger,
};
