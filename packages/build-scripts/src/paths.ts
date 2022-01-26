import path from 'path';
import fs from 'fs';
import { getProcessOptions } from './utils/process';
import { Target } from './types';

const directory = fs.realpathSync(process.cwd());
const resolve = (relativePath: string) => path.resolve(directory, relativePath);

export const moduleFileExtensions = ['js', 'ts', 'tsx', 'json', 'jsx'];

const resolveModule = (resolveFn: (path: string) => string, filePath: string) => {
  const extension = moduleFileExtensions.find(extension => fs.existsSync(resolveFn(`${filePath}.${extension}`)));

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

const { outDir } = getProcessOptions();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { target }: { target: Target } = require(resolve('package.json')) as { target: Target };

const distPath = outDir ?? 'dist';

export interface Paths {
  buildConfig: string;
  dotenv: string;
  packageJson: string;
  src: string;
  dist: string;
  root: string;
  tsConfig: string;
  yarnLockFile: string;
  nodeModules: string;
  index: string;
}
export interface AppPaths extends Paths {
  html: string;
  public: string;
  serviceWorker: string;
  tsBuildInfoFile: string;
}

export interface LibraryPaths extends Paths {
  assets: string;
  styles: string;
  cssFiles: string;
  jsFiles: string;
  distEsm: string;
  distCjs: string;
  images: string;
}

const basePaths: Paths = {
  buildConfig: resolveModule(resolve, 'build.config'),
  dotenv: resolve('.env'),
  packageJson: resolve('package.json'),
  src: resolve('src'),
  dist: resolve(distPath),
  root: resolve('.'),
  tsConfig: resolve('tsconfig.json'),
  yarnLockFile: resolve('yarn.lock'),
  nodeModules: resolve('node_modules'),
  index: resolveModule(resolve, `src/index`),
};

const appPaths: AppPaths = {
  ...basePaths,
  html: resolve('src/index.html'),
  public: resolve('src/public'),
  serviceWorker: resolveModule(resolve, `src/service-worker`),
  tsBuildInfoFile: resolve('node_modules/.cache/tsconfig.tsbuildinfo'),
};

const libraryPaths: LibraryPaths = {
  ...basePaths,
  assets: resolve('src/assets'),
  styles: resolve('src/styles'),
  cssFiles: resolve('src/**/*.{scss,css}'),
  images: resolve('src/**/*.{png,gif,svg,jpg,jpeg,webp}'),
  jsFiles: resolve('src/**/*.{js,jsx}'),
  distEsm: resolve(`${distPath}/esm`),
  distCjs: resolve(`${distPath}/cjs`),
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
export default target === Target.App ? appPaths : libraryPaths;
