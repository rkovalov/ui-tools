/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Meta } from '@storybook/react/types-6-0';

// use require instead of import for avoiding TS error
// file is not exist in rootDir
const { version } = require('../../package.json');

export const createStoryMeta = (meta: Meta): Meta => {
  return {
    ...meta,
    title: `utils:${version as string}/${meta.title}`,
  };
};
