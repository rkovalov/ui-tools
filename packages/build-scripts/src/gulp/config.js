import paths from '../paths';

export default {
  copy: [
    {
      src: `${paths.assets}/**/*`,
      dests: [`${paths.dist}/assets`, `${paths.distEsm}/assets`, `${paths.distCjs}/assets`],
    },
  ],
  sassIncludePaths: [],
};
