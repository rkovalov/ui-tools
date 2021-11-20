import { merge } from 'webpack-merge';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';

import paths from '../paths';

import createBaseConfig from './webpack.config.base';

const webpackDevClientEntry = require.resolve('react-dev-utils/webpackHotDevClient');
const reactRefreshOverlayEntry = require.resolve('react-dev-utils/refreshOverlayInterop');

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
        compress: true,
        // overlay: false,
        client: { progress: true, overlay: false },
        historyApiFallback: {
          disableDotRule: true,
        },
        // TODO: make public folder
        static: [paths.src],
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
        new ReactRefreshPlugin({
          overlay: {
            entry: webpackDevClientEntry,
            // The expected exports are slightly different from what the overlay exports,
            // so an interop is included here to enable feedback on module-level errors.
            module: reactRefreshOverlayEntry,
            // Since we ship a custom dev client and overlay integration,
            // the bundled socket handling logic can be eliminated.
            sockIntegration: false,
          },
        }),
      ].filter(Boolean),
    },
    config
  );
};
