import { merge } from 'webpack-merge';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';

import paths from '../paths';

import createBaseConfig from './webpack.config.base';

const USE_FAST_REFRESH = !process.env.FAST_REFRESH ? true : process.env.FAST_REFRESH === 'true';

export default ({ useTypescript = false, ...config }) => {
  const baseConfig = createBaseConfig({ useTypescript });
  return merge(
    baseConfig,
    {
      mode: 'development',
      devServer: {
        devMiddleware: {
          // https://github.com/webpack/webpack-dev-server/releases/tag/v4.0.0-beta.3
          publicPath: baseConfig.output.publicPath,
        },
        hot: true,
        host: 'localhost',
        // proxy: {
        //   "/api": {
        //     target: process.env.API_URL,
        //     pathRewrite: { "^/api": "" }
        //   }
        // },
        // https: true,
        port: 8080,
        // Enable gzip compression of generated files.
        compress: true,
        // overlay: false,
        client: {
          overlay: {
            errors: true,
            warnings: false,
          },
        },
        historyApiFallback: {
          disableDotRule: true,
          index: baseConfig.output.publicPath,
        },
        static: {
          directory: paths.public,
          publicPath: [baseConfig.output.publicPath],
        },
      },
      plugins: [
        new CircularDependencyPlugin({
          // exclude detection of files based on a RegExp
          exclude: /node_modules/,
          // include specific files based on a RegExp
          // include: /dir/,
          // add errors to webpack instead of warnings
          failOnError: true,
          // allow import cycles that include an asyncronous import,
          // e.g. via import(/* webpackMode: "weak" */ './file.js')
          allowAsyncCycles: false,
          // set the current working directory for displaying module paths
          cwd: process.cwd(),
        }),
        USE_FAST_REFRESH && new ReactRefreshPlugin(),
        new CaseSensitivePathsPlugin(),
      ].filter(Boolean),
    },
    config
  );
};
